import React from 'react';
import { Icon, type IconName } from '../../components/ui/Icon';
import { cn } from '../../utils/cn';
import { Card } from '../../components/layout/Card';
import { Badge } from '../../components/ui/Badge';

const statusColorMap = {
  online: 'success',
  offline: 'secondary',
  error: 'danger',
  warning: 'outline',
  active: 'primary',
} as const;

export type DeviceStatus = keyof typeof statusColorMap;

/**
 * @wizard
 * @name DeviceCard
 * @description A specialized card designed to represent a physical device or a digital entity with live state. Features slots for status, live values, and interactive controls.
 * @tags layout, iot, device, card, dashboard
 * @category layout
 * @props
 * - name: title
 * type: string
 * description: The name of the device or entity (e.g., "Living Room Thermostat").
 * - name: description
 * type: string
 * description: A subtitle, often used for location or ID (e.g., "Floor 2 • ID: #442").
 * - name: icon
 * type: IconName
 * description: The icon representing the device type.
 * - name: status
 * type: 'online' | 'offline' | 'error' | 'warning' | 'active'
 * description: The current operational state of the device. Changes the badge color.
 * default: 'offline'
 * - name: value
 * type: string | number
 * description: The primary "live" metric to display (e.g., "72°", "1,240 rpm").
 * - name: trend
 * type: string
 * description: Optional secondary metric to show change (e.g., "+2%").
 * - name: children
 * type: React.ReactNode
 * description: Interactive controls to place at the bottom of the card (e.g., a ToggleSwitch or Button).
 * - name: className
 * type: string
 * description: Optional additional CSS classes.
 * @id device-card
 */
export interface DeviceCardProps {
  title: string;
  description?: string;
  icon?: IconName;
  status?: DeviceStatus;
  value?: string | number;
  trend?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  title,
  description,
  icon,
  status = 'offline',
  value,
  trend,
  children,
  className,
  onClick,
}) => {
  return (
    <Card 
      className={cn("p-5 flex flex-col justify-between h-full transition-all hover:border-primary/50", className)}
      onClick={onClick}
    >
      {/* Header: Icon, Title, Status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          {icon && (
            <div className="p-2 rounded-md bg-muted text-muted-foreground">
              <Icon name={icon} size={20} />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground leading-none mb-1">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        <Badge variant={statusColorMap[status] || 'secondary'}>
          {status}
        </Badge>
      </div>

      {/* Body: Live Value */}
      {(value || trend) && (
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            {value && <span className="text-2xl font-bold text-foreground">{value}</span>}
            {trend && <span className="text-xs font-medium text-muted-foreground">{trend}</span>}
          </div>
        </div>
      )}

      {/* Footer: Controls (Slot) */}
      {children && (
        <div className="mt-auto pt-4 border-t border-border">
          {children}
        </div>
      )}
    </Card>
  );
};