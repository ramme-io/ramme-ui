'use client';

import React from 'react';
import Select, { type MultiValue, type ActionMeta } from 'react-select';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: MultiSelectOption[] | null;
  onChange: (selected: MultiSelectOption[] | null) => void;
  label?: string;
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
}

/**
 * @wizard
 * @name MultiSelect
 * @description An enhanced dropdown that allows users to select multiple options from a searchable list.
 * @tags form, input, select, dropdown
 * @category form
 * @id multi-select
 */
export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select...",
  isClearable = true,
  isDisabled = false,
  isLoading = false,
  isSearchable = true,
}) => {

  const handleChange = (
    newValue: MultiValue<MultiSelectOption>,
    _actionMeta: ActionMeta<MultiSelectOption>
  ) => {
    const selectedOptions = newValue ? Array.from(newValue) : null;
    onChange(selectedOptions);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label}
        </label>
      )}
      <Select<MultiSelectOption, true>
        options={options}
        value={value}
        onChange={handleChange}
        isMulti
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isSearchable={isSearchable}
        placeholder={placeholder}
        // This is the key change: we use a class prefix instead of inline styles.
        classNamePrefix="ramme-select"
      />
    </div>
  );
};