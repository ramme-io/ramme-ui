// src/form/DatePicker.tsx
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useTheme } from '../contexts/ThemeContext'; // Assuming path to ThemeContext
import { Input } from './Input'; // Assuming named export for Input

// Import the necessary CSS for the datepicker
import 'react-datepicker/dist/react-datepicker.css';

// Explicitly define the props we want to expose from the library.
// This simplifies usage and avoids complex type extensions.
export interface DatePickerProps {
  label?: string;
  onChange: (date: Date | null) => void;
  selected: Date | null;
  className?: string;
  placeholderText?: string;
  dateFormat?: string;
  isClearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
}

/**
 * @wizard
 * @name DatePicker
 * @description A calendar-based input component for selecting single dates, with theme integration.
 * @tags form, input, date, calendar, ui
 * @props
 * - name: label
 * type: string
 * description: An optional label displayed above the date picker input field.
 * - name: selected
 * type: Date | null
 * description: The currently selected date object, or `null` if no date is selected.
 * - name: onChange
 * type: (date: Date | null) => void
 * description: Callback function triggered when a new date is selected.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the date picker's wrapper container.
 * - name: dateFormat
 * type: string
 * description: The format string for displaying the date (e.g., 'MM/dd/yyyy', 'yyyy-MM-dd').
 * - name: showTimeSelect
 * type: boolean
 * description: If true, also allows time selection in addition to date selection.
 * - name: isClearable
 * type: boolean
 * description: If true, displays a clear button to deselect the date.
 * - name: placeholderText
 * type: string
 * description: Text displayed when no date is selected.
 * - name: minDate
 * type: Date
 * description: The earliest selectable date.
 * - name: maxDate
 * type: Date
 * description: The latest selectable date.
 * @category form
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selected,
  onChange,
  className,
  ...props
}) => {
  const { theme } = useTheme();
  // Dynamically create a class name for the portal to apply theme styles
  const portalClassName = `react-datepicker-portal-${theme}`;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text mb-1">
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={selected}
        // The simplified inline handler directly matches the library's expectation.
        onChange={(date: Date | null) => onChange(date)}
        customInput={<Input />}
        popperClassName={portalClassName}
        // Apply theme variables to the calendar itself
        calendarClassName={`bg-card text-text border border-border rounded-md shadow-lg`}
        {...props}
      />
    </div>
  );
};