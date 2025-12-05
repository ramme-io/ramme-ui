import type { Meta } from '@storybook/react';
import { useTheme, availableThemes } from './ThemeContext';
import { Button } from '../ui/Button';
import { Card } from '../layout/Card';

const meta = {
  title: 'Contexts/ThemeContext',
  // This is a documentation/utility story, so no component is linked.
} satisfies Meta;

export default meta;

/**
 * This story demonstrates the `useTheme` hook in action. Use the buttons
 * to change the theme and observe how all components in Storybook update.
 */
export const ThemeSwitcher = {
  render: function Render() {
    const { theme, setTheme } = useTheme();

    return (
      <Card className="p-4">
        <div className="mb-4">
          <p>
            Current theme: <strong>{theme}</strong>
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {availableThemes.map((themeName) => (
            <Button
              key={themeName}
              variant="outline"
              onClick={() => setTheme(themeName)}
            >
              Set to {themeName}
            </Button>
          ))}
        </div>
      </Card>
    );
  },
};