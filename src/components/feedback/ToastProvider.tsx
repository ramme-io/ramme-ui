// src/components/feedback/ToastProvider.tsx
"use client";

import React, { useState, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Toast, type ToastType } from './Toast'; // Using named import for Toast

// Define the shape of a Toast object for the state
interface ToastMessage {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

// Define the shape of the context value
interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  dismissToast: (id: string) => void;
}

// Create the context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * @wizard
 * @name useToast
 * @description A React hook to easily add and dismiss toast notifications anywhere within a `ToastProvider`.
 * @tags hook, feedback, notification
 * @returns
 * - name: addToast
 * type: (message: string, type?: ToastType, duration?: number) => void
 * description: A function to trigger a new toast notification.
 * - name: dismissToast
 * type: (id: string) => void
 * description: A function to programmatically dismiss a toast by its ID.
 * @category feedback
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * @wizard
 * @name ToastProvider
 * @description Provides a context for displaying transient notifications (toasts). Wrap your application with this component.
 * @tags feedback, notification, context, provider
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The React nodes that will have access to the `useToast` hook. Typically wraps the entire application.
 * @category feedback
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info', duration: number = 3000) => {
    // Simple unique ID using timestamp and a random string
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = React.useMemo(() => ({ addToast, dismissToast }), [addToast, dismissToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        // This container holds all the toasts and positions them on the screen
        <div className="fixed bottom-4 right-4 z-50 w-80 max-w-full space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onDismiss={dismissToast}
            />
          ))}
        </div>,
        document.body // Portal toasts to the body to escape stacking contexts
      )}
    </ToastContext.Provider>
  );
};