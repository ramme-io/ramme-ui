// src/ai/Actions.tsx
import React from 'react';

/**
 * @wizard
 * @name Suggestion
 * @description A small, pill-shaped button that offers a quick, suggested reply or follow-up question to the user.
 * @tags ui, ai, button, suggestion, actions
 * @props
 * - name: onClick
 * type: () => void
 * description: Function to call when the suggestion is clicked.
 * @category ai
 */
export const Suggestion: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
    <button onClick={onClick} className="px-3 py-1.5 bg-card-alt hover:bg-bg-hover border border-border rounded-full text-sm text-text-light transition-colors">
        {children}
    </button>
);

/**
 * @wizard
 * @name Actions
 * @description A container for displaying a list of suggested, clickable actions that the user can take next.
 * @tags ui, ai, layout, actions, suggestion
 * @category ai
 */
export const Actions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-wrap gap-2 mt-3">{children}</div>
);