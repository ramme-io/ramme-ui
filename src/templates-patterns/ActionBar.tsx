// src/templates-patterns/ActionBar.tsx
import React from 'react';

export interface ActionBarProps {
  /** The content of the action bar, typically buttons. */
  children: React.ReactNode;
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * @wizard
 * @name ActionBar
 * @description A persistent bar, typically at the bottom of a form or page, used to group primary actions like 'Save' and 'Cancel'.
 * @tags layout, form, actions, buttons, ui, pattern
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The content of the action bar, typically `Button` components.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the action bar container.
 * @category layout
 */
export const ActionBar: React.FC<ActionBarProps> = ({ children, className }) => {
  return (
    <div className={`flex items-center justify-end gap-4 p-4 bg-background-alt border-t border-border ${className || ''}`}>
      {children}
    </div>
  );
};