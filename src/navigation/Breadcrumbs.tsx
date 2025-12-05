import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItemProps {
  label: React.ReactNode;
  to?: string;
  isCurrent?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * @wizard
 * @name BreadcrumbItem
 * @description Represents a single step or link within a `Breadcrumbs` navigation path.
 * @tags navigation, ui, link
 * @props
 * - name: label
 * type: React.ReactNode
 * description: The text or content displayed for this breadcrumb item.
 * - name: to
 * type: string
 * description: The URL path for this item to navigate to. If not provided, it's just text.
 * - name: isCurrent
 * type: boolean
 * description: If true, indicates this is the current page and will not be a clickable link.
 * - name: icon
 * type: React.ReactNode
 * description: An optional icon to display next to the breadcrumb label.
 * - name: className
 * type: string
 * description: Additional CSS classes for custom styling of the individual item.
 * @category navigation
 */
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ label, to, isCurrent, className, icon }) => {
  const baseStyles = 'inline-flex items-center text-sm font-medium';
  const themeStyles = isCurrent ? 'text-text' : 'text-primary hover:text-secondary';
  const separatorStyles = 'ml-2 text-muted-foreground';

  // FIX: Cloned the icon to pass size and className props directly, removing the span wrapper.
  const iconElement = icon && React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        size: 14, // This is equivalent to Tailwind's h-3.5/w-3.5
        className: 'mr-1.5',
      })
    : null;

  const content = (
    <>
      {iconElement}
      {label}
    </>
  );

  return (
    <li className={`${baseStyles} ${themeStyles} ${className || ''}`} aria-current={isCurrent ? 'page' : undefined}>
      {to && !isCurrent ? (
        <Link to={to} className="inline-flex items-center hover:underline">
          {content}
        </Link>
      ) : (
        <span className="inline-flex items-center">{content}</span>
      )}
      {!isCurrent && <span className={separatorStyles}>/</span>}
    </li>
  );
};

interface BreadcrumbsProps {
  children: React.ReactElement<BreadcrumbItemProps>[];
  className?: string;
}

/**
 * @wizard
 * @name Breadcrumbs
 * @description A navigation component that shows the user's current location within a hierarchy of pages.
 * @tags navigation, ui, path
 * @props
 * - name: children
 * type: React.ReactElement<BreadcrumbItemProps>[]
 * description: A collection of `BreadcrumbItem` components representing the path.
 * - name: className
 * type: string
 * description: Additional CSS classes for custom styling of the breadcrumbs container.
 * @category navigation
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children, className }) => {
  return (
    <nav className={`flex ${className || ''}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {children}
      </ol>
    </nav>
  );
};

export { Breadcrumbs, BreadcrumbItem };