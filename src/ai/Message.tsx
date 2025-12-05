// src/ai/Message.tsx
import React from 'react';
import { Avatar } from '../ui/Avatar';
import { Loader } from './Loader';
import { Actions, Suggestion } from './Actions';

export interface MessageProps {
  author: string;
  content?: string;
  isUser?: boolean;
  loading?: boolean;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

/**
 * @wizard
 * @name Message
 * @description Displays a single message in a conversation, including an avatar, author, content, and optional suggestions.
 * @tags ui, ai, chat, display
 * @props
 * - name: author
 * type: string
 * description: "The name of the message author (e.g., 'User' or 'AI Assistant')."
 * - name: content
 * type: string
 * description: The text content of the message.
 * - name: isUser
 * type: boolean
 * description: If true, styles the message as from the user.
 * - name: loading
 * type: boolean
 * description: If true, displays the Loader component instead of content.
 * - name: suggestions
 * type: string[]
 * description: An array of strings to display as suggested actions.
 * - name: onSuggestionClick
 * type: (suggestion: string) => void
 * description: Callback for when a suggestion is clicked.
 * @category ai
 */
export const Message: React.FC<MessageProps> = ({
  author,
  content,
  isUser,
  loading,
  suggestions,
  onSuggestionClick = () => {}
}) => (
  <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
    <div className={`flex items-start gap-3 my-2 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && <Avatar name={author} size="md" />}
      <div className={`p-3 rounded-lg max-w-lg ${isUser ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
        <p className="font-semibold">{!isUser && author}</p>
        {loading ? <Loader /> : <p>{content}</p>}
      </div>
      {isUser && <Avatar name={author} size="md" />}
    </div>
    {suggestions && !isUser && (
      <Actions>
        {suggestions.map((text, i) => <Suggestion key={i} onClick={() => onSuggestionClick(text)}>{text}</Suggestion>)}
      </Actions>
    )}
  </div>
);