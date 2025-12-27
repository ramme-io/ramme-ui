import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MultiSelect, type MultiSelectOption } from './MultiSelect';

const meta: Meta<typeof MultiSelect> = {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-64 w-full max-w-sm p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const options: MultiSelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
];

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState<MultiSelectOption[] | null>([]);
    return <MultiSelect {...args} value={val} onChange={setVal} />;
  },
  args: {
    label: 'Tech Stack',
    options: options,
    placeholder: 'Select frameworks...',
  },
};

export const PreSelected: Story = {
  render: (args) => {
    const [val, setVal] = useState<MultiSelectOption[] | null>([options[0], options[4]]);
    return <MultiSelect {...args} value={val} onChange={setVal} />;
  },
  args: {
    label: 'Favorites',
    options: options,
  },
};

export const WithError: Story = {
  render: (args) => {
    const [val, setVal] = useState<MultiSelectOption[] | null>([]);
    return <MultiSelect {...args} value={val} onChange={setVal} />;
  },
  args: {
    label: 'Required Skills',
    options: options,
    error: true,
    helperText: 'Please select at least one skill.',
  },
};