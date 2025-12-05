'use client';

import React from 'react';
import { Card } from '../layout/Card';
//import { Avatar } from '../ui/Avatar';

// --- Helper Function ---
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
};

// --- Data Structure ---
export interface ActivityItemData {
  id: string | number;
  author: {
    name: string;
    avatarUrl?: string;
  };
  action: string;
  timestamp: Date;
}

// --- Sub-Component for each item in the feed ---
const ActivityItem: React.FC<{ item: ActivityItemData; isLast: boolean }> = ({ item, isLast }) => {
  return (
    <div className="flex gap-4">
      {/* Vertical timeline line and dot */}
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 h-3 w-3 rounded-full bg-border" />
        {!isLast && <div className="absolute top-3 left-1/2 h-full w-px -translate-x-1/2 bg-border" />}
      </div>

      {/* Content */}
      <div className="flex-grow pb-8">
        <p className="text-sm text-muted-foreground">
          {formatRelativeTime(item.timestamp)} by{' '}
          <span className="font-medium text-foreground">{item.author.name}</span>
        </p>
        <p className="text-sm mt-1 font-semibold text-foreground">{item.action}</p>
      </div>
    </div>
  );
};

// --- Main ActivityFeed Component ---
export interface ActivityFeedProps {
  items: ActivityItemData[];
  title?: string;
  changelogUrl?: string;
}

/**
 * @wizard
 * @name ActivityFeed
 * @description Displays a chronological list of recent activities, typically with a timeline indicator.
 * @tags templates, patterns, feed, timeline, data-display
 * @props
 * - name: items
 * type: ActivityItemData[]
 * description: An array of activity items to display in the feed.
 * - name: title
 * type: string
 * description: An optional title for the activity feed card.
 * default: "Activity Feed"
 * - name: changelogUrl
 * type: string
 * description: An optional URL for a "View changelog" link.
 * @category templates-patterns
 */
export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  title = 'Activity Feed',
  changelogUrl,
}) => {
  return (
    // FIX: Replaced the `padding` prop with the `className` prop.
    <Card className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
      <div>
        {items.map((item, index) => (
          <ActivityItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
      {changelogUrl && (
        <a href={changelogUrl} className="text-sm font-semibold text-primary hover:underline">
          View changelog →
        </a>
      )}
    </Card>
  );
};