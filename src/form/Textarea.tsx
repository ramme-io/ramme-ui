// packages/ui/src/form/Textarea.tsx
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
}

/**
 * @wizard
 * @name Textarea
 * @description A theme-aware textarea component for multi-line text input.
 * @tags form, input, ui
 * @props
 * - name: label
 * type: string
 * description: An optional label to display above the textarea.
 * - name: containerClassName
 * type: string
 * description: Optional additional CSS classes for the container div.
 * @category form
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className, containerClassName, ...props }, ref) => {
    const baseStyles = 'w-full px-3 py-2 rounded-md bg-card border border-border transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary';
    
    return (
      <div className={`w-full ${containerClassName || ''}`}>
        {label && (
          <label htmlFor={props.id || props.name} className="block text-sm font-medium text-text-light mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${baseStyles} ${className || ''}`}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';