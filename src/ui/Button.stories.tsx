import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Icon } from './Icon';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'danger',
        'outline',
        'secondary',
        'ghost',
        'link',
        'accent',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    children: {
      control: 'text',
    },
    loading: {
      control: 'boolean',
    },
    iconLeft: { control: 'text' },
    iconRight: { control: 'text' },
    asChild: {
      control: 'boolean',
      description:
        'Render the component as its child element (e.g., for <Link> or <a>)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

export const WithIconLeft: Story = {
  args: {
    variant: 'primary',
    children: 'Login',
    iconLeft: 'log-in',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Submitting',
    loading: true,
  },
};

// --- THIS IS THE FIX ---
// We now pass the <Icon> component as `children`
// and remove the `iconLeft` prop.
export const IconOnly: Story = {
  args: {
    variant: 'ghost',
    size: 'icon',
    children: <Icon name="settings" />, // <-- Pass icon as children
    // iconLeft: 'settings', // <-- Remove this
  },
};

export const PolymorphicLink: Story = {
  name: 'Polymorphic (as Link)',
  args: {
    variant: 'outline',
    asChild: true,
    children: (
      <a
        href="https://google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <Icon name="external-link" className="mr-2" />
        Open Google
      </a>
    ),
  },
};