import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// In a real app, onDismiss would be handled by a provider.
const onDismiss = () => alert('Toast dismissed!');

export const Info: Story = {
  args: {
    id: '1',
    type: 'info',
    title: 'Heads up!',
    message: 'A new software update is available.',
    onDismiss,
  },
};

export const Success: Story = {
  args: {
    id: '2',
    type: 'success',
    title: 'Success!',
    message: 'Your profile has been updated.',
    onDismiss,
  },
};

export const Warning: Story = {
    args: {
      id: '3',
      type: 'warning',
      title: 'Warning',
      message: 'Your session is about to expire.',
      onDismiss,
    },
  };

  export const Error: Story = {
    args: {
      id: '4',
      type: 'error',
      title: 'Error',
      message: 'Could not connect to the server.',
      onDismiss,
    },
  };