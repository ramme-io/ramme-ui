import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from '../layout/Card';
import { Icon } from './Icon';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

/**
 * @wizard
 * @name CodeBlock
 * @description A component for displaying formatted and syntax-highlighted code snippets.
 * @tags ui, data-display, code
 * @props
 * - name: code
 * type: string
 * description: The string of code to display.
 * - name: language
 * type: string
 * description: The programming language for syntax highlighting (e.g., 'tsx', 'css', 'javascript').
 * @category ui
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, className }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-card/50 hover:bg-border rounded-md transition-colors"
      >
        {copied ? <Icon name="check" size={16} /> : <Icon name="copy" size={16} />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' || theme === 'midnight' ? vscDarkPlus : coy}
        showLineNumbers={false}
        customStyle={{ 
          margin: 0, 
          padding: '1.5rem', 
          backgroundColor: 'transparent',
          fontSize: '0.875rem' 
        }}
        codeTagProps={{
            style: {
                fontFamily: 'var(--app-font-mono)'
            }
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </Card>
  );
};