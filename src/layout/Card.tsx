import { type HTMLAttributes, type FC } from 'react';

// A utility for safely merging Tailwind classes.
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

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
 */
export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  // Base styles use theme-aware Tailwind utilities directly.
  // `rounded-md` now maps to our themeable `--app-border-radius-md` variable.
  const baseStyles = 'bg-card border border-border rounded-md';

  return (
    <div className={cn(baseStyles, className)} {...props}>
      {children}
    </div>
  );
};