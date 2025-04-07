"use client";

import React, { useState, useEffect, useRef } from 'react';

// Import components
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

// Define types
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  cryptoSymbol?: string | null; // Add cryptoSymbol to each message
}

interface ChatInterfaceProps {
  onCryptoDetection?: (crypto: string | null) => void;
}

export default function ChatInterface({ onCryptoDetection }: ChatInterfaceProps = {}) {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCrypto, setCurrentCrypto] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : undefined
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
        // If there's an error, initialize with default welcome message
        setMessages([{
          role: 'assistant',
          content: 'Hello! I\'m your crypto assistant. Ask me anything about cryptocurrencies like Bitcoin, Ethereum, or blockchain technology.',
          timestamp: new Date()
        }]);
      }
    } else {
      // If no saved messages, initialize with default welcome message
      setMessages([{
        role: 'assistant',
        content: 'Hello! I\'m your crypto assistant. Ask me anything about cryptocurrencies like Bitcoin, Ethereum, or blockchain technology.',
        timestamp: new Date()
      }]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to detect cryptocurrency mentions in text
  const detectCryptocurrency = (text: string): string | null => {
    const cryptoKeywords = [
      { name: 'bitcoin', keywords: ['bitcoin', 'btc'] },
      { name: 'ethereum', keywords: ['ethereum', 'eth'] },
      { name: 'cardano', keywords: ['cardano', 'ada'] },
      { name: 'solana', keywords: ['solana', 'sol'] },
      { name: 'dogecoin', keywords: ['dogecoin', 'doge'] },
    ];

    const lowerText = text.toLowerCase();
    
    for (const crypto of cryptoKeywords) {
      if (crypto.keywords.some(keyword => lowerText.includes(keyword))) {
        return crypto.name;
      }
    }
    
    return null;
  };

  // Handle sending messages
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Detect if a cryptocurrency was mentioned
    const detectedCrypto = detectCryptocurrency(content);
    
    // Add user message to chat with detected crypto
    const userMessage: Message = { 
      role: 'user', 
      content,
      timestamp: new Date(),
      cryptoSymbol: detectedCrypto // Store crypto with the message
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Update current crypto for UI display
    if (detectedCrypto) {
      setCurrentCrypto(detectedCrypto);
      // Notify parent component if callback is provided
      if (onCryptoDetection) {
        onCryptoDetection(detectedCrypto);
      }
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Call API to get response - send ALL messages for context
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage]
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      
      // Add assistant message to chat with the same crypto as user message
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.response,
        timestamp: new Date(),
        cryptoSymbol: detectedCrypto // Keep the same crypto as the user message
      };
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add function to clear chat history
  const clearChatHistory = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all chat history?');
    if (confirmClear) {
      localStorage.removeItem('chatMessages');
      setMessages([{
        role: 'assistant',
        content: 'Chat history has been cleared. How can I help you today?',
        timestamp: new Date()
      }]);
      setCurrentCrypto(null);
      if (onCryptoDetection) {
        onCryptoDetection(null);
      }
    }
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: 'calc(100vh - 12rem)',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    position: 'relative' as const
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#ffffff'
  };

  const headerLeftStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const iconContainerStyle = {
    width: '2rem',
    height: '2rem',
    borderRadius: '9999px',
    backgroundColor: '#f3e8ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem'
  };

  const titleStyle = {
    fontWeight: 500,
    fontSize: '0.875rem'
  };

  const statusStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center'
  };

  const onlineIndicatorStyle = {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '9999px',
    backgroundColor: '#10b981',
    marginRight: '0.25rem'
  };

  const cryptoBadgeStyle = {
    backgroundColor: '#f3e8ff',
    color: '#7e22ce',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500
  };

  const messagesContainerStyle = {
    flex: 1,
    overflow: 'auto', // Changed from 'hidden' to 'auto' to fix scrolling issues
    position: 'relative' as const,
    zIndex: 10
  };

  const clearButtonStyle = {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
    fontSize: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '0.5rem'
  };

  return (
    <div style={containerStyle}>
      {/* Chat header */}
      <div style={headerStyle}>
        <div style={headerLeftStyle}>
          <div style={iconContainerStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7e22ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div>
            <h2 style={titleStyle}>Crypto Assistant</h2>
            <p style={statusStyle}>
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem', animation: 'spin 1s linear infinite' }}>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style={{ opacity: 0.75 }}></path>
                  </svg>
                  Thinking...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={onlineIndicatorStyle}></span>
                  Online
                </span>
              )}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {currentCrypto && (
            <div style={cryptoBadgeStyle}>
              {currentCrypto.charAt(0).toUpperCase() + currentCrypto.slice(1)}
            </div>
          )}
          <button 
            onClick={clearChatHistory} 
            style={clearButtonStyle}
            title="Clear chat history"
          >
            Clear History
          </button>
        </div>
      </div>
      
      {/* Messages container - now a single scrollable container */}
      <div style={messagesContainerStyle}>
        <ChatMessages messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
