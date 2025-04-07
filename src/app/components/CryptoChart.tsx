"use client";

import React, { useState, useEffect, memo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CryptoChartProps {
  cryptoSymbol: string | null;
  standalone?: boolean;
}

// Memoize the CryptoChart component to prevent unnecessary re-renders
const CryptoChart = memo(({ cryptoSymbol, standalone = true }: CryptoChartProps) => {
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState('1mo');
  const [chartId] = useState(`chart-${Math.random().toString(36).substring(2, 9)}`); // Unique ID for each chart instance

  useEffect(() => {
    if (!cryptoSymbol) return;

    const fetchChartData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Add cache-busting parameter to prevent stale data
        const response = await fetch(`/api/crypto?symbol=${cryptoSymbol}&timeframe=${timeframe}&_=${Date.now()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }
        
        const data = await response.json();
        setChartData(data);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to load chart data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [cryptoSymbol, timeframe]);

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };

  // Inline styles
  const containerStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    marginTop: standalone ? '0.75rem' : '0.5rem',
    backgroundColor: '#ffffff',
    // Add styles to help with chart stability during scrolling
    position: 'relative' as const,
    zIndex: 1
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  };

  const titleStyle = {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#000000'
  };

  const timeframeContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.25rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '0.375rem'
  };

  const timeframeLabelStyle = {
    fontSize: '0.75rem',
    color: '#000000'
  };

  const timeframeButtonsStyle = {
    display: 'flex',
    gap: '0.25rem'
  };

  const getTimeframeButtonStyle = (tf: string) => ({
    padding: '0.125rem 0.375rem',
    fontSize: '0.75rem',
    borderRadius: '0.25rem',
    backgroundColor: timeframe === tf ? '#3b82f6' : '#ffffff',
    color: timeframe === tf ? '#ffffff' : '#000000',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  });

  const loadingContainerStyle = {
    height: standalone ? '12rem' : '9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const errorContainerStyle = {
    height: standalone ? '12rem' : '9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const errorTextStyle = {
    color: '#ef4444'
  };

  const chartContainerStyle = {
    height: standalone ? '12rem' : '9rem',
    display: 'flex',
    flexDirection: 'column' as const
  };

  const chartHeaderStyle = {
    textAlign: 'center' as const,
    marginBottom: '0.25rem'
  };

  const chartTitleStyle = {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: '0.875rem'
  };

  const priceStyle = {
    color: '#000000',
    fontSize: '0.875rem'
  };

  const chartWrapperStyle = {
    flex: 1,
    // Add a unique ID to help with chart rendering
    id: chartId
  };

  if (!cryptoSymbol) {
    return (
      <div style={{
        ...containerStyle,
        height: standalone ? '15rem' : '12rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <p style={{ color: '#000000' }}>Ask about a specific cryptocurrency to see its price chart</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>{cryptoSymbol.toUpperCase()} Price Chart</h2>
        <div style={timeframeContainerStyle}>
          <span style={timeframeLabelStyle}>Timeframe:</span>
          <div style={timeframeButtonsStyle}>
            {['1d', '1wk', '1mo', '3mo', '1y'].map((tf) => (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
                style={getTimeframeButtonStyle(tf)}
              >
                {tf === '1d' ? '1D' : 
                 tf === '1wk' ? '1W' : 
                 tf === '1mo' ? '1M' : 
                 tf === '3mo' ? '3M' : '1Y'}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {isLoading && (
        <div style={loadingContainerStyle}>
          <p style={{ color: '#000000' }}>Loading chart data...</p>
        </div>
      )}
      
      {error && (
        <div style={errorContainerStyle}>
          <p style={errorTextStyle}>{error}</p>
        </div>
      )}
      
      {!isLoading && !error && chartData && (
        <div style={chartContainerStyle}>
          <div style={chartHeaderStyle}>
            <p style={chartTitleStyle}>{cryptoSymbol.toUpperCase()} Price Data</p>
            {chartData.prices && chartData.prices.length > 0 && (
              <p style={priceStyle}>Latest price: ${parseFloat(chartData.prices[chartData.prices.length-1]).toFixed(2)}</p>
            )}
          </div>
          <div style={chartWrapperStyle}>
            <Line 
              data={{
                labels: chartData.timestamps.map((ts: number) => new Date(ts * 1000).toLocaleDateString()),
                datasets: [
                  {
                    label: `${cryptoSymbol.toUpperCase()} Price`,
                    data: chartData.prices,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      color: 'black',
                      font: {
                        size: 10
                      }
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)'
                    }
                  },
                  x: {
                    ticks: {
                      color: 'black',
                      font: {
                        size: 10
                      },
                      maxRotation: 45,
                      minRotation: 45
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)'
                    }
                  }
                },
                plugins: {
                  legend: {
                    labels: {
                      color: 'black',
                      font: {
                        size: 11
                      }
                    }
                  },
                  tooltip: {
                    titleColor: 'black',
                    bodyColor: 'black',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    titleFont: {
                      size: 12
                    },
                    bodyFont: {
                      size: 12
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default CryptoChart;
