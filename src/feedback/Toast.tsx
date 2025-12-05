// src/feedback/Toast.tsx

"use client";

import React, { useEffect } from 'react';
import { Icon, type IconName } from '../ui/Icon';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  title?: string;
  type?: ToastType;
  duration?: number;
  onDismiss: (id: string) => void;
}

/**
 * @wizard
 * @name Toast
 * @description A single, transient notification message that appears briefly to provide feedback.
 * @tags feedback, notification, message, ui
 * @props
 * - name: id
 * type: string
 * description: A unique identifier for this specific toast instance.
 * - name: title
 * type: string
 * description: An optional title for the toast notification.
 * - name: message
 * type: string
 * description: The main text content of the toast notification.
 * - name: type
 * type: "'success' | 'error' | 'info' | 'warning'"
 * description: Defines the visual style and semantic meaning of the toast.
 * default: 'info'
 * - name: duration
 * type: number
 * description: How long the toast should remain visible in milliseconds. Set to `0` for a sticky toast.
 * default: 5000
 * - name: onDismiss
 * type: (id: string) => void
 * description: Callback function triggered when the toast is dismissed.
 * @category feedback
 */
export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  title,
  type = 'info',
  duration = 5000,
  onDismiss,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  const typeStyles: Record<ToastType, { bg: string; icon: IconName }> = {
    info: { bg: 'bg-primary text-primary-foreground', icon: 'info' },
    success: { bg: 'bg-accent text-accent-foreground', icon: 'check-circle' },
    warning: { bg: 'bg-secondary text-secondary-foreground', icon: 'alert-triangle' },
    error: { bg: 'bg-destructive text-destructive-foreground', icon: 'x-circle' },
  };

  return (
    <div
      className={cn(
        'flex items-center w-full max-w-sm overflow-hidden rounded-lg shadow-lg pointer-events-auto',
        typeStyles[type].bg
      )}
    >
      <div className="p-3">
        <Icon name={typeStyles[type].icon} size={24} />
      </div>
      <div className="flex-grow p-3">
        {title && <p className="font-bold">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="p-3 self-stretch flex items-center hover:bg-black/20 transition-colors"
        aria-label="Dismiss notification"
      >
        <Icon name="x" size={18} />
      </button>
    </div>
  );
};