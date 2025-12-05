// src/components/forms/FileUpload.tsx
import React, { useState, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Card }from '../layout/Card';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  multiple?: boolean;
  acceptedFileTypes?: string;
  label?: string;
  className?: string;
}

/**
 * @wizard
 * @name FileUpload
 * @description A component allowing users to upload files via drag-and-drop or a file browser, with support for multiple files and accepted types.
 * @tags form, input, upload, files, ui
 * @props
 * - name: onFileUpload
 * type: (files: File[]) => void
 * description: Callback function triggered when files are selected or dropped, providing an array of File objects.
 * - name: multiple
 * type: boolean
 * description: If true, allows the user to select and upload multiple files.
 * default: false
 * - name: acceptedFileTypes
 * type: string
 * description: A string specifying acceptable file types (e.g., ".pdf,.txt,.xml", "image/*").
 * - name: label
 * type: string
 * description: An optional label displayed above the file upload area.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the file upload container.
 * @category form
 */

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  multiple = false,
  acceptedFileTypes,
  label,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  }, [onFileUpload]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(Array.from(e.target.files));
    }
  }, [onFileUpload]);

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <Card className={`p-6 border-dashed border-2 ${dragActive ? 'border-primary' : 'border-border'} ${className || ''}`}>
      {label && <label className="block text-sm font-medium text-text mb-2">{label}</label>}
      <div
        className={`flex flex-col items-center justify-center p-6 text-center cursor-pointer rounded-md ${dragActive ? 'bg-primary/10' : 'bg-background/50'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload-input"
          ref={inputRef}
          multiple={multiple}
          accept={acceptedFileTypes}
          onChange={handleChange}
          className="hidden"
        />
        <p className="text-text mb-2">Drag & Drop files here or</p>
        <Button onClick={onButtonClick} variant="secondary">
          Browse Files
        </Button>
        {acceptedFileTypes && <p className="text-sm text-text-light mt-2">Accepted: {acceptedFileTypes}</p>}
      </div>
    </Card>
  );
};