import React from 'react';
import Tippy, { type TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useTheme } from '../contexts/ThemeContext'; // Import the useTheme hook

/**
 * A wrapper around the Tippy.js library to provide a standardized,
 * theme-aware tooltip for Ramme Framework.
 */
/**
 * @wizard
 * @name TippyTooltip
 * @description A flexible and theme-aware tooltip component that displays additional information on hover.
 * @tags ui, feedback, tooltip, overlay
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The element that triggers the tooltip when hovered over (or clicked, etc.).
 * - name: content
 * type: React.ReactNode
 * description: The content to be displayed inside the tooltip.
 * - name: placement
 * type: TippyProps['placement']
 * description: The position of the tooltip relative to its trigger element (e.g., 'top', 'bottom', 'left', 'right').
 * default: 'top'
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the tooltip content.
 * @category feedback
 */
export const TippyTooltip: React.FC<TippyProps> = ({ children, content, ...props }) => {
  const { theme } = useTheme(); // Use the theme context

  const triggerElement = React.isValidElement(children) ? children : <span>{children}</span>;

  return (
    <Tippy
      content={content}
      theme={theme} // Use the current theme from context
      animation="fade"
      duration={200}
      delay={[200, 0]}
      placement="top"
      {...props}
    >
      {triggerElement}
    </Tippy>
  );
};