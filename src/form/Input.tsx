import React from 'react';
import { Icon, type IconName } from '../ui/Icon';
import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: IconName;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  showOptionalLabel?: boolean;
  containerClassName?: string;
}

/**
 * @wizard
 * @name Input
 * @description A theme-aware text input component with support for labels, icons, helper text, and validation states.
 * @tags form, input, ui, text
 * @props
 * - name: label
 * type: string
 * description: An optional label to display above the input field.
 * - name: icon
 * type: IconName
 * description: Optional icon name to display inside the input field.
 * - name: helperText
 * type: string
 * description: A string that provides a hint or an error message below the input.
 * - name: error
 * type: boolean
 * description: If true, the input will be styled to indicate an error.
 * default: false
 * - name: required
 * type: boolean
 * description: If true, a required indicator (*) will be displayed next to the label.
 * default: false
 * - name: showOptionalLabel
 * type: boolean
 * description: If true, an "(optional)" indicator will be displayed next to the label.
 * default: false
 * - name: containerClassName
 * type: string
 * description: Optional additional CSS classes for the container.
 * - name: All other standard HTML input attributes are also supported.
 * @category form
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    icon,
    helperText,
    error = false,
    required = false,
    showOptionalLabel = false,
    className,
    containerClassName,
    ...props
  }, ref) => {

    const baseInputStyles = 'flex h-10 w-full rounded-md border bg-background py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    
    const stateStyles = error ? 'border-destructive' : 'border-input';
    const iconPadding = icon ? 'pl-10 pr-3' : 'px-3';

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label htmlFor={props.id || props.name} className="block text-sm font-medium text-foreground mb-1">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
            {!required && showOptionalLabel && <span className="text-xs text-muted-foreground ml-1">(optional)</span>}
          </label>
        )}
        <div className="relative w-full">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name={icon} className="text-muted-foreground" size={16} />
            </div>
          )}
          <input
            ref={ref}
            className={cn(baseInputStyles, stateStyles, iconPadding, className)}
            required={required}
            {...props}
          />
        </div>
        {helperText && (
          <p className={cn('mt-1.5 text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';