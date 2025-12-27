'use client';

import React, { useId } from 'react';
import ReactSelect, { components, MultiValue, ActionMeta, DropdownIndicatorProps, MultiValueRemoveProps } from 'react-select';
import { cn } from '../../utils/cn';
import { Icon } from '../ui/Icon';

export interface MultiSelectOption {
  value: string | number;
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
  className?: string;
  error?: boolean;
  helperText?: string;
}

// Custom Dropdown Arrow
const DropdownIndicator = (props: DropdownIndicatorProps<MultiSelectOption, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="chevron-down" className="h-4 w-4 text-muted-foreground" />
    </components.DropdownIndicator>
  );
};

// Custom "X" for removing tags
const MultiValueRemove = (props: MultiValueRemoveProps<MultiSelectOption, true>) => {
  return (
    <components.MultiValueRemove {...props}>
      <Icon name="x" className="h-3 w-3" />
    </components.MultiValueRemove>
  );
};

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
  className,
  error,
  helperText,
}) => {
  const uniqueId = useId();

  const handleChange = (
    newValue: MultiValue<MultiSelectOption>,
    _actionMeta: ActionMeta<MultiSelectOption>
  ) => {
    const selectedOptions = newValue ? Array.from(newValue) : null;
    onChange(selectedOptions);
  };

  // --- THEME ENGINE MAPPING ---
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: 'rgb(var(--app-card-bg-color))',
      borderColor: error 
        ? 'rgb(var(--app-danger-color))' 
        : state.isFocused 
          ? 'rgb(var(--app-primary-color))' 
          : 'rgb(var(--app-border-color))',
      color: 'rgb(var(--app-text-color))',
      borderRadius: 'var(--app-border-radius-md)',
      boxShadow: state.isFocused ? '0 0 0 1px rgb(var(--app-primary-color))' : 'none',
      '&:hover': {
        borderColor: state.isFocused 
          ? 'rgb(var(--app-primary-color))' 
          : 'rgb(var(--app-text-color) / 0.5)'
      },
      minHeight: '2.5rem',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: 'rgb(var(--app-card-bg-color))',
      border: '1px solid rgb(var(--app-border-color))',
      borderRadius: 'var(--app-border-radius-md)',
      zIndex: 50,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? 'rgb(var(--app-primary-color))'
        : state.isFocused
          ? 'rgb(var(--app-primary-color) / 0.1)'
          : 'transparent',
      color: state.isSelected
        ? 'rgb(var(--app-primary-foreground-color))'
        : 'rgb(var(--app-text-color))',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: 'rgb(var(--app-primary-color) / 0.2)'
      }
    }),
    // --- MULTI-SELECT SPECIFIC STYLES ---
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: 'rgb(var(--app-secondary-color) / 0.2)',
      borderRadius: 'var(--app-border-radius-sm)',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: 'rgb(var(--app-text-color))',
      fontSize: '0.875rem',
      fontWeight: 500,
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: 'rgb(var(--app-text-color) / 0.7)',
      ':hover': {
        backgroundColor: 'rgb(var(--app-danger-color))',
        color: 'rgb(var(--app-danger-foreground-color))',
      },
    }),
    input: (base: any) => ({
      ...base,
      color: 'rgb(var(--app-text-color))',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: 'rgb(var(--app-text-color) / 0.5)',
    }),
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={uniqueId} className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}
      <ReactSelect<MultiSelectOption, true>
        instanceId={uniqueId}
        styles={customStyles}
        components={{ DropdownIndicator, MultiValueRemove }}
        options={options}
        value={value}
        onChange={handleChange}
        isMulti
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isSearchable={isSearchable}
        placeholder={placeholder}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
        menuPosition="fixed"
      />
      {helperText && (
        <p className={cn("mt-1.5 text-xs", error ? "text-destructive" : "text-muted-foreground")}>
          {helperText}
        </p>
      )}
    </div>
  );
};