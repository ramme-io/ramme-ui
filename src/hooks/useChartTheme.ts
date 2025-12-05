import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ChartTheme {
  textColor: string;
  gridColor: string;
  tooltipBg: string;
  palette: string[];
}

export const useChartTheme = (): ChartTheme => {
  const { theme } = useTheme();
  const [chartTheme, setChartTheme] = useState<ChartTheme>({
    textColor: 'rgb(33 37 41)',
    gridColor: 'rgb(233 236 239)',
    tooltipBg: 'rgb(255 255 255)',
    palette: [],
  });

  useEffect(() => {
    // This function runs on the client and can access computed styles
    const computedStyle = getComputedStyle(document.documentElement);
    
    const paletteString = computedStyle.getPropertyValue('--app-chart-palette').trim();
    const palette = paletteString ? paletteString.split(',').map(color => `rgb(${color.trim()})`) : [];

    setChartTheme({
      textColor: `rgb(${computedStyle.getPropertyValue('--app-text-color').trim()})`,
      gridColor: `rgb(${computedStyle.getPropertyValue('--app-chart-grid-color').trim()})`,
      tooltipBg: `rgb(${computedStyle.getPropertyValue('--app-card-bg-color').trim()})`,
      palette,
    });
  }, [theme]); // Re-run whenever the app theme changes

  return chartTheme;
};