import type { Meta, StoryObj } from '@storybook/react';
import { TippyTooltip } from './TippyTooltip';
import { Button } from '../ui/Button';

const meta = {
  title: 'Feedback/TippyTooltip',
  component: TippyTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof TippyTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip!',
    children: <Button>Hover over me</Button>,
  },
};