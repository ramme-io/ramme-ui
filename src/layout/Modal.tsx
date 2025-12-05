'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../ui/Icon';
import { cn } from '../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * @wizard
 * @name Modal
 * @description A dialog box that appears on top of the current page, requiring user interaction to dismiss.
 * @tags ui, overlay, dialog, popup
 * @category layout
 */
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, footer, className }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        ref={modalRef}
        className={cn(
          'relative w-full max-w-lg mx-auto rounded-lg shadow-xl overflow-hidden',
          'bg-card border border-border text-foreground',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          {title && <h3 id="modal-title" className="text-xl font-semibold">{title}</h3>}
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="p-4 border-t border-border flex justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};