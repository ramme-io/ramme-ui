'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn'; 

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  
  // ✅ NEW: Footer slot for action buttons
  footer?: React.ReactNode; 
  
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | string;
  title?: string;
  className?: string;
  overlayDismiss?: boolean;
}

const SIZE_PRESETS = {
  sm: '320px',
  md: '480px',
  lg: '640px',
  xl: '80vw',
  full: '100vw',
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  footer,
  position = 'right',
  size = 'md',
  title,
  className,
  overlayDismiss = true,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [transitionedIn, setTransitionedIn] = useState(false);
  const drawerContentRef = useRef<HTMLDivElement>(null);

  const getSizeValue = (s: string) => SIZE_PRESETS[s as keyof typeof SIZE_PRESETS] || s;

  // ... (Transition logic remains the same) ...
  const getTransitionClasses = useCallback(() => {
    switch (position) {
      case 'left': return { from: '-translate-x-full', to: 'translate-x-0', positionClass: 'left-0 top-0 h-full' };
      case 'right': return { from: 'translate-x-full', to: 'translate-x-0', positionClass: 'right-0 top-0 h-full' };
      case 'top': return { from: '-translate-y-full', to: 'translate-y-0', positionClass: 'left-0 top-0 w-full' };
      case 'bottom': return { from: 'translate-y-full', to: 'translate-y-0', positionClass: 'left-0 bottom-0 w-full' };
      default: return { from: 'translate-x-full', to: 'translate-x-0', positionClass: 'right-0 top-0 h-full' };
    }
  }, [position]);

  const getDrawerStyles = useCallback((): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const finalSize = getSizeValue(size);
    if (position === 'left' || position === 'right') {
      style.width = finalSize;
      style.maxWidth = '100vw';
    } else {
      style.height = finalSize;
      style.maxHeight = '100vh';
    }
    return style;
  }, [position, size]);

  const { from, to, positionClass } = getTransitionClasses();
  const drawerStyles = getDrawerStyles();

  // ✅ NEW: Handle Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Freeze background
    } else {
      document.body.style.overflow = ''; // Unfreeze
    }
    return () => { document.body.style.overflow = ''; }; // Cleanup
  }, [isOpen]);

  useEffect(() => {
    let animationFrame: number;
    let timer: number;
    if (isOpen) {
      setShouldRender(true);
      animationFrame = requestAnimationFrame(() => {
        timer = window.setTimeout(() => setTransitionedIn(true), 10);
      });
    } else {
      setTransitionedIn(false);
      timer = window.setTimeout(() => setShouldRender(false), 500);
    }
    return () => { cancelAnimationFrame(animationFrame); clearTimeout(timer); };
  }, [isOpen]);

  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (overlayDismiss && drawerContentRef.current && !drawerContentRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose, overlayDismiss]);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) onClose();
  }, [isOpen, onClose]);

  useEffect(() => {
    if (shouldRender) document.addEventListener('keydown', handleEscapeKey);
    else document.removeEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [shouldRender, handleEscapeKey]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex transition-opacity duration-500 ease-in-out',
        transitionedIn ? 'opacity-100' : 'opacity-0',
        'bg-black/50'
      )}
      onClick={handleOverlayClick}
    >
      <div
        ref={drawerContentRef}
        style={drawerStyles}
        className={cn(
          'fixed bg-card border-border text-foreground shadow-xl flex flex-col',
          'transform transition-transform duration-500 ease-out',
          positionClass,
          transitionedIn ? to : from,
          className
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border flex-shrink-0">
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close drawer"
          >
            <Icon name="x" size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-grow p-4 overflow-y-auto">
          {children}
        </div>

        {/* ✅ NEW: Footer Section */}
        {footer && (
          <div className="p-4 border-t border-border flex-shrink-0 bg-card">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};