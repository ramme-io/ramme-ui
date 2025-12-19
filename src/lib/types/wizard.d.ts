// packages/ui/src/types/wizard.d.ts

import type { ColDef, GridOptions } from 'ag-grid-community';
import type { ThemeName } from '../../contexts/ThemeContext';

// NEW: Define and export the type for a single prop.
export interface WizardEntryProp {
  name: string;
  type: string;
  description: string;
  default?: string;
}

// Define the shape of a wizard entry for components/layouts/utils/data
export interface WizardEntry {
  id: string;
  name: string;
  version: string; // <--- Added this property
  description: string;
  tags: string[];
  category: string;
  filePath: string;
  importPath?: string;
  
  // UPDATED: Use the new WizardEntryProp type here.
  props?: WizardEntryProp[]; 
  availableData?: string[];
  
  // Specific for mock data
  returns?: {
    name: string;
    type: string;
    description: string;
  }[];
}

// Define the overall shape of the wizard manifest
export interface WizardManifest {
  components: WizardEntry[];
  layouts: WizardEntry[];
  utils: WizardEntry[];
  hooks: WizardEntry[];
  data: WizardEntry[];
  devices?: WizardEntry[]; 
}