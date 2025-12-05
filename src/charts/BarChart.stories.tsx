import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';
import { Card } from '../layout/Card';

// FIX: Change `const meta = { ... } satisfies Meta<...>` to `const meta: Meta<...> = { ... }`
const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
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

const salesData = [
    { name: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Feb', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 2000, expenses: 9800 },
    { name: 'Apr', revenue: 2780, expenses: 3908 },
    { name: 'May', revenue: 1890, expenses: 4800 },
    { name: 'Jun', revenue: 2390, expenses: 3800 },
];

export const Default: Story = {
  args: {
    data: salesData,
    dataKeyX: 'name',
    barKeys: ['revenue', 'expenses'],
  },
};