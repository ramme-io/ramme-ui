'use client';

/**
 * @file Menu.tsx
 * @repository ramme-ui
 * @description Provides the dropdown Menu, MenuItem, and MenuDivider components.
 *
 * @developer_notes
 * STRATEGIC UPGRADE (10/20/2025):
 * This component has been upgraded to support polymorphism using the `asChild`
 * pattern, facilitated by the `@radix-ui/react-slot` package.
 *
 * 1. Why?: The original `MenuItem` was hardcoded to render a `<button>`.
 * This made it impossible for consumer applications (like `ramme-app-starter`)
 * to use it with React Router's `<Link>` component, which must render an `<a>` tag
 * to be accessible and functional.
 *
 * 2. The Fix: `MenuItem` now accepts an `asChild` prop.
 * - If `asChild` is `false` (default), it renders a `<button>` as before.
 * - If `asChild` is `true`, it renders a `<Slot>` component, which
 * "melts" its props onto the React component passed as its child.
 *
 * 3. Consistency: This pattern matches our `Button` component, creating a
 * consistent and predictable API across the entire `ramme-ui` library.
 * We also migrated the hardcoded class strings to use our `cn` utility.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils/cn';

/**
 * @wizard
 * @name MenuDivider
 * @description A visual separator for grouping MenuItems within a Menu.
 */
const MenuDivider: React.FC = () => (
  <div className="my-1 h-px bg-border" role="separator" />
);

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  asChild?: boolean;
}

/**
 * @wizard
 * @name MenuItem
 * @description An individual selectable item within a Menu component.
 */
const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  disabled,
  icon,
  asChild = false,
}) => {
  const itemClasses = cn(
    'flex items-center w-full text-left px-3 py-1.5 text-sm cursor-pointer transition-colors duration-150 ease-in-out whitespace-nowrap rounded-md',
    'hover:bg-accent hover:text-accent-foreground text-text',
    disabled && 'opacity-50 cursor-not-allowed',
  );

  // We still calculate the icon, but only use it if asChild is false
  const iconElement =
    icon && React.isValidElement(icon)
      ? React.cloneElement(icon as React.ReactElement<any>, {
          size: 14,
          className: 'mr-2 text-muted-foreground',
        })
      : null;

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      onClick={onClick}
      disabled={disabled}
      className={itemClasses}
      role="menuitem"
    >
      {/* --- THIS IS THE FIX ---
        If asChild is true, pass *only* children.
        If asChild is false, render the icon and children as before.
      */}
      {asChild ? (
        children
      ) : (
        <>
          {iconElement}
          {children}
        </>
      )}
    </Comp>
  );
};

// ... (Rest of Menu.tsx remains the same) ...

interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

/**
 * @wizard
 * @name Menu
 * @description A dropdown menu component, useful for navigation or contextual actions.
 */
const Menu: React.FC<MenuProps> = ({
  trigger,
  children,
  position = 'bottom-right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = window.setTimeout(() => setIsOpen(false), 150);
  };

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'top-full left-0 mt-1';
      case 'bottom-right':
        return 'top-full right-0 mt-1';
      case 'top-left':
        return 'bottom-full left-0 mb-1';
      case 'top-right':
        return 'bottom-full right-0 mb-1';
      default:
        return 'top-full right-0 mt-2';
    }
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={toggleMenu} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          className={`origin-top-right absolute z-50 rounded-md shadow-lg bg-card border border-border ring-1 ring-black ring-opacity-5 focus:outline-none min-w-[12rem] w-max ${getPositionClasses()}`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-2" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export { Menu, MenuItem, MenuDivider };