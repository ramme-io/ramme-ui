import React from 'react';
import { cn } from '../../utils/cn';

export interface SegmentedControlOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string | number;
  onChange: (value: any) => void;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * @wizard
 * @name SegmentedControl
 * @description A linear toggle component that functions like a radio group. Ideal for switching between discrete modes (e.g., "Off / Auto / On").
 * @tags input, toggle, switch, radio, control
 * @category input
 * @props
 * - name: options
 * type: Array<{ label: string, value: string | number }>
 * description: The list of segments to display.
 * - name: value
 * type: string | number
 * description: The currently selected value.
 * - name: onChange
 * type: function
 * description: Callback fired when a segment is selected.
 * - name: size
 * type: 'sm' | 'md'
 * description: The size of the control.
 * default: 'md'
 * - name: className
 * type: string
 * description: Additional CSS classes.
 * @id segmented-control
 */
export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  size = 'md',
  className,
}) => {
  return (
    <div className={cn(
      "inline-flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700",
      className
    )}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={String(option.value)}
            onClick={() => !option.disabled && onChange(option.value)}
            disabled={option.disabled}
            className={cn(
              "relative rounded-md font-medium transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
              size === 'sm' ? "text-xs px-3 py-1" : "text-sm px-4 py-1.5",
              isSelected 
                ? "bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200",
              option.disabled && "opacity-50 cursor-not-allowed"
            )}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};