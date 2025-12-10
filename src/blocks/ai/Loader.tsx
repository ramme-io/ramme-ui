// src/ai/Loader.tsx
import React from 'react';

/**
 * @wizard
 * @name Loader
 * @description A visual indicator used within an AI Message to show that a response is being generated.
 * @tags ui, ai, feedback, loading
 * @category ai
 */
export const Loader: React.FC = () => (
  <div className="flex items-center gap-2">
    <span className="h-2 w-2 bg-text-light rounded-full animate-pulse [animation-delay:-0.3s]"></span>
    <span className="h-2 w-2 bg-text-light rounded-full animate-pulse [animation-delay:-0.15s]"></span>
    <span className="h-2 w-2 bg-text-light rounded-full animate-pulse"></span>
  </div>
);