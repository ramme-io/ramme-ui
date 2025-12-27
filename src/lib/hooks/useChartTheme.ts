import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ChartTheme {
  textColor: string;
  gridColor: string;
  tooltipBg: string;
  palette: string[];
}

export const useChartTheme = (): ChartTheme => {
  // ✅ FIX: Destructure customTheme so we can react to it
  const { theme, customTheme } = useTheme();
  
  const [chartTheme, setChartTheme] = useState<ChartTheme>({
    textColor: 'rgb(33 37 41)',
    gridColor: 'rgb(233 236 239)',
    tooltipBg: 'rgb(255 255 255)',
    palette: [],
  });

  useEffect(() => {
    // Helper to safely get RGB values
    const getVar = (name: string) => {
        // We use document.documentElement because our ThemeProvider applies classes/styles there
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    };

    // ✅ FIX: Small timeout to ensure the DOM has updated with the new class/style
    // before we read the computed values. This prevents reading "stale" colors.
    const timer = setTimeout(() => {
        const paletteString = getVar('--app-chart-palette');
        const palette = paletteString 
            ? paletteString.split(',').map(color => `rgb(${color.trim()})`) 
            : [];

        setChartTheme({
          textColor: `rgb(${getVar('--app-text-color')})`,
          gridColor: `rgb(${getVar('--app-chart-grid-color')})`,
          tooltipBg: `rgb(${getVar('--app-card-bg-color')})`,
          palette,
        });
    }, 10); // 10ms is enough to let the DOM settle

    return () => clearTimeout(timer);

  }, [theme, customTheme]); // ✅ FIX: Re-run when EITHER theme string OR custom object changes

  return chartTheme;
};