import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { cn } from '../../utils/cn';
import { Icon } from '../ui/Icon';
import 'react-datepicker/dist/react-datepicker.css';

// We inject a global style override to force the library to respect our tokens
const GLOBAL_STYLE_OVERRIDE = `
  .react-datepicker {
    font-family: inherit !important;
    background-color: rgb(var(--app-card-bg-color)) !important;
    border: 1px solid rgb(var(--app-border-color)) !important;
    border-radius: var(--app-border-radius-md) !important;
    color: rgb(var(--app-text-color)) !important;
  }
  .react-datepicker__header {
    background-color: rgb(var(--app-bg-color)) !important;
    border-bottom: 1px solid rgb(var(--app-border-color)) !important;
  }
  .react-datepicker__current-month, .react-datepicker__day-name, .react-datepicker__day {
    color: rgb(var(--app-text-color)) !important;
  }
  .react-datepicker__day:hover {
    background-color: rgb(var(--app-primary-color) / 0.1) !important;
  }
  .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
    background-color: rgb(var(--app-primary-color)) !important;
    color: rgb(var(--app-primary-foreground-color)) !important;
  }
  .react-datepicker__navigation-icon::before {
    border-color: rgb(var(--app-text-color)) !important;
  }
`;

export interface DatePickerProps {
  label?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  placeholderText?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  error?: boolean;
  helperText?: string;
  showTimeSelect?: boolean;
  isClearable?: boolean;
}

/**
 * @wizard
 * @name DatePicker
 * @description A theme-aware calendar input for selecting dates. Wraps react-datepicker to ensure consistent styling and "Zero Jank" layout stability.
 * @tags form, input, date, calendar, ui
 * @category form
 * @id date-picker
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selected,
  onChange,
  className,
  error,
  helperText,
  ...props
}) => {
  return (
    <div className={cn("w-full flex flex-col", className)}>
      <style>{GLOBAL_STYLE_OVERRIDE}</style>
      
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}
      
      <div className="relative">
        <ReactDatePicker
          selected={selected}
          onChange={onChange}
          className={cn(
            "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-destructive" : "border-input"
          )}
          wrapperClassName="w-full" // Forces the input to take full width
          showPopperArrow={false}
          {...props}
        />
        <div className="absolute right-3 top-2.5 pointer-events-none text-muted-foreground">
          <Icon name="calendar" className="h-4 w-4" />
        </div>
      </div>

      {helperText && (
        <p className={cn("mt-1.5 text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {helperText}
        </p>
      )}
    </div>
  );
};