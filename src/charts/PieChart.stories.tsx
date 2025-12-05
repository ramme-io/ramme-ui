import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from './PieChart';
import { Card } from '../layout/Card';

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
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

const trafficData = [
    { name: 'Organic', value: 400 },
    { name: 'Direct', value: 300 },
    { name: 'Referral', value: 300 },
    { name: 'Social', value: 200 },
];

export const Default: Story = {
  args: {
    data: trafficData,
    dataKey: 'value',
    nameKey: 'name',
  },
};