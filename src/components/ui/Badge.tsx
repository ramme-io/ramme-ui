import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn'; // ✅ Use the powerful central utility

// Define badge styles and variants using cva
const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        danger:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        success:
          'border-transparent bg-success text-success-foreground shadow hover:bg-success/80', // ✅ Fixed: Use semantic success token
        warning:
          'border-transparent bg-warning text-warning-foreground shadow hover:bg-warning/80', // ✅ Added: Missing variant
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * @wizard
 * @name Badge
 * @description A small component to display a status, count, or label.
 * @tags ui, label, indicator
 * @props
 * - name: variant
 * type: "'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline'"
 * description: The visual style of the badge.
 * - name: children
 * type: React.ReactNode
 * description: The content to display inside the badge.
 * - name: className
 * type: string
 * description: Optional additional CSS classes.
 * @category ui
 * @id badge
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div 
        ref={ref} // ✅ Fixed: Forward ref to DOM element
        className={cn(badgeVariants({ variant }), className)} 
        {...props} 
      />
    );
  }
);

Badge.displayName = 'Badge';

export { badgeVariants };