// packages/ui/src/templates-patterns/PageHeader.tsx
import React from 'react';

export interface PageHeaderProps {
  /** The main title of the page. */
  title: string;
  /** A brief description or subtitle displayed below the title. */
  description?: string;
  /** A slot for action buttons or other controls, typically aligned to the right. */
  actions?: React.ReactNode;
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * @wizard
 * @name PageHeader
 * @description Displays the main header section of a page, including a title, optional description, and a slot for action buttons.
 * @tags layout, typography, header, ui, template
 * @props
 * - name: title
 * type: string
 * description: The main title of the page.
 * - name: description
 * type: string
 * description: A brief descriptive subtitle displayed below the main title.
 * - name: actions
 * type: React.ReactNode
 * description: A slot for action buttons or other controls, typically aligned to the right of the header.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the page header container.
 * @category templates-patterns
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actions, className }) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 border-b border-border ${className || ''}`}>
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-text">{title}</h1>
        {description && <p className="mt-1 text-text-light">{description}</p>}
      </div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
};