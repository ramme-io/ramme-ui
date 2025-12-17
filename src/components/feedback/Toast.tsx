"use client";

import React, { useEffect } from 'react';
import { Icon, type IconName } from '../ui/Icon';
import { cn } from '../../utils/cn';

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
 * @id toast
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

  // FIX: Map strictly to Core Theme Variables to ensure consistency with Badge/Button.
  const typeStyles: Record<ToastType, { bg: string; icon: IconName }> = {
    info: { 
      // Maps to Brand Primary (e.g., Blue in Light, Green in Corporate)
      bg: 'bg-primary text-primary-foreground border-primary/20', 
      icon: 'info' 
    },
    success: { 
      // Maps to Brand Accent (Matches Badge 'success' variant)
      bg: 'bg-accent text-accent-foreground border-accent/20', 
      icon: 'check-circle' 
    },
    warning: { 
      // Maps to Brand Secondary (Matches Badge 'secondary' variant)
      bg: 'bg-secondary text-secondary-foreground border-secondary/20', 
      icon: 'alert-triangle' 
    },
    error: { 
      // Maps to Brand Destructive (Matches Badge 'danger' variant)
      bg: 'bg-destructive text-destructive-foreground border-destructive/20', 
      icon: 'x-circle' 
    },
  };

  return (
    <div
      className={cn(
        'flex items-center w-full max-w-sm overflow-hidden rounded-lg shadow-lg pointer-events-auto border',
        typeStyles[type].bg
      )}
      role="alert"
    >
      <div className="p-3 shrink-0">
        <Icon name={typeStyles[type].icon} size={24} />
      </div>
      <div className="flex-grow p-3 min-w-0">
        {title && <p className="font-bold text-sm mb-0.5">{title}</p>}
        <p className="text-sm opacity-90 break-words">{message}</p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="p-3 self-stretch flex items-center justify-center hover:bg-black/10 transition-colors shrink-0"
        aria-label="Dismiss notification"
      >
        <Icon name="x" size={18} />
      </button>
    </div>
  );
};