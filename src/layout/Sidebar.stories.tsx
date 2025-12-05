// ramme-ui/src/layout/Sidebar.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import {
  Sidebar,
  SidebarProvider,
  useSidebar,
  SidebarTrigger, // <-- 1. Import the trigger
} from './Sidebar';

// Import our new, updated content component
import { StorySidebarContent } from './StorySidebarContent';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        {/* The Provider must wrap everything */}
        <SidebarProvider>
          <div className="flex h-[800px] w-full bg-background">
            <Story /> {/* Renders <Sidebar> */}
            <main className="flex-1 p-8 relative">
              
              {/* --- 2. ADD THE TRIGGER --- */}
              {/* This is the hamburger button for mobile */}
              <SidebarTrigger /> 

              <div className="mt-8 md:mt-0">
                <h1 className="text-2xl font-bold">Main Content Area</h1>
                <p className="text-muted-foreground">
                  Use{' '}
                  <kbd className="font-mono bg-muted text-muted-foreground p-1 rounded-md">
                    Cmd+B
                  </kbd>{' '}
                  to toggle the sidebar.
                </p>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// --- Stories ---

export const Default: Story = {
  render: () => (
    // This story now correctly shows the sidebar
    // in its default state (closed on mobile, collapsed on desktop)
    <Sidebar>
      <StorySidebarContent />
    </Sidebar>
  ),
};

// --- 3. REMOVED REDUNDANT STORY ---
// We no longer need 'InitiallyCollapsed' because
// our provider now defaults to 'isOpen: false'.

// --- 4. (Optional) ADD AN "INITIALLY OPEN" STORY ---
// This is a better test case
export const InitiallyOpen: Story = {
  render: () => {
    const { setIsOpen } = useSidebar();

    React.useEffect(() => {
      // Set initial state to open
      setIsOpen(true);
    }, [setIsOpen]);

    return (
      <Sidebar>
        <StorySidebarContent />
      </Sidebar>
    );
  },
};