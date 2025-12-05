import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta = {
  title: 'Templates & Patterns/StatCard',
  component: StatCard,
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'dollar-sign',
    title: 'Total Revenue',
    value: '$45,231.89',
    footerText: 'Updated 2 minutes ago',
  },
};

export const PositiveChange: Story = {
    args: {
      icon: 'users',
      title: 'New Users',
      value: '+1,245',
      changeDirection: 'positive',
      changeText: '+12.5% this month',
    },
  };
  
  export const NegativeChange: Story = {
    args: {
      icon: 'trending-down',
      title: 'Active Now',
      value: '329',
      changeDirection: 'negative',
      changeText: '-5.2% since last hour',
    },
  };