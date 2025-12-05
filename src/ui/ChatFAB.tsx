// src/components/ui/ChatFAB.tsx
import React from 'react';
import { Icon } from './Icon'; 
import { TippyTooltip } from '../feedback/TippyTooltip'; 

export interface ChatFABProps {
  onClick: () => void;
  className?: string;
  tooltipContent?: string;
}

/**
 * @wizard
 * @name ChatFAB
 * @description A floating action button (FAB) specifically for opening a chat interface, with a tooltip and icon.
 * @tags ui, button, chat, fab, ai
 * @props
 * - name: onClick
 * type: () => void
 * description: Function to call when the button is clicked.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling.
 * - name: tooltipContent
 * type: string
 * description: The text content for the button's tooltip.
 * default: 'Open AI Assistant'
 * @category ui
 */
export const ChatFAB: React.FC<ChatFABProps> = ({
  onClick,
  className = '',
  tooltipContent = 'Open AI Assistant',
}) => {
  return (
    <TippyTooltip content={tooltipContent} placement="left">
      <button
        onClick={onClick}
        aria-label={tooltipContent}
        className={`
          w-14 h-14
          bg-primary text-primary-foreground 
          rounded-full
          flex items-center justify-center
          shadow-lg
          hover:bg-primary/90
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          transition-all duration-200 ease-in-out
          hover:scale-110
          active:scale-100
          ${className}
        `}
      >
        <Icon name="bot" size={28} />
      </button>
    </TippyTooltip>
  );
};