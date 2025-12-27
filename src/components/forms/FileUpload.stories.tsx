import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: 'Upload Evidence',
    helperText: 'Max file size: 10MB',
    onFileUpload: (files) => console.log('Files dropped:', files),
  },
};

export const MultipleImages: Story = {
  args: {
    label: 'Gallery Photos',
    multiple: true,
    acceptedFileTypes: 'image/*',
    helperText: 'Supported formats: JPG, PNG',
    onFileUpload: (files) => console.log('Files dropped:', files),
  },
};