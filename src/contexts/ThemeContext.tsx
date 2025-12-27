'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';

export type ThemeName = 'light' | 'dark' | 'corporate' | 'midnight' | 'blueprint';

export const availableThemes: ThemeName[] = [
  'light',
  'dark',
  'corporate',
  'midnight',
  'blueprint',
];

// --- FONT MAPPING (Tier 1 Explicit Overrides) ---
// We explicitly define the fonts here to guarantee they switch, 
// rather than relying on CSS class inheritance which can be flaky.
const STANDARD_THEME_FONTS: Record<ThemeName, { sans: string; serif: string; mono: string }> = {
  light: { 
    sans: '"Inter", system-ui, sans-serif', 
    serif: 'Georgia, serif', 
    mono: '"Menlo", monospace' 
  },
  dark: { 
    sans: '"Inter", system-ui, sans-serif', 
    serif: 'Georgia, serif', 
    mono: '"Menlo", monospace' 
  },
  corporate: { 
    sans: '"Lato", sans-serif', 
    serif: '"Merriweather", serif', 
    mono: '"Menlo", monospace' 
  },
  midnight: { 
    sans: '"Roboto Mono", monospace', 
    serif: 'Georgia, serif', 
    mono: '"Roboto Mono", monospace' 
  },
  blueprint: { 
    sans: '"Courier New", monospace', 
    serif: 'Georgia, serif', 
    mono: '"Courier New", monospace' 
  },
};

// --- TIER 2: THEME SCHEMA ---
export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;           
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    danger: string;
    dangerForeground: string;
    background: string;
    card: string;
    text: string;
    border: string;
    muted: string;
    mutedForeground: string;
    input: string;
    inputBorder: string;
    ring: string;
  };
  borderRadius: string;
  fonts?: {
    sans: string;
    serif: string;
    mono: string;
  };
}

interface ThemeContextType {
  theme: ThemeName;
  availableThemes: ThemeName[];
  setTheme: (themeName: ThemeName) => void;
  
  // --- VISUAL TOKENS ---
  borderRadius: string;
  setBorderRadius: (radius: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;

  // --- TIER 2: CUSTOM THEME INJECTION ---
  customTheme: ThemeConfig | null;
  setCustomTheme: (config: ThemeConfig | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // --- State ---
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as ThemeName;
      return (storedTheme && availableThemes.includes(storedTheme)) ? storedTheme : 'light';
    }
    return 'light';
  });

  const [borderRadius, setBorderRadiusState] = useState<string>('0.5rem');
  const [fontSize, setFontSizeState] = useState<string>('1rem');
  const [customTheme, setCustomThemeState] = useState<ThemeConfig | null>(null);

  // --- Hydration ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRadius = localStorage.getItem('borderRadius');
      const savedFont = localStorage.getItem('fontSize');
      const savedCustomTheme = localStorage.getItem('customTheme');

      if (savedRadius) setBorderRadiusState(savedRadius);
      if (savedFont) setFontSizeState(savedFont);
      if (savedCustomTheme) {
        try {
          setCustomThemeState(JSON.parse(savedCustomTheme));
        } catch (e) {
          console.warn('Failed to parse custom theme');
        }
      }
    }
  }, []);

  // --- Setters ---
  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme);
    setCustomThemeState(null); 
    localStorage.setItem('theme', newTheme);
    localStorage.removeItem('customTheme');
  }, []);

  const setCustomTheme = useCallback((config: ThemeConfig | null) => {
    setCustomThemeState(config);
    if (config) {
      localStorage.setItem('customTheme', JSON.stringify(config));
    } else {
      localStorage.removeItem('customTheme');
    }
  }, []);

  const setBorderRadius = useCallback((radius: string) => {
    setBorderRadiusState(radius);
    localStorage.setItem('borderRadius', radius);
  }, []);

  const setFontSize = useCallback((size: string) => {
    setFontSizeState(size);
    localStorage.setItem('fontSize', size);
  }, []);

  // --- THEME ENGINE: The "Paint" Effect ---
  useEffect(() => {
    const root = document.documentElement;

    // 1. Reset standard classes
    availableThemes.forEach((t) => root.classList.remove(t));
    root.classList.remove('custom-theme');

    // 2. Helper to set/remove CSS variables
    const setVar = (key: string, val: string) => root.style.setProperty(key, val);
    const removeVar = (key: string) => root.style.removeProperty(key);

    const cssVars = [
      '--app-primary-color', '--app-primary-foreground-color',
      '--app-secondary-color', '--app-secondary-foreground-color',
      '--app-accent-color', '--app-accent-foreground-color',
      '--app-danger-color', '--app-danger-foreground-color',
      '--app-bg-color', '--app-card-bg-color', '--app-text-color', '--app-border-color',
      '--app-muted-bg', '--app-muted-text',
      '--app-input-bg-color', '--app-input-border-color', '--app-input-focus-ring-color'
    ];

    if (customTheme) {
      // === MODE A: CUSTOM INJECTION (AI) ===
      root.classList.add('custom-theme'); 
      const c = customTheme.colors;
      
      // Inject Colors
      setVar('--app-primary-color', c.primary);
      setVar('--app-primary-foreground-color', c.primaryForeground);
      setVar('--app-secondary-color', c.secondary);
      setVar('--app-secondary-foreground-color', c.secondaryForeground);
      setVar('--app-accent-color', c.accent);
      setVar('--app-accent-foreground-color', c.accentForeground);
      setVar('--app-danger-color', c.danger);
      setVar('--app-danger-foreground-color', c.dangerForeground);
      
      setVar('--app-bg-color', c.background);
      setVar('--app-card-bg-color', c.card);
      setVar('--app-text-color', c.text);
      setVar('--app-border-color', c.border);
      setVar('--app-muted-bg', c.muted);
      setVar('--app-muted-text', c.mutedForeground);
      setVar('--app-input-bg-color', c.input);
      setVar('--app-input-border-color', c.inputBorder);
      setVar('--app-input-focus-ring-color', c.ring);

      // ✅ FIX 1: Explicitly Inject Fonts for Custom Themes
      if (customTheme.fonts) {
        setVar('--app-font-sans', customTheme.fonts.sans);
        setVar('--app-font-serif', customTheme.fonts.serif);
        setVar('--app-font-mono', customTheme.fonts.mono);
      }

      // ✅ FIX 2: Force Paint Background immediately (Zero Jank)
      // This ensures the background changes even if Tailwind classes on <body> are missing or delayed
      document.body.style.backgroundColor = `rgb(${c.background})`;
      document.body.style.color = `rgb(${c.text})`;

      // Radius
      setVar('--app-border-radius-md', customTheme.borderRadius);
      setVar('--app-border-radius-sm', `calc(${customTheme.borderRadius} - 0.25rem)`);
      setVar('--app-border-radius-lg', `calc(${customTheme.borderRadius} + 0.25rem)`);

    } else {
      // === MODE B: STANDARD PRESET ===
      root.classList.add(theme);
      
      // Clean up injected variables
      cssVars.forEach(removeVar);

      // ✅ FIX 3: Explicitly Inject Fonts for Standard Themes
      // We look up the font in our map and force it, ensuring 'Corporate' gets 'Lato'
      const standardFont = STANDARD_THEME_FONTS[theme];
      setVar('--app-font-sans', standardFont.sans);
      setVar('--app-font-serif', standardFont.serif);
      setVar('--app-font-mono', standardFont.mono);

      // ✅ FIX 4: Reset Body Background to NULL
      // This allows the standard CSS classes (.dark, .corporate) in index.css to take over control
      document.body.style.backgroundColor = '';
      document.body.style.color = '';

      // Standard Radius
      setVar('--app-border-radius-md', borderRadius);
      setVar('--app-border-radius-sm', `calc(${borderRadius} - 0.25rem)`);
      setVar('--app-border-radius-lg', `calc(${borderRadius} + 0.25rem)`);
    }

    // Size is always state-driven
    setVar('--app-font-size-base', fontSize);

  }, [theme, customTheme, borderRadius, fontSize]);

  const value = useMemo(
    () => ({
      theme,
      availableThemes,
      setTheme,
      borderRadius,
      setBorderRadius,
      fontSize,
      setFontSize,
      customTheme,
      setCustomTheme
    }),
    [theme, setTheme, borderRadius, setBorderRadius, fontSize, setFontSize, customTheme, setCustomTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};