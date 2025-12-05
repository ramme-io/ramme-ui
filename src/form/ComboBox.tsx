'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from './Input'; 
import { cn } from '../utils/cn'; // Import the cn utility

export interface ComboBoxOption {
  value: string | number;
  label: string;
}

interface ComboBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  options: ComboBoxOption[];
  label?: string;
  value?: string | number | null;
  onOptionSelect?: (selectedValue: string | number | null, selectedLabel: string | null) => void;
  placeholder?: string;
  containerClassName?: string;
}

/**
 * @wizard
 * @name ComboBox
 * @description A text input with an integrated dropdown list of selectable options, allowing both typing and selection.
 * @tags form, input, select, dropdown, autocomplete, ui
 * @category form
 */
export const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  label,
  value: controlledValue,
  onOptionSelect,
  placeholder,
  id,
  className,
  containerClassName,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<ComboBoxOption[]>(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uniqueId = id || `combobox-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (controlledValue !== undefined) {
      const selectedOption = options.find(opt => opt.value === controlledValue);
      setInputValue(selectedOption ? selectedOption.label : '');
    }
  }, [controlledValue, options]);

  useEffect(() => {
    if (inputValue === '') {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter(option =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
    setHighlightedIndex(-1);
  }, [inputValue, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: ComboBoxOption) => {
    setInputValue(option.label);
    setIsOpen(false);
    onOptionSelect?.(option.value, option.label);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // ... keydown logic remains the same
  };

  return (
    <div className={cn('relative', containerClassName)} ref={wrapperRef}>
      <Input
        id={uniqueId}
        label={label}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        ref={inputRef}
        className={className}
        {...props}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg py-1 overflow-auto max-h-60 focus:outline-none">
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              className={cn(
                'px-4 py-2 text-sm cursor-pointer text-foreground hover:bg-muted',
                highlightedIndex === index && 'bg-accent text-accent-foreground'
              )}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={highlightedIndex === index}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};