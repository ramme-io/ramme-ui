import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuItem, MenuDivider } from './Menu';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    // We use a larger layout and custom padding to see the dropdown
    layout: 'fullscreen',
    // Add custom padding to center the component
    controls: {
      story: {
        iframeHeight: 300,
        inline: false,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-[300px]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    },
    trigger: {
      control: false, // The trigger is part of the story, not a prop
    },
    children: {
      control: false, // Children are part of the story, not a prop
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default Menu component used as a dropdown.
 */
export const Default: Story = {
  args: {
    position: 'bottom-right',
    trigger: (
      <Button variant="outline" iconRight="chevron-down">
        Open Menu
      </Button>
    ),
    children: (
      <>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuDivider />
        <MenuItem disabled>Archive</MenuItem>
        <MenuItem>Delete</MenuItem>
      </>
    ),
  },
};

/**
 * A Menu component with `MenuItem` components that include icons.
 */
export const WithIcons: Story = {
  args: {
    position: 'bottom-right',
    trigger: (
      <Button variant="primary" iconRight="chevron-down">
        Actions
      </Button>
    ),
    children: (
      <>
        <MenuItem icon={<Icon name="edit-3" />}>Edit File</MenuItem>
        <MenuItem icon={<Icon name="copy" />}>Duplicate</MenuItem>
        <MenuItem icon={<Icon name="share-2" />}>Share</MenuItem>
        <MenuDivider />
        <MenuItem icon={<Icon name="trash-2" />}>Delete File</MenuItem>
      </>
    ),
  },
};

/**
 * This story demonstrates the `asChild` prop. The "View Profile"
 * item is a standard `MenuItem` rendering a button. The "Open Google"
 * item uses `asChild` to render as an `<a>` tag.
 */
export const PolymorphicLink: Story = {
  name: 'Polymorphic (as Link)',
  args: {
    position: 'bottom-left',
    trigger: (
      <Button variant="secondary" iconLeft="user" iconRight="chevron-down">
        User Menu
      </Button>
    ),
    children: (
      <>
        <MenuItem icon={<Icon name="user-check" />}>View Profile</MenuItem>
        <MenuItem icon={<Icon name="settings" />}>Settings</MenuItem>
        <MenuDivider />
        {/* This is the key test case */}
        <MenuItem
          asChild
          icon={<Icon name="external-link" />}
        >
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Google
          </a>
        </MenuItem>
      </>
    ),
  },
};