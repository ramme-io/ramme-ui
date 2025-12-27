import React, { useState, useCallback } from 'react';

import { Input } from '../forms/Input';
import { Select, type SelectOption } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';
import { Radio } from '../forms/Radio';
import { Textarea } from '../forms/Textarea';
import { ToggleSwitch } from '../forms/ToggleSwitch';
import { ComboBox } from '../forms/ComboBox';
import { MultiSelect, type MultiSelectOption } from '../forms/MultiSelect';
import { DatePicker } from '../forms/DatePicker';
import { FileUpload } from '../forms/FileUpload';
import { SegmentedControl, type SegmentedControlOption } from '../forms/SegmentedControl';

// --- TYPE DEFINITIONS ---

interface FormFieldBase {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  colSpan?: number;
  helperText?: string;
  required?: boolean;
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
  placeholder?: string;
}
interface FormDatePicker extends FormFieldBase {
  type: 'datepicker';
  value?: Date | null;
  placeholder?: string;
}
// NEW: File Upload
interface FormFileUpload extends FormFieldBase {
  type: 'file';
  multiple?: boolean;
  acceptedFileTypes?: string;
}
// NEW: Segmented Control
interface FormSegmentedControl extends FormFieldBase {
  type: 'segment';
  options: SegmentedControlOption[];
  value?: string | number;
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
  | FormDatePicker
  | FormFileUpload
  | FormSegmentedControl;

// --- COMPONENT PROPS ---

export interface FormTemplateProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * @wizard
 * @name FormTemplate
 * @description A data-driven form builder that renders a grid of input fields from a configuration array. Now supports File Uploads and Segmented Controls.
 * @category form
 * @tags form, template, builder, input, layout
 * @props
 * - name: fields
 * type: FormField[]
 * description: An array of field definition objects.
 * - name: onSubmit
 * type: (formData: Record<string, any>) => void
 * description: Callback function triggered when the form is submitted.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the form container.
 * @id form-template
 */

export const FormTemplate: React.FC<FormTemplateProps> = ({
  fields,
  onSubmit,
  className,
  children,
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
      } else if (field.type === 'file') {
        initialState[field.name] = [];
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
    const commonProps = { 
      id: field.name, 
      label: field.label, 
      className: field.className, 
      disabled: field.disabled,
      helperText: field.helperText,
      required: field.required
    };

    switch (field.type) {
      case 'text': case 'email': case 'password': case 'number':
        return <Input {...commonProps} name={field.name} type={field.type} placeholder={field.placeholder} value={formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.value)} />;
      case 'textarea':
        return <Textarea {...commonProps} name={field.name} placeholder={field.placeholder} value={formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.value)} rows={field.rows} />;
      case 'select':
        // Updated to use the new React-Select wrapper which expects `onChange` to receive an object
        const selectedOption = field.options.find(opt => opt.value === formData[field.name]);
        return <Select {...commonProps} options={field.options} value={selectedOption} onChange={(opt) => handleFieldChange(field.name, opt?.value)} />;
      case 'checkbox':
        return <Checkbox {...commonProps} name={field.name} checked={formData[field.name]} onChange={(e) => handleFieldChange(field.name, e.target.checked)} />;
      case 'toggle':
        return <ToggleSwitch {...commonProps} checked={formData[field.name]} onChange={(checked) => handleFieldChange(field.name, checked)} />;
      case 'radio':
        return <Radio {...commonProps} name={field.radioGroup} value={field.value} checked={formData[field.radioGroup] === field.value} onChange={(e) => handleFieldChange(field.radioGroup, e.target.value)} />;
      case 'combobox':
        return <ComboBox {...commonProps} options={field.options} value={formData[field.name]} onOptionSelect={(value) => handleFieldChange(field.name, value)} placeholder={field.placeholder} />;
      case 'multiselect':
        return <MultiSelect {...commonProps} options={field.options} value={formData[field.name]} onChange={(value) => handleFieldChange(field.name, value)} placeholder={field.placeholder} />;
      case 'datepicker':
        return <DatePicker {...commonProps} selected={formData[field.name]} onChange={(date) => handleFieldChange(field.name, date)} placeholderText={field.placeholder} />;
      // --- NEW TYPES ---
      case 'file':
        return <FileUpload {...commonProps} multiple={field.multiple} acceptedFileTypes={field.acceptedFileTypes} onFileUpload={(files) => handleFieldChange(field.name, files)} />;
      case 'segment':
        return (
          <div className="space-y-1.5">
             <label className="block text-sm font-medium text-foreground">{field.label}</label>
             <SegmentedControl {...commonProps} options={field.options} value={formData[field.name]} onChange={(val) => handleFieldChange(field.name, val)} />
             {field.helperText && <p className="text-xs text-muted-foreground">{field.helperText}</p>}
          </div>
        );
      default: return null;
    }
  };

  return (
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
      
      {children && <div className="mt-8">{children}</div>}
    </form>
  );
};