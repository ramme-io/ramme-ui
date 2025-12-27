import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useTheme, availableThemes, type ThemeConfig } from './ThemeContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/layout/Card';
import { Input } from '../components/forms/Input';
import { Select, type SelectOption } from '../components/forms/Select';
import { MultiSelect, type MultiSelectOption } from '../components/forms/MultiSelect';
import { DatePicker } from '../components/forms/DatePicker';
import { BarChart } from '../components/data-display/BarChart';
import { DataTable } from '../components/data-display/DataTable';
import { SectionHeader } from '../components/layout/SectionHeader';
import { Badge } from '../components/ui/Badge';

const meta = {
  title: 'Contexts/ThemeContext',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// --- MOCK THEMES (Tier 2) ---
const cyberPunkTheme: ThemeConfig = {
  name: 'Cyberpunk 2077',
  colors: {
    primary: '255 238 88', // Neon Yellow
    primaryForeground: '0 0 0',
    secondary: '30 30 35',
    secondaryForeground: '255 255 255',
    accent: '0 255 255', // Cyan
    accentForeground: '0 0 0',
    danger: '255 0 85',
    dangerForeground: '255 255 255',
    background: '5 5 10', // Near Black
    card: '20 20 25',
    text: '240 240 240',
    border: '255 238 88', // Yellow borders
    muted: '40 40 50',
    mutedForeground: '150 150 160',
    input: '30 30 35',
    inputBorder: '80 80 90',
    ring: '255 238 88',
  },
  borderRadius: '0px',
  fonts: {
    sans: '"Courier Prime", monospace',
    serif: 'serif',
    mono: '"Courier Prime", monospace'
  }
};

const forestTheme: ThemeConfig = {
  name: 'Deep Forest',
  colors: {
    primary: '34 197 94', // Green
    primaryForeground: '255 255 255',
    secondary: '20 83 45', // Dark Green
    secondaryForeground: '220 252 231',
    accent: '234 179 8', // Yellow
    accentForeground: '0 0 0',
    danger: '239 68 68',
    dangerForeground: '255 255 255',
    background: '2 44 34', // Very Dark Green
    card: '6 78 59',
    text: '236 253 245',
    border: '20 83 45',
    muted: '6 78 59',
    mutedForeground: '110 231 183',
    input: '20 83 45',
    inputBorder: '34 197 94',
    ring: '34 197 94',
  },
  borderRadius: '1rem',
  fonts: {
    sans: '"Merriweather", serif',
    serif: '"Merriweather", serif',
    mono: 'monospace'
  }
};

// --- MOCK DATA ---
const chartData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 600 },
];

const tableData = [
  { id: 1, name: 'Project Alpha', status: 'Active', budget: 12000 },
  { id: 2, name: 'Project Beta', status: 'Pending', budget: 8500 },
  { id: 3, name: 'Project Gamma', status: 'Done', budget: 45000 },
];

const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' },
];

export const ThemeStressTest: Story = {
  render: function Render() {
    const { theme, setTheme, customTheme, setCustomTheme } = useTheme();
    const [date, setDate] = useState<Date | null>(new Date());
    const [selectVal, setSelectVal] = useState<SelectOption | null>(null);
    const [multiVal, setMultiVal] = useState<MultiSelectOption[] | null>([options[0]]);

    return (
      <div className="space-y-8 max-w-6xl mx-auto">
        
        {/* --- 1. THEME CONTROLLER --- */}
        <Card className="p-6 sticky top-4 z-50 shadow-xl border-primary/50 bg-card/95 backdrop-blur">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold">Theme Engine Stress Test</h2>
              <p className="text-sm text-muted-foreground">
                Active: <span className="font-mono text-primary font-bold">{customTheme ? customTheme.name : theme}</span>
              </p>
            </div>
            
            <div className="flex gap-2 flex-wrap justify-end">
              {availableThemes.map((t) => (
                <Button 
                  key={t} 
                  size="sm" 
                  variant={theme === t && !customTheme ? 'primary' : 'outline'}
                  onClick={() => setTheme(t)}
                >
                  {t}
                </Button>
              ))}
              <div className="w-px h-8 bg-border mx-2" />
              <Button 
                size="sm" 
                variant={customTheme?.name === 'Cyberpunk 2077' ? 'primary' : 'secondary'}
                onClick={() => setCustomTheme(cyberPunkTheme)}
              >
                AI: Cyberpunk
              </Button>
              <Button 
                size="sm" 
                variant={customTheme?.name === 'Deep Forest' ? 'primary' : 'secondary'}
                onClick={() => setCustomTheme(forestTheme)}
              >
                AI: Forest
              </Button>
            </div>
          </div>
        </Card>

        {/* --- 2. THE VISUAL GAUNTLET --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column A: Forms (The "Overlay" Killers) */}
          <div className="space-y-6">
            <Card className="p-6 space-y-6">
              <SectionHeader title="Form Controls (Z-Index & Borders)" />
              
              <div className="grid grid-cols-2 gap-4">
                <Input label="Standard Input" placeholder="Type here..." />
                <DatePicker label="Date Picker" selected={date} onChange={setDate} />
              </div>

              <Select 
                label="Single Select (React-Select)" 
                options={options} 
                value={selectVal} 
                onChange={setSelectVal} 
              />

              <MultiSelect 
                label="Multi Select (Tags)" 
                options={options} 
                value={multiVal} 
                onChange={setMultiVal} 
              />
            </Card>

            <Card className="p-6">
              <SectionHeader title="Feedback & Badges" />
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </Card>
          </div>

          {/* Column B: Data (The "Color" Killers) */}
          <div className="space-y-6">
            <Card className="p-6 h-80 flex flex-col">
              <SectionHeader title="Chart Theme Sync" />
              <div className="flex-1 mt-4">
                <BarChart data={chartData} dataKeyX="name" barKeys={['value']} />
              </div>
            </Card>

            <Card className="p-6 min-h-[300px] flex flex-col">
              <SectionHeader title="Data Grid (AG Grid Theme)" />
              <div className="flex-1 mt-4 -mx-2">
                <DataTable 
                  rowData={tableData}
                  columnDefs={[
                    { field: 'name', headerName: 'Project', flex: 1 },
                    { field: 'status', headerName: 'Status', cellRenderer: (p: any) => <Badge variant="outline">{p.value}</Badge> },
                    { field: 'budget', headerName: 'Budget', valueFormatter: (p: any) => `$${p.value}` }
                  ]}
                  height="250px"
                />
              </div>
            </Card>
          </div>

        </div>
      </div>
    );
  },
};