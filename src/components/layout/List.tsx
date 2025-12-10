// src/components/ui/List.tsx
import React from 'react';

interface ListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  // Add any specific props if needed
}

/**
 * @wizard
 * @name ListItem
 * @description Represents a single item within a `List` component.
 * @tags ui, layout, typography
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The content of the list item.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the list item (`<li>`).
 * @category layout
 */

const ListItem: React.FC<ListItemProps> = ({ children, className, ...props }) => {
  const baseStyles = 'mb-1 last:mb-0';
  const themeStyles = 'text-text';
  return (
    <li className={`${baseStyles} ${themeStyles} ${className || ''}`} {...props}>
      {children}
    </li>
  );
};

interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  type?: 'ul' | 'ol'; // 'ul' for unordered, 'ol' for ordered
  children: React.ReactNode;
}

/**
 * @wizard
 * @name List
 * @description A component for displaying either ordered or unordered lists of `ListItem`s.
 * @tags ui, layout, typography
 * @props
 * - name: type
 * type: 'ul' | 'ol'
 * description: Specifies whether the list should be unordered ('ul') or ordered ('ol').
 * default: 'ul'
 * - name: children
 * type: React.ReactNode
 * description: The list items, typically `ListItem` components.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the list container (`<ul>` or `<ol>`).
 * @category layout
 */

const List: React.FC<ListProps> = ({ type = 'ul', children, className, ...props }) => {
  const baseStyles = 'space-y-1'; // Tailwind class for spacing between list items
  const themeStyles = 'text-text'; // General text color, ListItem handles its own
  const listTag = type === 'ol' ? 'ol' : 'ul';

  return React.createElement(
    listTag,
    { className: `${baseStyles} ${themeStyles} ${className || ''}`, ...props },
    children
  );
};

interface DefinitionTermProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * @wizard
 * @name DefinitionTerm
 * @description Represents a term within a `DefinitionList`.
 * @tags ui, layout, typography
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The content of the definition term.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the definition term (`<dt>`).
 * @category layout
 */

const DefinitionTerm: React.FC<DefinitionTermProps> = ({ children, className, ...props }) => {
  const baseStyles = 'font-semibold text-text';
  return (
    <dt className={`${baseStyles} ${className || ''}`} {...props}>
      {children}
    </dt>
  );
};

interface DefinitionDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * @wizard
 * @name DefinitionDescription
 * @description Represents the description for a term within a `DefinitionList`.
 * @tags ui, layout, typography
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The content of the definition description.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the definition description (`<dd>`).
 * @category layout
 */

const DefinitionDescription: React.FC<DefinitionDescriptionProps> = ({ children, className, ...props }) => {
  const baseStyles = 'ml-4 text-text'; // Indent description
  return (
    <dd className={`${baseStyles} ${className || ''}`} {...props}>
      {children}
    </dd>
  );
};

interface DefinitionListProps extends React.HTMLAttributes<HTMLDListElement> {
  children: React.ReactNode;
}

/**
 * @wizard
 * @name DefinitionList
 * @description Displays a list of terms and their corresponding definitions.
 * @tags ui, layout, typography, data-display
 * @props
 * - name: children
 * type: React.ReactNode
 * description: A collection of `DefinitionTerm` and `DefinitionDescription` components.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the definition list container (`<dl>`).
 * @category layout
 */

const DefinitionList: React.FC<DefinitionListProps> = ({ children, className, ...props }) => {
  const baseStyles = 'space-y-2'; // Spacing between term/description pairs
  return (
    <dl className={`${baseStyles} ${className || ''}`} {...props}>
      {children}
    </dl>
  );
};


export { List, ListItem, DefinitionList, DefinitionTerm, DefinitionDescription };