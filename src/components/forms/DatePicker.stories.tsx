import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-96 w-full max-w-sm p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker {...args} selected={date} onChange={setDate} />;
  },
  args: {
    label: 'Event Date',
    placeholderText: 'Select a date',
  },
};

export const WithError: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | null>(null);
    return <DatePicker {...args} selected={date} onChange={setDate} />;
  },
  args: {
    label: 'Start Date',
    error: true,
    helperText: 'Start date cannot be in the past.',
  },
};

export const WithTime: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker {...args} selected={date} onChange={setDate} />;
  },
  args: {
    label: 'Appointment Time',
    showTimeSelect: true,
    dateFormat: "MMMM d, yyyy h:mm aa",
  },
};