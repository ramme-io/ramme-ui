/**
 * @file Button.tsx
 * @repository ramme-ui
 * @description The primary Button component for the Ramme design system.
 */

import React from 'react';
import { cva } from 'class-variance-authority'; // <--- Removed unused 'type VariantProps'
import { Icon, type IconName } from './Icon';
import { cn } from '../../utils/cn';
import { Slot } from '@radix-ui/react-slot';

/** @wizard
 * @name Button
 * @description The primary interactive element. Supports polymorphism (rendering as a link) via the 'asChild' prop.
 * @category Input
 * @props 
 * - name: variant
 * type: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link' | 'accent'
 * description: The visual style of the button.
 * default: 'primary'
 * - name: size
 * type: 'sm' | 'md' | 'lg' | 'icon'
 * description: The size of the button.
 * default: 'md'
 * - name: loading
 * type: boolean
 * description: If true, replaces content with a spinner.
 * default: false
 * - name: iconLeft
 * type: IconName
 * description: Optional icon to display before the text.
 * - name: asChild
 * type: boolean
 * description: If true, delegates rendering to the child element (e.g. for Links).
 * default: false
 * - name: onClick
 * type: () => void
 * description: Callback fired when the button is clicked.
 * @id button
 */

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        danger:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
      },
      size: {
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

// Explicitly defining the interface prevents type loss during the build
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link' | 'accent' | null;
  size?: 'sm' | 'md' | 'lg' | 'icon' | null;
  asChild?: boolean;
  loading?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      asChild = false,
      loading,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <Icon name="loader-circle" className="animate-spin mr-2" />}
            {!loading && iconLeft && <Icon name={iconLeft} className="mr-2" />}
            {children}
            {!loading && iconRight && <Icon name={iconRight} className="ml-2" />}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };