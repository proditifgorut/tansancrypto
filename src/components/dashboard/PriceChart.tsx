import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { faker } from '@faker-js/faker';

const PriceChart: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState('BTC/USDT');
  const [timeframe, setTimeframe] = useState('1D');

  const assets = ['BTC/USDT', 'ETH/USDT', 'AAPL', 'TSLA', 'XAU/USD', 'EUR/USD'];
  const timeframes = ['5M', '15M', '1H', '4H', '1D', '1W'];

  // Generate mock OHLC data
  const generateOHLCData = useMemo(() => {
    const data = [];
    const basePrice = 45000;
    let currentPrice = basePrice;
    
    for (let i = 0; i < 100; i++) {
      const open = currentPrice;
      const high = open + faker.number.float({ min: 0, max: 2000 });
      const low = open - faker.number.float({ min: 0, max: 1500 });
      const close = faker.number.float({ min: low, max: high });
      
      data.push([
        new Date(Date.now() - (99 - i) * 3600000).toISOString().split('T')[0],
        parseFloat(open.toFixed(2)),
        parseFloat(close.toFixed(2)),
        parseFloat(low.toFixed(2)),
        parseFloat(high.toFixed(2))
      ]);
      
      currentPrice = close;
    }
    
    return data;
  }, [selectedAsset, timeframe]);

  const option = useMemo(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: function(params: any) {
        const data = params[0];
        if (data && data.data) {
          return `
            <div style="padding: 10px;">
              <div><strong>${selectedAsset}</strong></div>
              <div>Open: $${data.data[0]}</div>
              <div>Close: $${data.data[1]}</div>
              <div>Low: $${data.data[2]}</div>
              <div>High: $${data.data[3]}</div>
            </div>
          `;
        }
        return '';
      }
    },
    legend: {
      data: [selectedAsset],
      textStyle: {
        color: '#6b7280'
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: generateOHLCData.map(item => item[0]),
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: {
        color: '#6b7280'
      }
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      },
      axisLabel: {
        color: '#6b7280',
        formatter: function(value: number) {
          return '$' + value.toLocaleString();
        }
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 50,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 50,
        end: 100
      }
    ],
    series: [
      {
        name: selectedAsset,
        type: 'candlestick',
        data: generateOHLCData.map(item => [item[1], item[2], item[3], item[4]]),
        itemStyle: {
          color: '#ef4444',
          color0: '#22c55e',
          borderColor: '#ef4444',
          borderColor0: '#22c55e'
        }
      }
    ]
  }), [selectedAsset, generateOHLCData]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Price Chart
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
          {/* Asset Selector */}
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {assets.map((asset) => (
              <option key={asset} value={asset}>
                {asset}
              </option>
            ))}
          </select>
          
          {/* Timeframe Selector */}
          <div className="flex rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
            {timeframes.map((tf, index) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  timeframe === tf
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                } ${index !== timeframes.length - 1 ? 'border-r border-gray-300 dark:border-gray-600' : ''}`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="h-96">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </div>
  );
};

export default PriceChart;
