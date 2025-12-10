import React from 'react';
import { Card } from '../layout/Card';
import { Icon } from '../ui/Icon';

interface EmptyStateProps {
  /** The name of the Lucide icon to display. */
  icon?: React.ComponentProps<typeof Icon>['name'];
  /** The main title for the empty state. */
  title: string;
  /** A longer description of the empty state. */
  description?: string;
  /** An optional action button. */
  actionButton?: React.ReactNode;
  /** Additional styling for the outer container. */
  className?: string;
}

/**
 * A component for displaying an empty state message. It's used when there is no
 * data to show, such as in an empty table or after a search with no results.
 */
/**
 * @wizard
 * @name EmptyState
 * @description A component for displaying a message when there is no data or content to show.
 * @tags ui, feedback, empty, placeholder
 * @props
 * - name: icon
 * type: React.ComponentProps<typeof Icon>['name']
 * description: The name of a Lucide icon to visually represent the empty state.
 * - name: title
 * type: string
 * description: The main heading or title for the empty state message.
 * - name: description
 * type: string
 * description: A longer, descriptive text explaining the empty state or next steps.
 * - name: actionButton
 * type: React.ReactNode
 * description: An optional React node, typically a Button, to provide a primary action.
 * - name: className
 * type: string
 * description: Additional CSS classes for custom styling of the container.
 * @category feedback
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, actionButton, className }) => {
  return (
    <Card className={`p-8 text-center flex flex-col items-center justify-center space-y-4 ${className || ''}`}>
      {icon && (
        <div className="text-text-light/50 mb-4">
          <Icon name={icon} size={64} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-2xl font-semibold text-text">
        {title}
      </h3>
      {description && (
        <p className="text-text-light max-w-md">
          {description}
        </p>
      )}
      {actionButton && (
        <div className="mt-4">
          {actionButton}
        </div>
      )}
    </Card>
  );
};