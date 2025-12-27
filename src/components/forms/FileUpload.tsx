import React, { useState, useCallback, useRef } from 'react';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  multiple?: boolean;
  acceptedFileTypes?: string;
  label?: string;
  className?: string;
  helperText?: string;
}

/**
 * @wizard
 * @name FileUpload
 * @description A modern drag-and-drop file upload area with visual feedback and file listing.
 * @tags form, input, upload, files, ui
 * @category form
 * @id file-upload
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  multiple = false,
  acceptedFileTypes,
  label,
  className,
  helperText
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    setUploadedFiles(prev => multiple ? [...prev, ...files] : [files[0]]);
    onFileUpload(files);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, [multiple]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  }, [multiple]);

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}
      
      <div
        className={cn(
          "relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors duration-200 ease-in-out cursor-pointer",
          dragActive 
            ? "border-primary bg-primary/5" 
            : "border-border bg-card hover:bg-muted/50",
          "min-h-[150px]"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={acceptedFileTypes}
          onChange={handleChange}
        />
        
        <div className="bg-muted p-3 rounded-full mb-3">
          <Icon name="upload-cloud" className="h-6 w-6 text-muted-foreground" />
        </div>
        
        <p className="text-sm font-medium text-foreground text-center">
          <span className="text-primary font-semibold hover:underline">Click to upload</span> or drag and drop
        </p>
        
        <p className="text-xs text-muted-foreground mt-1">
          {acceptedFileTypes ? acceptedFileTypes.replace(/,/g, ', ') : 'Any file type'} 
          {multiple ? '' : ' (Single file)'}
        </p>
      </div>

      {/* File List Preview */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file, idx) => (
            <div key={`${file.name}-${idx}`} className="flex items-center justify-between p-2 rounded-md border border-border bg-card">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-primary/10 p-2 rounded text-primary">
                  <Icon name="file" className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
              >
                <Icon name="x" className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {helperText && (
        <p className="mt-1.5 text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
};