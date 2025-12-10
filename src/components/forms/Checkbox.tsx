'use client'; 

import React, { useState } from 'react';


export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

/**
 * @wizard
 * @name Checkbox
 * @description A standard checkbox input for selecting one or more options from a set.
 * @tags form, input, selection, ui
 * @props
 * - name: label
 * type: React.ReactNode
 * description: The visible label associated with the checkbox. Can be text or JSX.
 * - name: id
 * type: string
 * description: A unique HTML `id` for the input element. Automatically generated if not provided.
 * - name: checked
 * type: boolean
 * description: Controls whether the checkbox is currently checked.
 * - name: onChange
 * type: (event: React.ChangeEvent<HTMLInputElement>) => void
 * description: Callback function triggered when the checkbox's checked state changes.
 * - name: disabled
 * type: boolean
 * description: If true, the checkbox is unclickable and styled as disabled.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the input element.
 * @category form
 */
export const Checkbox: React.FC<CheckboxProps> = ({ label, id, className, ...props }) => {
  // Generate a unique ID only once on the client-side render
  const [uniqueId] = useState(() => id || `checkbox-${Math.random().toString(36).substr(2, 9)}`);
  
  const baseStyles = 'form-checkbox h-4 w-4 rounded transition-colors duration-200 ease-in-out cursor-pointer';
  const themeStyles = 'text-primary border-border bg-card focus:ring-primary';
  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="flex items-center">
      <input
        id={uniqueId}
        type="checkbox"
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