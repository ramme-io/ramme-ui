// packages/ui/src/components/ToggleSwitch.tsx
"use client";

import React from 'react';

export interface ToggleSwitchProps {
  /** Whether the toggle is checked or not. */
  checked: boolean;
  /** Callback function that is called when the toggle state changes. */
  onChange: (checked: boolean) => void;
  /** An accessible label for the toggle switch. */
  label: string;
  /** Optional additional CSS classes for the container. */
  className?: string;
  /** If true, the toggle will be disabled. */
  disabled?: boolean;
}

/**
 * @wizard
 * @name ToggleSwitch
 * @description A theme-aware toggle switch component, offering a boolean input alternative to a checkbox.
 * @tags form, ui, toggle, switch, input
 * @props
 * - name: checked
 * type: boolean
 * description: Controls whether the toggle is in the 'on' (checked) or 'off' (unchecked) state.
 * - name: onChange
 * type: (checked: boolean) => void
 * description: Callback function triggered when the toggle state changes.
 * - name: label
 * type: string
 * description: An accessible text label displayed next to the toggle switch.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the toggle switch container.
 * - name: disabled
 * type: boolean
 * description: If true, the toggle will be unclickable and styled as disabled.
 * default: false
 * @category form
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  className,
  disabled = false,
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const uniqueId = React.useId();

  return (
    <label htmlFor={uniqueId} className={`flex items-center cursor-pointer ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative">
        <input
          id={uniqueId}
          type="checkbox"
          className="sr-only" // Hide the default checkbox
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
        />
        {/* The track of the toggle */}
        <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-primary' : 'bg-border'}`}></div>
        {/* The thumb of the toggle */}
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : ''}`}
        ></div>
      </div>
      <div className="ml-3 text-text font-medium select-none">{label}</div>
    </label>
  );
};