import React from 'react';
import { Input } from './Input';
import type { InputProps } from './Input';

/**
 * @wizard
 * @name SearchInput
 * @description A specialized input for search functionality, using the base Input component with a search icon.
 * @tags form, input, search, ui
 * @category form
 */
export const SearchInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      type="search"
      icon="search"
      {...props}
    />
  );
};