"use client";

import React, { memo } from 'react';

// Import CryptoChart component for use in messages
import CryptoChart from './CryptoChart';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
    cryptoSymbol?: string | null; // Use message-specific crypto symbol
  };
}

// Memoize the ChatMessage component to prevent unnecessary re-renders
export const ChatMessage = memo(({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  // Format timestamp to readable format
  const formatTimestamp = (date?: Date) => {
    if (!date) return '';
    
    // Simple relative time formatting
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  // Inline styles
  const messageContainerStyle = {
    display: 'flex',
    width: '100%',
    marginBottom: '1rem',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    animation: 'fadeIn 0.3s ease-out forwards'
  };

  const messageBubbleStyle = {
    maxWidth: '85%',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    backgroundColor: isUser ? '#7e22ce' : '#f3f4f6',
    color: isUser ? 'white' : 'black'
  };

  const chartContainerStyle = {
    marginTop: '1rem',
    paddingTop: '0.75rem',
    borderTop: '1px solid rgba(229, 231, 235, 0.5)',
    position: 'relative' // Added to help with chart positioning
  };

  const timestampStyle = {
    marginTop: '0.5rem',
    fontSize: '0.75rem',
    opacity: 0.7,
    textAlign: 'right' as const
  };
  
  return (
    <div style={messageContainerStyle}>
      <div style={messageBubbleStyle}>
        <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
        
        {/* Use message's own cryptoSymbol instead of global state */}
        {!isUser && message.cryptoSymbol && (
          <div style={chartContainerStyle}>
            <CryptoChartInMessage cryptoSymbol={message.cryptoSymbol} />
          </div>
        )}
        
        {message.timestamp && (
          <div style={timestampStyle}>
            {formatTimestamp(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
});

// Memoize the CryptoChartInMessage component to prevent unnecessary re-renders
const CryptoChartInMessage = memo(({ cryptoSymbol }: { cryptoSymbol: string }) => {
  const chartContainerStyle = {
    borderRadius: '0.5rem',
    overflow: 'hidden' as const,
    backgroundColor: 'rgba(249, 250, 251, 0.8)',
    padding: '0.5rem',
    // Add styles to help with chart stability during scrolling
    position: 'relative' as const,
    zIndex: 1
  };

  const chartTitleStyle = {
    fontSize: '0.75rem',
    fontWeight: 500 as const,
    marginBottom: '0.5rem',
    color: '#7e22ce'
  };

  return (
    <div style={chartContainerStyle}>
      <div style={chartTitleStyle}>
        {cryptoSymbol.toUpperCase()} Price Chart
      </div>
      <CryptoChart cryptoSymbol={cryptoSymbol} standalone={false} />
    </div>
  );
});

// Memoize the ChatMessages component to prevent unnecessary re-renders
const ChatMessages = memo(({ 
  messages
}: { 
  messages: ChatMessageProps['message'][];
}) => {
  const messagesContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    height: '100%',
    padding: '1rem',
    gap: '0.5rem',
    // Remove overflowY as parent container now handles scrolling
  };

  return (
    <div style={messagesContainerStyle}>
      {messages.map((message, index) => (
        <ChatMessage 
          key={index} 
          message={message} 
        />
      ))}
    </div>
  );
});

export default ChatMessages;
