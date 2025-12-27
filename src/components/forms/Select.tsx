'use client';

import React, { useId } from 'react';
import ReactSelect, { components, DropdownIndicatorProps } from 'react-select';
import { cn } from '../../utils/cn';
import { Icon } from '../ui/Icon';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: SelectOption | null;
  onChange: (option: SelectOption | null) => void;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  className?: string;
  error?: boolean;
  helperText?: string;
}

const DropdownIndicator = (props: DropdownIndicatorProps<SelectOption, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="chevron-down" className="h-4 w-4 text-muted-foreground" />
    </components.DropdownIndicator>
  );
};

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select...",
  isDisabled = false,
  isLoading = false,
  isClearable = true,
  isSearchable = true,
  className,
  error,
  helperText
}) => {
  const uniqueId = useId();

  // --- THEME ENGINE MAPPING ---
  // We use CSS variables to ensure the Select matches the active theme dynamically.
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
      minHeight: '2.5rem', // Match Tailwind h-10
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
    singleValue: (base: any) => ({
      ...base,
      color: 'rgb(var(--app-text-color))',
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
      
      <ReactSelect
        instanceId={uniqueId}
        styles={customStyles}
        components={{ DropdownIndicator }}
        options={options}
        value={value}
        onChange={(newValue) => onChange(newValue as SelectOption)}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
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