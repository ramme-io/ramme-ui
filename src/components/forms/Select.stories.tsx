import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, type SelectOption } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-64 w-full max-w-sm p-4">
        {/* Container with height to allow dropdown expansion */}
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian' },
  { value: 'elderberry', label: 'Elderberry' },
];

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState<SelectOption | null>(null);
    return <Select {...args} value={val} onChange={setVal} />;
  },
  args: {
    label: 'Favorite Fruit',
    options: options,
    placeholder: 'Pick a fruit...',
  },
};

export const WithError: Story = {
  render: (args) => {
    const [val, setVal] = useState<SelectOption | null>(null);
    return <Select {...args} value={val} onChange={setVal} />;
  },
  args: {
    label: 'Required Field',
    options: options,
    error: true,
    helperText: 'This field is required.',
  },
};

export const Loading: Story = {
  args: {
    label: 'Async Data',
    options: [],
    isLoading: true,
    placeholder: 'Loading options...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Locked Setting',
    options: options,
    value: options[0], // Pre-selected
    isDisabled: true,
  },
};