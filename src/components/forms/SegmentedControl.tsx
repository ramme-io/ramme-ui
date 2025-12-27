import React from 'react';
import { cn } from '../../utils/cn';

export interface SegmentedControlOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** The list of segments to display. */
  options: SegmentedControlOption[];
  /** The currently selected value. */
  value: string | number;
  /** Callback fired when a segment is selected. */
  onChange: (value: any) => void;
  /** The size of the control. */
  size?: 'sm' | 'md';
  /** Additional CSS classes. */
  className?: string;
}

/**
 * @wizard
 * @name SegmentedControl
 * @description A theme-aware linear toggle component. Ideal for switching between discrete modes (e.g., "Map / List").
 * @tags input, toggle, switch, radio, control
 * @category form
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
      // Container: Use 'muted' background for the track (works in all themes)
      "inline-flex bg-muted rounded-lg p-1 border border-border",
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
              "relative rounded-md font-medium transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              
              // Size Variants
              size === 'sm' ? "text-xs px-3 py-1" : "text-sm px-4 py-1.5",
              
              // State Styles (Theme Aware)
              isSelected 
                ? "bg-card text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              
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