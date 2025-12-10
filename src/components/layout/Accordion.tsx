'use client';

// src/components/ui/Accordion.tsx
import React, { useState, useCallback } from 'react';

// AccordionItem Component
interface AccordionItemProps {
  id: string; // Unique ID for the item
  header: React.ReactNode; // Content for the clickable header
  children: React.ReactNode; // Content for the collapsible body
  isOpen?: boolean; // Controlled open state for individual item
  onToggle?: (id: string, isOpen: boolean) => void; // Callback for controlled state
}

/**
 * @wizard
 * @name AccordionItem
 * @description A single, collapsible section within an `Accordion` component, consisting of a header and a hidden content body.
 * @tags layout, ui, collapsible, expandable
 * @props
 * - name: id
 * type: string
 * description: A unique identifier for this accordion item. Essential for `singleOpen` behavior.
 * - name: header
 * type: React.ReactNode
 * description: The content displayed in the clickable header of the accordion item.
 * - name: children
 * type: React.ReactNode
 * description: The content that will be revealed or hidden when the accordion item is toggled.
 * - name: isOpen
 * type: boolean
 * description: Controls the open/closed state for this specific item (when used in a controlled `Accordion`).
 * - name: onToggle
 * type: (id: string, isOpen: boolean) => void
 * description: Callback triggered when the item is toggled, providing its `id` and new `isOpen` state.
 * @category layout
 */


const AccordionItem: React.FC<AccordionItemProps> = ({ id, header, children, isOpen, onToggle }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen !== undefined ? isOpen : false);
  const isControlled = isOpen !== undefined;
  const activeIsOpen = isControlled ? isOpen : internalIsOpen;

  const handleToggle = useCallback(() => {
    if (isControlled && onToggle) {
      onToggle(id, !activeIsOpen);
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  }, [id, activeIsOpen, isControlled, onToggle]);

  const arrowClasses = `transform transition-transform duration-300 ${activeIsOpen ? 'rotate-180' : 'rotate-0'}`;

  return (
    <div className="border border-border rounded-md overflow-hidden">
      <button
        id={`accordion-header-${id}`}
        aria-expanded={activeIsOpen}
        aria-controls={`accordion-panel-${id}`}
        onClick={handleToggle}
        className="flex items-center justify-between w-full p-4 text-text bg-background hover:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        role="heading"
        aria-level={3} // Semantic heading level
      >
        <span className="text-xl font-semibold">{header}</span>
        <svg className={`w-6 h-6 text-text ${arrowClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        style={{
          maxHeight: activeIsOpen ? '1000px' : '0', // Arbitrary large height for transition
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out'
        }}
      >
        <div className="p-4 bg-card">
          {children}
        </div>
      </div>
    </div>
  );
};

// Accordion Component (Container for multiple AccordionItems)
interface AccordionProps {
  children: React.ReactElement<AccordionItemProps>[]; // Expects AccordionItem children
  singleOpen?: boolean; // If only one item can be open at a time
  className?: string; // Class for the outer accordion container
}

/**
 * @wizard
 * @name Accordion
 * @description A container for multiple collapsible sections (`AccordionItem`s), useful for organizing content.
 * @tags layout, ui, collapsible, expandable
 * @props
 * - name: children
 * type: React.ReactElement<AccordionItemProps>[]
 * description: A collection of `AccordionItem` components to be managed by this Accordion.
 * - name: singleOpen
 * type: boolean
 * description: If true, only one `AccordionItem` can be open at a time. Opening one closes others.
 * default: false
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the Accordion container.
 * @category layout
 */

const Accordion: React.FC<AccordionProps> = ({ children, singleOpen = false, className }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleToggleItem = useCallback((id: string, isOpen: boolean) => {
    if (singleOpen) {
      setOpenItem(isOpen ? id : null);
    }
  }, [singleOpen]);

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        return React.cloneElement(child, {
          isOpen: singleOpen ? child.props.id === openItem : undefined,
          onToggle: singleOpen ? handleToggleItem : undefined,
        });
      })}
    </div>
  );
};

export { Accordion, AccordionItem };