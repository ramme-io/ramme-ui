import React from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../../components/ui/Icon';

export interface LoaderProps {
  /** The visual style of the loader. */
  variant?: 'bubble' | 'sparkle' | 'bar';
  /** Optional text to display next to the animation (e.g., "Thinking...") */
  label?: string;
  className?: string;
}

/**
 * @wizard
 * @name Loader
 * @description A compact, theme-aware animation for indicating AI processing states. Optimized for chat interfaces.
 * @tags ui, ai, feedback, loading, chat
 * @props
 * - name: variant
 * type: "'bubble' | 'sparkle' | 'bar'"
 * description: The visual style. 'bubble' is standard for chat. 'sparkle' is for creative generation.
 * default: 'bubble'
 * - name: label
 * type: string
 * description: Optional text displayed next to the animation.
 * - name: className
 * type: string
 * description: Custom classes for the container.
 * @category ai
 * @id loader
 */
export const Loader: React.FC<LoaderProps> = ({ 
  variant = 'bubble', 
  label, 
  className 
}) => {
  
  // --- VARIANT 1: The "Typing Bubble" (Standard Chat) ---
  if (variant === 'bubble') {
    return (
      <div className={cn("flex items-center gap-3 h-8 animate-in fade-in zoom-in-95 duration-200", className)}>
        <div className="flex items-center gap-1 px-3 py-2 bg-muted rounded-full rounded-tl-none">
          <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
        </div>
        {label && (
          <span className="text-xs font-medium text-muted-foreground animate-pulse">
            {label}
          </span>
        )}
      </div>
    );
  }

  // --- VARIANT 2: The "Magic Sparkle" (Creative/Generative) ---
  if (variant === 'sparkle') {
    return (
      <div className={cn("flex items-center gap-2 h-8 animate-in fade-in duration-300", className)}>
        <div className="relative flex items-center justify-center w-6 h-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75 duration-1000" />
          <Icon name="sparkles" className="w-4 h-4 text-primary relative z-10 animate-pulse" />
        </div>
        <span className={cn(
          "text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-pulse", 
          !label && "hidden"
        )}>
          {label || "Generating..."}
        </span>
      </div>
    );
  }

  // --- VARIANT 3: The "Pulse Bar" (Inline/Subtle) ---
  return (
    <div className={cn("flex items-center gap-2 h-6 animate-in fade-in duration-200", className)}>
      <div className="flex items-center gap-0.5 h-full">
        <div className="w-1 h-3 bg-primary/50 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
        <div className="w-1 h-4 bg-primary rounded-full animate-[pulse_1s_ease-in-out_0.2s_infinite]" />
        <div className="w-1 h-3 bg-primary/50 rounded-full animate-[pulse_1s_ease-in-out_0.4s_infinite]" />
      </div>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
};