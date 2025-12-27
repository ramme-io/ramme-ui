import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import {
  Sidebar,
  SidebarProvider,
  useSidebar,
  SidebarTrigger,
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
            <main className="flex-1 p-8 relative flex flex-col">
              
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Main Content Area</h1>
                {/* Mobile Trigger handles its own visibility (md:hidden) */}
                <SidebarTrigger /> 
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  This layout demonstrates the <strong>"Zero Jank"</strong> sidebar architecture.
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Ghost Spacer:</strong> Notice how the content doesn't "jump" when you toggle. 
                    An invisible spacer reserves the room instantly.
                  </li>
                  <li>
                    <strong>Text Handling:</strong> Labels fade out before the width collapses, preventing text wrapping/squishing.
                  </li>
                  <li>
                    <strong>Mobile Overlay:</strong> Resize the window to mobile view to see the backdrop behavior.
                  </li>
                </ul>
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
    <Sidebar>
      <StorySidebarContent />
    </Sidebar>
  ),
};

export const InitiallyOpen: Story = {
  render: () => {
    const { setIsOpen } = useSidebar();

    // Force open on mount for visual regression testing
    React.useEffect(() => {
      setIsOpen(true);
    }, [setIsOpen]);

    return (
      <Sidebar>
        <StorySidebarContent />
      </Sidebar>
    );
  },
};