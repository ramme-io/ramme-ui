// src/components/ui/Select.tsx
import React from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
}

/**
 * @wizard
 * @name Select
 * @description A standard HTML select dropdown component for choosing a single option from a list.
 * @tags form, input, dropdown, ui
 * @props
 * - name: options
 * type: { value: string | number; label: string; }[]
 * description: An array of objects defining the selectable options, each with a `value` and `label`.
 * - name: label
 * type: string
 * description: An optional label displayed above the select dropdown.
 * - name: id
 * type: string
 * description: A unique HTML `id` for the select element. Automatically generated if not provided.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the select element.
 * - name: value
 * type: string | number | readonly string[]
 * description: The currently selected option's value.
 * - name: onChange
 * type: (event: React.ChangeEvent<HTMLSelectElement>) => void
 * description: Callback function triggered when the selected value changes.
 * - name: disabled
 * type: boolean
 * description: If true, the select dropdown will be unclickable.
 * @category form
 */
export const Select: React.FC<SelectProps> = ({ options, label, id, className, ...props }) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const baseStyles = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary appearance-none';
  const themeStyles = 'bg-card border-border text-text';
  const arrowStyles = `bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5em_1.5em]`;

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-text mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`${baseStyles} ${themeStyles} ${arrowStyles} ${className || ''}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};