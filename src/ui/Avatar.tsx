import React from 'react';

interface AvatarProps {
  /** The URL of the image to display. */
  src?: string;
  /** The name of the user, used for generating initials as a fallback. */
  name: string;
  /** The size of the avatar. */
  size?: 'sm' | 'md' | 'lg';
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * A component for displaying a user's avatar. It shows an image if a `src`
 * is provided, otherwise it falls back to the user's initials.
 */
/**
 * @wizard
 * @name Avatar
 * @description Displays a user's profile picture or initials as a fallback, with different size options.
 * @tags ui, profile, user
 * @props
 * - name: name
 * type: string
 * description: The name of the user, used for generating initials if no `src` is provided.
 * - name: src
 * type: string
 * description: The URL of the image to display as the avatar. If not provided, initials are shown.
 * - name: size
 * type: 'sm' | 'md' | 'lg'
 * description: Controls the dimensions and font size of the avatar.
 * default: 'md'
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling.
 * @category ui
 */
export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-xl',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-secondary text-white ${sizeClasses[size]} ${className || ''}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        <span className="font-semibold">{getInitials(name)}</span>
      )}
    </div>
  );
};