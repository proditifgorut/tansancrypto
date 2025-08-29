import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { TrendingUp, TrendingDown, DollarSign, Coins } from 'lucide-react';
import { faker } from '@faker-js/faker';

const GoldTracker: React.FC = () => {
  const goldData = useMemo(() => ({
    spot: parseFloat(faker.finance.amount({ min: 1900, max: 2100, dec: 2 })),
    change: parseFloat(faker.finance.amount({ min: -30, max: 40, dec: 2 })),
    changePercent: parseFloat(faker.finance.amount({ min: -2, max: 3, dec: 2 })),
    high24h: parseFloat(faker.finance.amount({ min: 2050, max: 2150, dec: 2 })),
    low24h: parseFloat(faker.finance.amount({ min: 1850, max: 1950, dec: 2 })),
    volume: faker.number.int({ min: 50000, max: 200000 }),
    futures: parseFloat(faker.finance.amount({ min: 1910, max: 2110, dec: 2 })),
    silver: parseFloat(faker.finance.amount({ min: 22, max: 28, dec: 2 }))
  }), []);

  // Generate gold price chart data
  const chartData = useMemo(() => {
    const data = [];
    let price = goldData.spot;
    
    for (let i = 0; i < 24; i++) {
      const change = faker.number.float({ min: -20, max: 20 });
      price += change;
      data.push([
        new Date(Date.now() - (23 - i) * 3600000).getHours() + ':00',
        parseFloat(price.toFixed(2))
      ]);
    }
    
    return data;
  }, [goldData.spot]);

  const chartOption = {
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        const data = params[0];
        return `<div style="padding: 8px;">
          <div><strong>Gold Price</strong></div>
          <div>Time: ${data.axisValue}</div>
          <div>Price: $${data.value[1]}/oz</div>
        </div>`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item[0]),
      axisLabel: {
        color: '#6b7280',
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#6b7280',
        formatter: function(value: number) {
          return '$' + value.toFixed(0);
        }
      }
    },
    series: [{
      data: chartData.map(item => item[1]),
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#f59e0b',
        width: 2
      },
      itemStyle: {
        color: '#f59e0b'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(245, 158, 11, 0.3)'
          }, {
            offset: 1, color: 'rgba(245, 158, 11, 0.05)'
          }]
        }
      }
    }]
  };

  const isPositive = goldData.changePercent >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <DollarSign className="w-5 h-5 text-yellow-500 mr-2" />
          Gold Market
        </h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          Live
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gold Stats */}
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Spot Gold (XAU/USD)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${goldData.spot.toFixed(2)}
                </p>
              </div>
              <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? (
                  <TrendingUp className="w-5 h-5 mr-1" />
                ) : (
                  <TrendingDown className="w-5 h-5 mr-1" />
                )}
                <div className="text-right">
                  <p className="font-semibold">
                    {isPositive ? '+' : ''}${goldData.change.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    {isPositive ? '+' : ''}{goldData.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">24H High</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${goldData.high24h.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">24H Low</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${goldData.low24h.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">Gold Futures</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${goldData.futures.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Coins className="w-3 h-3 mr-1" />
                Silver
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${goldData.silver.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Gold Chart */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            24H Price Movement
          </h3>
          <div className="h-48">
            <ReactECharts 
              option={chartOption} 
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldTracker;
