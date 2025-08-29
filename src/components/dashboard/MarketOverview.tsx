import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Coins, Building2, Landmark } from 'lucide-react';
import { faker } from '@faker-js/faker';

const MarketOverview: React.FC = () => {
  const marketData = [
    {
      title: 'Bitcoin',
      symbol: 'BTC',
      price: faker.finance.amount({ min: 40000, max: 70000, dec: 2 }),
      change: faker.finance.amount({ min: -5, max: 8, dec: 2 }),
      changePercent: faker.finance.amount({ min: -12, max: 15, dec: 2 }),
      icon: Coins,
      color: 'text-orange-500'
    },
    {
      title: 'S&P 500',
      symbol: 'SPX',
      price: faker.finance.amount({ min: 4000, max: 5200, dec: 2 }),
      change: faker.finance.amount({ min: -50, max: 80, dec: 2 }),
      changePercent: faker.finance.amount({ min: -2, max: 3, dec: 2 }),
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    {
      title: 'Gold',
      symbol: 'XAU/USD',
      price: faker.finance.amount({ min: 1800, max: 2100, dec: 2 }),
      change: faker.finance.amount({ min: -20, max: 25, dec: 2 }),
      changePercent: faker.finance.amount({ min: -1.5, max: 2, dec: 2 }),
      icon: DollarSign,
      color: 'text-yellow-500'
    },
    {
      title: 'IHSG',
      symbol: 'IDX',
      price: faker.finance.amount({ min: 6800, max: 7500, dec: 2 }),
      change: faker.finance.amount({ min: -50, max: 80, dec: 2 }),
      changePercent: faker.finance.amount({ min: -2, max: 3, dec: 2 }),
      icon: Building2,
      color: 'text-red-500'
    },
    {
      title: 'EUR/USD',
      symbol: 'EURUSD',
      price: faker.finance.amount({ min: 1.05, max: 1.15, dec: 4 }),
      change: faker.finance.amount({ min: -0.01, max: 0.01, dec: 4 }),
      changePercent: faker.finance.amount({ min: -1, max: 1, dec: 2 }),
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Bank Mandiri',
      symbol: 'BMRI',
      price: faker.finance.amount({ min: 8000, max: 12000, dec: 0 }),
      change: faker.finance.amount({ min: -200, max: 300, dec: 0 }),
      changePercent: faker.finance.amount({ min: -3, max: 4, dec: 2 }),
      icon: Landmark,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {marketData.map((item, index) => {
        const Icon = item.icon;
        const isPositive = parseFloat(item.changePercent) >= 0;
        
        return (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon className={`w-8 h-8 ${item.color}`} />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.symbol}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.symbol === 'BMRI' ? `IDR ${parseInt(item.price).toLocaleString()}` : 
                     item.symbol === 'IDX' ? item.price : 
                     `$${item.price}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {isPositive ? '+' : ''}{item.changePercent}%
                  </span>
                </div>
                <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{item.symbol === 'BMRI' ? `IDR ${parseInt(item.change).toLocaleString()}` : `$${item.change}`}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarketOverview;
