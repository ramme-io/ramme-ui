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

interface ThemeContextType {
  theme: ThemeName;
  availableThemes: ThemeName[];
  setTheme: (themeName: ThemeName) => void;
  borderRadius: string;
  setBorderRadius: (radius: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // --- Color Theme State ---
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as ThemeName;
      if (storedTheme && availableThemes.includes(storedTheme)) {
        return storedTheme;
      }
      if (
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        availableThemes.includes('dark')
      ) {
        return 'dark';
      }
    }
    return 'light';
  });

  // --- Border Radius State ---
  const [borderRadius, setBorderRadiusState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('borderRadius') || '0.5rem';
    }
    return '0.5rem';
  });

  // --- Font Size State ---
  const [fontSize, setFontSizeState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fontSize') || '1rem';
    }
    return '1rem';
  });

  // --- State Setters with localStorage persistence ---
  const setTheme = useCallback((newTheme: ThemeName) => {
    if (!availableThemes.includes(newTheme)) {
      console.warn(`Attempted to set an unsupported theme: ${newTheme}`);
      return;
    }
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  }, []);

  const setBorderRadius = useCallback((radius: string) => {
    setBorderRadiusState(radius);
    localStorage.setItem('borderRadius', radius);
  }, []);

  const setFontSize = useCallback((size: string) => {
    setFontSizeState(size);
    localStorage.setItem('fontSize', size);
  }, []);

  // --- Effect to Apply Theme ---
  useEffect(() => {
    const root = document.documentElement;

    // Handle color theme classes
    availableThemes.forEach((t) => root.classList.remove(t));
    root.classList.add(theme);

    // Handle CSS variables for other theme properties
    root.style.setProperty('--app-border-radius-sm', `calc(${borderRadius} - 0.25rem)`);
    root.style.setProperty('--app-border-radius-md', borderRadius);
    root.style.setProperty('--app-border-radius-lg', `calc(${borderRadius} + 0.25rem)`);
    
    root.style.setProperty('--app-font-size-base', fontSize);

  }, [theme, borderRadius, fontSize]);

  // --- Memoized Context Value ---
  const value = useMemo(
    () => ({
      theme,
      availableThemes,
      setTheme,
      borderRadius,
      setBorderRadius,
      fontSize,
      setFontSize,
    }),
    [
      theme,
      setTheme,
      borderRadius,
      setBorderRadius,
      fontSize,
      setFontSize,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// --- Custom Hook ---
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};