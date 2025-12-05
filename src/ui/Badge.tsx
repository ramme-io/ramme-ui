import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

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
        // FIX: This now correctly uses our theme's 'destructive' color variables.
        danger:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        success:
          'border-transparent bg-accent text-accent-foreground shadow hover:bg-accent/80',
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
 * type: "'primary' | 'secondary' | 'danger' | 'success' | 'outline'"
 * description: The visual style of the badge.
 * - name: children
 * type: React.ReactNode
 * description: The content to display inside the badge.
 * @category ui
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };