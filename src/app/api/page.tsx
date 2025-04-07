"use client";

import React from 'react';
import { Header, Footer } from '@/components/Layout';
import ChatInterface from '@/components/ChatInterface';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentCrypto, setCurrentCrypto] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Handle mounting for client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleCryptoDetection = (crypto: string | null) => {
    setCurrentCrypto(crypto);
  };
  
  if (!mounted) {
    return null; // Prevent hydration errors
  }
  
  // Inline styles
  const pageContainerStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    backgroundColor: '#f9fafb'
  };
  
  const mainContentStyle = {
    flex: 1,
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
    width: '100%'
  };
  
  const headingStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
    color: '#7e22ce'
  };
  
  const descriptionStyle = {
    textAlign: 'center' as const,
    color: '#4b5563',
    marginBottom: '1.5rem',
    maxWidth: '36rem',
    margin: '0 auto 1.5rem auto'
  };
  
  return (
    <div style={pageContainerStyle}>
      <Header />
      <main style={mainContentStyle}>
        <h1 style={headingStyle}>
          Web3 Investment Advisor
        </h1>
        <p style={descriptionStyle}>
          Get real-time insights and analysis on cryptocurrencies, blockchain projects, and investment strategies tailored for web3 investors.
        </p>
        <div>
          <ChatInterface onCryptoDetection={handleCryptoDetection} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
