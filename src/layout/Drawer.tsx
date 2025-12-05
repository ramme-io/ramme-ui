'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../ui/Icon';
import { cn } from '../utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string;
  title?: string;
  className?: string;
  overlayDismiss?: boolean;
}
/**
 * @wizard
 * @name Drawer
 * @description A sliding panel that appears from the edge of the screen, used for additional content or forms.
 * @tags layout, modal, slide-in, ui
 * @category layout
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = '320px',
  title,
  className,
  overlayDismiss = true,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [transitionedIn, setTransitionedIn] = useState(false);
  const drawerContentRef = useRef<HTMLDivElement>(null);

  const getTransitionClasses = useCallback(() => {
    switch (position) {
      case 'left':
        return { from: '-translate-x-full', to: 'translate-x-0', positionClass: 'left-0 top-0 h-full' };
      case 'right':
        return { from: 'translate-x-full', to: 'translate-x-0', positionClass: 'right-0 top-0 h-full' };
      case 'top':
        return { from: '-translate-y-full', to: 'translate-y-0', positionClass: 'left-0 top-0 w-full' };
      case 'bottom':
        return { from: 'translate-y-full', to: 'translate-y-0', positionClass: 'left-0 bottom-0 w-full' };
      default:
        return { from: 'translate-x-full', to: 'translate-x-0', positionClass: 'right-0 top-0 h-full' };
    }
  }, [position]);

  const getDrawerStyles = useCallback((): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (position === 'left' || position === 'right') {
      style.width = size;
      style.maxWidth = '100vw';
    } else {
      style.height = size;
      style.maxHeight = '100vh';
    }
    return style;
  }, [position, size]);

  const { from, to, positionClass } = getTransitionClasses();
  const drawerStyles = getDrawerStyles();

  useEffect(() => {
    let animationFrame: number;
    let timer: number;

    if (isOpen) {
      setShouldRender(true);
      animationFrame = requestAnimationFrame(() => {
        timer = window.setTimeout(() => {
          setTransitionedIn(true);
        }, 10);
      });
    } else {
      setTransitionedIn(false);
      timer = window.setTimeout(() => setShouldRender(false), 500);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (overlayDismiss && drawerContentRef.current && !drawerContentRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose, overlayDismiss]);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (shouldRender) {
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [shouldRender, handleEscapeKey]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex transition-opacity duration-500 ease-in-out',
        transitionedIn ? 'opacity-100' : 'opacity-0',
        'bg-black/50' // Use a theme-agnostic overlay
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

        <div className="flex-grow p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};