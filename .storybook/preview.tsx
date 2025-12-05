import type { Preview, Decorator } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import '../src/index.css';

// This decorator provides the necessary React Context for `useTheme`
// AND handles applying the theme class to the document.
const withThemeProvider: Decorator = (Story) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  // Apply our custom decorator globally to all stories
  decorators: [withThemeProvider],
};

export default preview;