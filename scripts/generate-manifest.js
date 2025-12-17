const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const doctrine = require('doctrine');

// --- CONFIGURATION ---
const SRC_DIR = path.resolve(__dirname, '../src');
const HISTORY_FILE = path.resolve(__dirname, '../src/component-history.json');
const OUTPUT_FILE = path.resolve(__dirname, '../wizardManifest.ts');
const TEMP_FILE = path.resolve(__dirname, 'manifest.temp.json');

// --- 1. LOAD HISTORY ---
let componentHistory = {};
if (fs.existsSync(HISTORY_FILE)) {
  try {
    componentHistory = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
  } catch (e) {
    console.warn('⚠️ Could not parse component history. Starting fresh.');
  }
}

// Category Mapping
const CATEGORY_MAP = {
  component: 'components',
  components: 'components',
  ui: 'components',
  input: 'components',
  form: 'components',
  feedback: 'components',
  navigation: 'components',
  'data-display': 'components',
  layout: 'layouts',
  layouts: 'layouts',
  iot: 'components', 
  ai: 'components',
  blocks: 'components',
  util: 'utils',
  utils: 'utils',
  hook: 'hooks',
  hooks: 'hooks',
  data: 'data'
};

// --- HELPER FUNCTIONS ---
const getSourceFiles = (dir) => {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = [...files, ...getSourceFiles(fullPath)];
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
      if (!item.name.endsWith('.test.tsx') && !item.name.endsWith('.stories.tsx')) {
        files.push(fullPath);
      }
    }
  }
  return files;
};

const generateFingerprint = (entry) => {
  const data = JSON.stringify({
    description: entry.description,
    props: entry.props,
    tags: entry.tags,
    category: entry.category
  });
  return crypto.createHash('md5').update(data).digest('hex');
};

const bumpVersion = (oldVersion) => {
  const parts = oldVersion.split('.').map(Number);
  parts[2] += 1; 
  return parts.join('.');
};

const parseJsDoc = (content, filePath) => {
  const docRegex = /\/\*\*([\s\S]*?)\*\//g;
  const entries = [];
  let match;

  while ((match = docRegex.exec(content)) !== null) {
    const jsdoc = `/**${match[1]}*/`;
    const ast = doctrine.parse(jsdoc, { unwrap: true, sloppy: true });
    
    const isWizard = ast.tags.some(tag => tag.title === 'wizard');
    if (!isWizard) continue;

    const entry = {
      id: '',
      name: '',
      version: '1.0.0',
      description: ast.description || '',
      tags: [],
      category: '',
      props: [],
      importPath: '' 
    };

    for (const tag of ast.tags) {
      const desc = tag.description || ''; 
      switch (tag.title) {
        case 'name':
          entry.name = tag.name || desc;
          entry.id = entry.name
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
          break;
        case 'description':
          entry.description = desc;
          break;
        case 'tags':
          entry.tags = desc.split(',').map(t => t.trim()).filter(Boolean);
          break;
        case 'category':
          entry.category = desc.toLowerCase().trim();
          break;
        case 'props':
          if (!desc) break;
          entry.props = desc.split(/(?:\r?\n|^)- /).map(propStr => {
              if (!propStr.trim()) return null;
              const propLines = propStr.trim().split(/\r?\n/);
              const prop = {};
              propLines.forEach(line => {
                const separatorIndex = line.indexOf(':');
                if (separatorIndex === -1) return;
                const key = line.slice(0, separatorIndex).trim();
                const value = line.slice(separatorIndex + 1).trim();
                if (key && value) {
                  prop[key.replace(/^- /, '')] = value;
                }
              });
              return prop;
            }).filter(Boolean);
          break;
      }
    }

    if (entry.name) {
      const parsedPath = path.parse(filePath);
      entry.importPath = './' + path.join(parsedPath.dir, parsedPath.name).replace(/\\/g, '/').replace(/^src\//, '');

      const fingerprint = generateFingerprint(entry);
      const history = componentHistory[entry.id];

      if (history) {
        if (history.fingerprint === fingerprint) {
          entry.version = history.version;
        } else {
          console.log(`🆙 Updated: ${entry.name} (v${bumpVersion(history.version)})`);
          entry.version = bumpVersion(history.version);
        }
      } else {
        console.log(`✨ New: ${entry.name} (v1.0.0)`);
      }

      componentHistory[entry.id] = {
        version: entry.version,
        fingerprint: fingerprint,
        lastUpdated: new Date().toISOString()
      };

      entries.push(entry);
    }
  }
  return entries;
};

// --- MAIN EXECUTION ---
const buildManifest = () => {
  console.log('🚀 Starting Manifest Generation...');
  
  const manifest = {
    components: [],
    layouts: [],
    utils: [],
    hooks: [],
    data: [],
  };

  const registryList = [];
  const seenRegistryIds = new Set(); // ✅ FIX: Track seen IDs to prevent duplicates

  const files = getSourceFiles(SRC_DIR);
  let totalEntries = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const filePath = path.relative(path.join(__dirname, '..'), file).replace(/\\\\/g, '/');
    const entries = parseJsDoc(content, filePath);

    for (const entry of entries) {
      entry.filePath = filePath;
      totalEntries++;
      
      const rawCat = entry.category ? entry.category : 'component';
      const manifestKey = CATEGORY_MAP[rawCat] || 'components';

      if (manifest[manifestKey]) {
        manifest[manifestKey].push(entry);
      } else {
        manifest.components.push(entry);
      }

      // --- FILTER FOR REGISTRY ---
      const isRenderableCategory = ['components', 'layouts', 'iot', 'ai', 'blocks'].includes(manifestKey);
      
      // ✅ FIX: Strict filtering for hooks and mock data
      const isNotHook = !entry.name.startsWith('use');
      const isNotMock = !entry.name.startsWith('mock');

      if (isRenderableCategory && isNotHook && isNotMock) {
        // ✅ FIX: Deduplicate based on ID
        if (!seenRegistryIds.has(entry.id)) {
          seenRegistryIds.add(entry.id);
          registryList.push({
            name: entry.name,
            id: entry.id,
            path: entry.importPath
          });
        } else {
          // Silent skip for duplicates to keep logs clean
        }
      }
    }
  }

  // 1. Write History
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(componentHistory, null, 2));

  // 2. Write Manifest
  const manifestContent = `
// This file is auto-generated by scripts/generate-manifest.js
// Do not modify this file directly.
import type { WizardManifest } from './src/lib/types/wizard';

export const wizardManifest: WizardManifest = ${JSON.stringify(manifest, null, 2)} as const;
`;
  fs.writeFileSync(OUTPUT_FILE, manifestContent.trim());

  // 3. Write Registry Baton
  fs.writeFileSync(TEMP_FILE, JSON.stringify(registryList, null, 2));

  console.log(`\n✨ Generated manifest with ${totalEntries} entries!`);
  console.log(`📦 Handoff file written to ${TEMP_FILE}`);
};

try {
  require('doctrine');
  buildManifest();
} catch (e) {
  console.error('Doctrine not found. Please run: pnpm add -D doctrine @types/doctrine');
  process.exit(1);
}