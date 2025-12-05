// src/ai/PromptInput.tsx
import React from 'react';
import { Icon } from '../ui/Icon';

export interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

/**
 * @wizard
 * @name PromptInput
 * @description A specialized input field for users to type and submit prompts, including a send button.
 * @tags ui, ai, form, input, chat
 * @props
 * - name: value
 * type: string
 * description: The current value of the input field.
 * - name: onChange
 * type: (e: React.ChangeEvent<HTMLInputElement>) => void
 * description: Callback fired when the input value changes.
 * - name: onSubmit
 * type: (e: React.FormEvent) => void
 * description: Callback fired when the form is submitted.
 * - name: placeholder
 * type: string
 * description: Placeholder text for the input field.
 * default: "Type your message..."
 * @category ai
 */
export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, placeholder = "Type your message..." }) => (
  <form onSubmit={onSubmit} className="flex items-center p-2 border-t border-border">
    <input
      type="text"
      placeholder={placeholder}
      className="flex-1 p-2 bg-transparent focus:outline-none text-text"
      value={value}
      onChange={onChange}
    />
    <button type="submit" className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
      <Icon name="send" />
    </button>
  </form>
);