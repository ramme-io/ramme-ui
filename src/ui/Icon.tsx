'use client';

import React, { memo, useState, useEffect } from 'react';
// This line is now corrected to import the 'LucideIcon' type directly.
import type { LucideProps, LucideIcon } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

// Define the props for our custom Icon component
export type IconName = keyof typeof dynamicIconImports;

interface IconProps extends Omit<LucideProps, 'name'> {
  name: IconName;
  className?: string;
}

/**
 * @wizard
 * @name Icon
 * @description A dynamic component that renders scalable vector icons from the Lucide library.
 * @tags ui, graphics, svg, symbol
 * @props
 * - name: name
 * type: IconName
 * description: The specific name of the Lucide icon to display (e.g., 'user', 'settings', 'check').
 * - name: size
 * type: number | string
 * description: The width and height of the icon in pixels or CSS units.
 * default: 24 (implicit from Lucide default)
 * - name: color
 * type: string
 * description: The color of the icon.
 * - name: strokeWidth
 * type: number | string
 * description: The width of the icon's stroke.
 * default: 2 (implicit from Lucide default)
 * - name: className
 * type: string
 * description: Optional additional CSS classes for styling the SVG element.
 * @category ui
 */
const IconComponent: React.FC<IconProps> = ({ name, className, ...props }) => {
  // State to hold the dynamically imported icon component
  const [ImportedIcon, setImportedIcon] = useState<LucideIcon | null>(null);

  useEffect(() => {
    let isMounted = true;
    const importIcon = async () => {
      try {
        // Dynamically import the icon
        const module = await dynamicIconImports[name]();
        if (isMounted) {
          // Set the imported component into state
          setImportedIcon(() => module.default);
        }
      } catch (error) {
          console.error(`Icon not found: ${name}`);
      }
    };
    importIcon();
    
    // Cleanup function to prevent state updates on unmounted components
    return () => {
      isMounted = false;
    };
  }, [name]); // This effect runs only when the 'name' prop changes

  // If the icon has been imported, render it
  if (ImportedIcon) {
    return <ImportedIcon className={className} {...props} />;
  }

  // Otherwise, render a fallback placeholder
  return <span style={{ height: props.size || 24, width: props.size || 24, display: 'inline-block' }} />;
};

// Memoize the component to prevent re-renders if props haven't changed
export const Icon = memo(IconComponent);