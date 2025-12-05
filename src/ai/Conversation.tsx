// src/ai/Conversation.tsx
import React, { useEffect, useRef } from 'react';

/**
 * @wizard
 * @name Conversation
 * @description A container component that holds a series of Message components and manages the layout and scrolling of the chat history.
 * @tags ui, ai, layout, chat
 * @category ai
 */
export const Conversation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the bottom when new messages are added
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [children]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {children}
      <div ref={conversationEndRef} />
    </div>
  );
};