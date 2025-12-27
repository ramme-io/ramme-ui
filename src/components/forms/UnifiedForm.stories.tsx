import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../layout/Card';
import { Button } from '../ui/Button';
import { Input } from './Input';
import { Select, type SelectOption } from './Select';
import { MultiSelect, type MultiSelectOption } from './MultiSelect'; // Added
import { SegmentedControl } from './SegmentedControl'; // Added
import { DatePicker } from './DatePicker';
import { FileUpload } from './FileUpload';
import { ToggleSwitch } from './ToggleSwitch';
import { SectionHeader } from '../layout/SectionHeader';

const UnifiedFormWrapper = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: null as SelectOption | null,
    tags: [] as MultiSelectOption[] | null,
    priority: 'medium',
    date: new Date(),
    isPublic: true,
  });

  return (
    <Card className="max-w-2xl mx-auto p-8 shadow-lg bg-card">
      <SectionHeader title="Create New Project" className="mb-6" />
      
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* Row 1: Title & Priority (Segmented Control) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Input 
            label="Project Title" 
            placeholder="e.g. Q4 Marketing Campaign"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
          
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Priority</label>
            <SegmentedControl 
              value={formData.priority}
              onChange={val => setFormData({...formData, priority: val})}
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
              ]}
              className="w-full grid grid-cols-3" // Stretch to fill width
            />
          </div>
        </div>

        {/* Row 2: Category (Select) & Tags (MultiSelect) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select 
            label="Department"
            options={[
              { value: 'marketing', label: 'Marketing' },
              { value: 'engineering', label: 'Engineering' },
              { value: 'design', label: 'Design' },
            ]}
            value={formData.category}
            onChange={val => setFormData({...formData, category: val})}
            placeholder="Select Dept..."
          />

          <MultiSelect 
            label="Tags"
            options={[
              { value: 'urgent', label: 'Urgent' },
              { value: 'internal', label: 'Internal' },
              { value: 'client', label: 'Client Facing' },
            ]}
            value={formData.tags}
            onChange={val => setFormData({...formData, tags: val})}
            placeholder="Add tags..."
          />
        </div>

        {/* Row 3: Date & Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker 
            label="Deadline"
            selected={formData.date}
            onChange={date => date && setFormData({...formData, date})}
          />
          
          {/* Toggle vertically centered with input */}
          <div className="flex items-end h-full pb-2">
            <ToggleSwitch 
              label="Make Project Public"
              checked={formData.isPublic}
              onChange={checked => setFormData({...formData, isPublic: checked})}
            />
          </div>
        </div>

        {/* File Upload (Full Width) */}
        <FileUpload 
          label="Project Assets"
          multiple
          helperText="Attach specifications or briefs (PDF, PNG)."
          acceptedFileTypes=".pdf,.png,.jpg"
          onFileUpload={(files) => console.log('Uploaded:', files)}
        />

        {/* Action Bar */}
        <div className="pt-6 border-t border-border flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Create Project</Button>
        </div>

      </form>
    </Card>
  );
};

const meta: Meta = {
  title: 'Forms/Patterns/UnifiedForm',
  component: UnifiedFormWrapper,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const Example: Story = {};