import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';
import { Card } from '../layout/Card';

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  decorators: [
    (Story) => (
      <Card className="p-6 w-[700px] h-[400px]">
        <Story />
      </Card>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. UPDATED THE DATA ---
// Added a numeric timestamp and null values
const userData = [
    { timestamp: 1762960500, newUsers: 120, returningUsers: 80 },
    { timestamp: 1762964100, newUsers: 150, returningUsers: 110 },
    { timestamp: 1762967700, newUsers: 130, returningUsers: 160 },
    { timestamp: 1762971300, newUsers: 210, returningUsers: 140 },
    { timestamp: 1762974900, newUsers: 250, returningUsers: 190 },
    { timestamp: 1762978500, newUsers: 220, returningUsers: 210 },
    { timestamp: 1762982100, newUsers: 260, returningUsers: null }, // Test connectNulls
    { timestamp: 1762985700, newUsers: 290, returningUsers: 250 },
];

export const Default: Story = {
  args: {
    data: userData,
    dataKeyX: 'timestamp', // Using the numeric key
    lineKeys: ['newUsers', 'returningUsers'],
  },
};

// --- 2. ADDED A NEW "FIXED" STORY ---
export const LinesWithCustomAxis: Story = {
  args: {
    data: userData,
    dataKeyX: 'timestamp',
    lineKeys: ['newUsers', 'returningUsers'],
    
    // --- Test our "Moat" props ---
    dot: false,
    connectNulls: true,

    // --- Test our new xAxisProps (THE FIX) ---
    xAxisProps: {
      type: 'number',
      domain: ['dataMin', 'dataMax'],
      // This is the formatter that fixes the "wonky" numbers
      tickFormatter: (timestamp: number) => 
        new Date(timestamp * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      interval: 'preserveStartEnd',
    },

    // --- Test our new yAxisProps ---
    yAxisProps: {
      domain: [0, 300], // Lock the Y-axis
      tickFormatter: (value: number) => `$${value}`, // Add a $ prefix
    },
  },
};

// --- 3. ADDED A STORY FOR THE "NO DATA" STATE ---
export const Empty: Story = {
  args: {
    data: [], // Pass empty data
    dataKeyX: 'timestamp',
    lineKeys: ['newUsers', 'returningUsers'],
  },
};