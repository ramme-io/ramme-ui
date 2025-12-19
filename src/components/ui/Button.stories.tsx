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
    // We use 'select' here if possible, but 'text' is fine for generic input
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

// ✅ UPDATE 1: Use 'render' for complex children to keep args serializable
export const IconOnly: Story = {
  args: {
    variant: 'ghost',
    size: 'icon',
    // We don't pass children in args here
  },
  render: (args) => (
    <Button {...args}>
      <Icon name="settings" />
    </Button>
  ),
};

// ✅ UPDATE 2: Use 'render' for polymorphic components
export const PolymorphicLink: Story = {
  name: 'Polymorphic (as Link)',
  args: {
    variant: 'outline',
    asChild: true,
  },
  render: (args) => (
    <Button {...args}>
      <a
        href="https://google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        <Icon name="external-link" className="mr-2" />
        Open Google
      </a>
    </Button>
  ),
};