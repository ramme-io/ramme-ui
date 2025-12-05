import React from 'react';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

/**
 * @wizard
 * @name Radio
 * @description A single radio button input, typically used within a group where only one option can be selected.
 * @tags form, input, selection, ui
 * @props
 * - name: label
 * type: React.ReactNode
 * description: The visible label associated with the radio button. Can be text or JSX.
 * - name: id
 * type: string
 * description: A unique HTML `id` for the input element. Automatically generated if not provided.
 * - name: name
 * type: string
 * description: The HTML `name` attribute, crucial for grouping radio buttons so only one can be selected.
 * - name: value
 * type: string | number | readonly string[]
 * description: The value associated with this radio button when it is selected.
 * - name: checked
 * type: boolean
 * description: Controls whether the radio button is currently selected.
 * - name: onChange
 * type: (event: React.ChangeEvent<HTMLInputElement>) => void
 * description: Callback function triggered when the radio button's checked state changes.
 * - name: disabled
 * type: boolean
 * description: If true, the radio button is unclickable and styled as disabled.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the input element.
 * @category form
 */

export const Radio: React.FC<RadioProps> = ({ label, id, className, ...props }) => {
  const uniqueId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  const baseStyles = 'form-radio h-4 w-4 transition-colors duration-200 ease-in-out cursor-pointer';
  const themeStyles = 'text-primary border-border bg-card focus:ring-primary';
  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="flex items-center">
      <input
        id={uniqueId}
        type="radio"
        className={`${baseStyles} ${themeStyles} ${disabledStyles} ${className || ''}`}
        {...props}
      />
      {label && (
        <label htmlFor={uniqueId} className="ml-2 text-sm text-text cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};