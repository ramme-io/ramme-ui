import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../ui/Button';

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8 bg-muted/20 min-h-[200px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-muted-foreground">
          This is a basic card. It uses the "card" background and "border" color from the active theme.
        </p>
      </div>
    ),
    className: 'p-6 w-96',
  },
};

export const Interactive: Story = {
  args: {
    className: 'p-6 w-96 hover:shadow-md transition-shadow cursor-pointer',
    children: (
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Clickable Card</p>
          <p className="text-xs text-muted-foreground">Hover to see shadow boost</p>
        </div>
        <Button size="sm" variant="ghost">Action</Button>
      </div>
    ),
  },
};

export const NoBorder: Story = {
  args: {
    className: 'p-6 w-96 border-none shadow-lg',
    children: (
      <p className="font-medium text-center">Borderless / Elevated</p>
    ),
  },
};