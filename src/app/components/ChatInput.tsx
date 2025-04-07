"use client";

import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Auto-focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      
      // Reset height after sending
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  // Handle Ctrl+Enter or Cmd+Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // Quick suggestions
  const suggestions = [
    "Tell me about Bitcoin",
    "How does Ethereum work?",
    "What is blockchain?",
    "Compare BTC and ETH"
  ];

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  // Inline styles
  const containerStyle = {
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    padding: '0.75rem'
  };

  const suggestionsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
    marginBottom: '0.75rem'
  };

  const suggestionLabelStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.25rem'
  };

  const suggestionButtonStyle = {
    fontSize: '0.75rem',
    backgroundColor: '#f3e8ff',
    color: '#7e22ce',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    transition: 'background-color 0.2s',
    border: 'none',
    cursor: 'pointer'
  };

  const formStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '0.5rem'
  };

  const inputContainerStyle = {
    position: 'relative' as const,
    flex: 1,
    borderRadius: '0.5rem',
    border: `1px solid ${isFocused ? '#7e22ce' : '#e5e7eb'}`,
    transition: 'all 0.2s',
    backgroundColor: '#ffffff',
    boxShadow: isFocused ? '0 0 0 2px rgba(126, 34, 206, 0.1)' : 'none'
  };

  const textareaStyle = {
    width: '100%',
    resize: 'none' as const,
    borderRadius: '0.5rem',
    border: '0',
    backgroundColor: 'transparent',
    padding: '0.5rem 0.75rem',
    outline: 'none',
    minHeight: '40px',
    maxHeight: '120px',
    fontSize: '0.875rem'
  };

  const charCountStyle = {
    position: 'absolute' as const,
    right: '0.5rem',
    bottom: '0.25rem',
    fontSize: '0.75rem',
    color: '#9ca3af',
    pointerEvents: 'none' as const
  };

  const buttonStyle = {
    borderRadius: '0.5rem',
    backgroundColor: '#7e22ce',
    color: 'white',
    padding: '0.5rem',
    height: '2.5rem',
    width: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    border: 'none',
    transition: 'all 0.2s',
    cursor: isLoading || !message.trim() ? 'not-allowed' : 'pointer',
    opacity: isLoading || !message.trim() ? 0.5 : 1
  };

  const hintStyle = {
    marginTop: '0.5rem',
    fontSize: '0.75rem',
    textAlign: 'center' as const,
    color: '#6b7280'
  };

  return (
    <div style={containerStyle}>
      {/* Quick suggestions */}
      {message.length === 0 && !isLoading && (
        <div style={suggestionsContainerStyle}>
          <div style={suggestionLabelStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.25rem' }}>
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/>
              <path d="M19 17v4"/>
              <path d="M3 5h4"/>
              <path d="M17 19h4"/>
            </svg>
            Try asking:
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={suggestionButtonStyle}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about cryptocurrencies..."
            style={textareaStyle}
            disabled={isLoading}
            rows={1}
          />
          <div style={charCountStyle}>
            {message.length > 0 && `${message.length} chars`}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          style={buttonStyle}
          aria-label="Send message"
        >
          {isLoading ? (
            <svg style={{ animation: 'spin 1s linear infinite', width: '1.25rem', height: '1.25rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          )}
        </button>
      </form>
      
      <div style={hintStyle}>
        Press Ctrl+Enter to send
      </div>
    </div>
  );
}
