import React, { useState, useEffect } from 'react';

interface ChartControlsProps {
  onTimeframeChange: (timeframe: string) => void;
  selectedTimeframe: string;
}

export default function ChartControls({ onTimeframeChange, selectedTimeframe }: ChartControlsProps) {
  const timeframes = [
    { label: '1D', value: '1d' },
    { label: '1W', value: '1wk' },
    { label: '1M', value: '1mo' },
    { label: '3M', value: '3mo' },
    { label: '1Y', value: '1y' },
  ];

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md">
      <span className="text-sm text-gray-500">Timeframe:</span>
      <div className="flex space-x-1">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe.value}
            onClick={() => onTimeframeChange(timeframe.value)}
            className={`px-2 py-1 text-sm rounded ${
              selectedTimeframe === timeframe.value
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {timeframe.label}
          </button>
        ))}
      </div>
    </div>
  );
}
