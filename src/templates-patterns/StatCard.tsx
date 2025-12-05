import React from 'react';
import { Card } from '../layout/Card';
import { Icon, type IconName } from '../ui/Icon';
import { Badge } from '../ui/Badge';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface StatCardProps {
  title: string;
  value: string;
  icon: IconName;
  changeText?: string;
  changeDirection?: 'positive' | 'negative';
  footerText?: string;
  className?: string;
}

/**
 * @wizard
 * @name StatCard
 * @description A specialized card for prominently displaying a key statistic, including an icon and optional trend indicator.
 * @tags templates, data-display, metrics, dashboard, ui
 * @props
 * - name: title
 * type: string
 * description: The label for the displayed metric.
 * - name: value
 * type: string
 * description: The main value of the statistic.
 * - name: icon
 * type: IconName
 * description: The name of a Lucide icon to represent the metric.
 * - name: changeText
 * type: string
 * description: Text describing the change in the metric (e.g., '10% since last month').
 * - name: changeDirection
 * type: "'positive' | 'negative'"
 * description: The direction of change, which determines the color of the badge.
 * - name: footerText
 * type: string
 * description: Optional text displayed at the bottom of the card for context.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling.
 * @category templates-patterns
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  changeText,
  changeDirection,
  footerText,
  className,
}) => {
  // FIX: Changed 'destructive' to 'danger' to match the Badge component's API.
  const badgeVariant = changeDirection === 'positive' ? 'success' : 'danger';

  return (
    <Card className={cn('p-4 flex flex-col', className)}>
      <div className="flex items-center text-muted-foreground mb-2">
        <Icon name={icon} size={16} className="mr-2" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex-grow">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {changeText && (
          <div className="flex items-center mt-1 text-sm">
            <Badge variant={badgeVariant}>
              <Icon
                name={changeDirection === 'positive' ? 'arrow-up' : 'arrow-down'}
                size={12}
                className="mr-1"
              />
              {changeText}
            </Badge>
          </div>
        )}
      </div>
      {footerText && (
        <div className="mt-4 pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">{footerText}</p>
        </div>
      )}
    </Card>
  );
};