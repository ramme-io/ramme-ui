import React from 'react';
import { cn } from '../../utils/cn';

export type StatusType = 'online' | 'offline' | 'error' | 'warning' | 'active';

const statusConfig: Record<StatusType, { color: string; label: string }> = {
  online: { color: 'bg-green-500', label: 'Online' },
  offline: { color: 'bg-gray-400', label: 'Offline' },
  error: { color: 'bg-red-500', label: 'Error' },
  warning: { color: 'bg-yellow-500', label: 'Warning' },
  active: { color: 'bg-blue-500', label: 'Active' },
};

export interface StatusBadgeProps {
  status: StatusType;
  /**
   * Optional custom label. If not provided, uses the default status name.
   * Pass explicit `null` to show only the dot.
   */
  label?: string | null;
  className?: string;
  showDot?: boolean;
}

/**
 * @wizard
 * @name StatusBadge
 * @description A consistent status indicator featuring a color-coded dot and an optional text label. Essential for IoT devices and system states.
 * @tags status, badge, iot, indicator, dot
 * @category data-display
 * @props
 * - name: status
 * type: 'online' | 'offline' | 'error' | 'warning' | 'active'
 * description: The state to represent. Determines the color of the dot.
 * - name: label
 * type: string
 * description: Custom text to display next to the dot. If omitted, displays the status name (e.g., "Online").
 * - name: showDot
 * type: boolean
 * description: Whether to show the colored indicator dot.
 * default: true
 * - name: className
 * type: string
 * description: Additional CSS classes.
 * @id status-badge
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className,
  showDot = true,
}) => {
  const config = statusConfig[status];
  const text = label === null ? null : (label || config.label);

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {showDot && (
        <span 
          className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-slate-900", config.color)} 
          aria-hidden="true" 
        />
      )}
      {text && (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {text}
        </span>
      )}
    </div>
  );
};