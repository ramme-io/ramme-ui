import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Forms/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8 w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const viewOptions = [
  { label: 'Map View', value: 'map' },
  { label: 'List View', value: 'list' },
  { label: 'Grid View', value: 'grid' },
];

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical', disabled: true },
];

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState('list');
    return <SegmentedControl {...args} value={val} onChange={setVal} />;
  },
  args: {
    options: viewOptions,
  },
};

export const Small: Story = {
  render: (args) => {
    const [val, setVal] = useState('low');
    return <SegmentedControl {...args} value={val} onChange={setVal} />;
  },
  args: {
    options: priorityOptions,
    size: 'sm',
  },
};

export const FullWidth: Story = {
  render: (args) => {
    const [val, setVal] = useState('map');
    return <SegmentedControl {...args} value={val} onChange={setVal} />;
  },
  args: {
    options: viewOptions,
    className: 'w-full grid grid-cols-3', // Tailwind grid allows it to stretch
  },
};