import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Form/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    // FIX: To disable a control, set it to `false`.
    selected: { control: false },
    onChange: { action: 'Date Changed' },
  }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date | null>(new Date());
    return <DatePicker {...args} selected={date} onChange={(d) => { args.onChange(d); setDate(d); }} />;
  },
  args: {
    label: 'Event Date',
    // We still provide mock args to satisfy TypeScript
    selected: new Date(),
    onChange: (date) => console.log('Date changed:', date),
  },
};