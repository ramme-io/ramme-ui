import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn'; // ✅ Use central utility

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Extends standard div props
}

/**
 * @wizard
 * @name Card
 * @description A versatile container that adapts to the current theme. Its background, border, and shape are themeable.
 * @tags layout, ui, container, box
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The content to be displayed inside the card.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling. Use this for adding padding, shadows, etc. (e.g., 'p-4 shadow-lg').
 * @category layout
 * @id card
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base Appearance
          "bg-card text-card-foreground", // ✅ Ensures text matches background contrast
          "rounded-lg border border-border shadow-sm", // ✅ Default modern style
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";