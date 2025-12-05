import React, { useState, useCallback } from 'react';

import { Input } from '../form/Input';
import { Select } from '../form/Select';
import { Checkbox } from '../form/Checkbox';
import { Radio } from '../form/Radio';
import { Textarea } from '../form/Textarea';
import { ToggleSwitch } from '../form/ToggleSwitch';
import { ComboBox } from '../form/ComboBox';
import { MultiSelect, type MultiSelectOption } from '../form/MultiSelect';
import { DatePicker } from '../form/DatePicker';

// --- TYPE DEFINITIONS (Remain the same) ---

interface FormFieldBase {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  colSpan?: number;
}

interface FormInput extends FormFieldBase {
  type: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string | number;
}
interface FormTextarea extends FormFieldBase {
  type: 'textarea';
  placeholder?: string;
  value?: string;
  rows?: number;
}
interface SelectOption {
  value: string | number;
  label: string;
}
interface FormSelect extends FormFieldBase {
  type: 'select';
  options: SelectOption[];
  value?: string | number;
}
interface FormCheckbox extends FormFieldBase {
  type: 'checkbox';
  checked?: boolean;
}
interface FormToggle extends FormFieldBase {
  type: 'toggle';
  checked?: boolean;
}
interface FormRadio extends FormFieldBase {
  type: 'radio';
  value: string | number;
  checked?: boolean;
  radioGroup: string;
}
interface FormComboBox extends FormFieldBase {
  type: 'combobox';
  options: SelectOption[];
  value?: string | number | null;
  placeholder?: string;
}
interface FormMultiSelect extends FormFieldBase {
  type: 'multiselect';
  options: MultiSelectOption[];
  value?: MultiSelectOption[] | null;
}
interface FormDatePicker extends FormFieldBase {
  type: 'datepicker';
  value?: Date | null;
  placeholder?: string;
}

export type FormField =
  | FormInput
  | FormTextarea
  | FormSelect
  | FormCheckbox
  | FormToggle
  | FormRadio
  | FormComboBox
  | FormMultiSelect
  | FormDatePicker;


// --- COMPONENT PROPS ---

export interface FormTemplateProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => void;
  // Title and action buttons are now controlled by the parent component
  className?: string;
  // Pass children to allow for custom button layouts
  children?: React.ReactNode;
}


// --- REFACTORED COMPONENT ---

export const FormTemplate: React.FC<FormTemplateProps> = ({
  fields,
  onSubmit,
  className,
  children, // Accept children for actions
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialState: Record<string, any> = {};
    fields.forEach(field => {
       if (field.type === 'checkbox' || field.type === 'toggle') {
        initialState[field.name] = field.checked || false;
      } else if (field.type === 'radio') {
        if (field.checked) {
          initialState[field.radioGroup] = field.value;
        }
      } else {
        initialState[field.name] = field.value || '';
      }
    });
    return initialState;
  });

  const handleFieldChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field: FormField) => {
    const commonProps = { id: field.name, label: field.label, className: field.className, disabled: field.disabled };
    
    switch (field.type) {
      case 'text': case 'email': case 'password': case 'number':
        return <Input {...commonProps} name={field.name} type={field.type} placeholder={field.placeholder} value={formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.value)} />;
      case 'textarea':
        return <Textarea {...commonProps} name={field.name} placeholder={field.placeholder} value={formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.value)} rows={field.rows} />;
      case 'select':
        return <Select {...commonProps} name={field.name} options={field.options} value={formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.value)} />;
      case 'checkbox':
        return <Checkbox {...commonProps} name={field.name} checked={formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.checked)} />;
      case 'toggle':
        return <ToggleSwitch {...commonProps} checked={formData[field.name]} onChange={(checked) => handleFieldChange(field.name, checked)} />;
      case 'radio':
        return <Radio {...commonProps} name={field.radioGroup} value={field.value} checked={formData[field.radioGroup] === field.value} onChange={(e) => handleFieldChange(field.radioGroup, e.target.value)} />;
      case 'combobox':
        return <ComboBox {...commonProps} options={field.options} value={formData[field.name]} onOptionSelect={(value) => handleFieldChange(field.name, value)} placeholder={field.placeholder} />;
      case 'multiselect':
        return <MultiSelect {...commonProps} options={field.options} value={formData[field.name]} onChange={(value) => handleFieldChange(field.name, value)} />;
      case 'datepicker':
        return <DatePicker {...commonProps} selected={formData[field.name]} onChange={(date) => handleFieldChange(field.name, date)} placeholderText={field.placeholder} />;
      default: return null;
    }
  };

  return (
    // The Card, SectionHeader, and ActionBar are now removed.
    // The component is a pure form with its field grid.
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div 
            key={field.name + (field.type === 'radio' ? field.value : '')}
            style={{ gridColumn: `span ${field.colSpan || 1}` }}
          >
            {renderField(field)}
          </div>
        ))}
      </div>
      
      {/* Render custom action buttons passed as children */}
      {children && <div className="mt-8">{children}</div>}
    </form>
  );
};