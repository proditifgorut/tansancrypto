import React, { useMemo } from 'react';
import { Building2, TrendingUp, TrendingDown, Factory, Zap, Landmark } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface IDXStock {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  icon: any;
}

const IndonesianStocks: React.FC = () => {
  const idxStocks = useMemo((): IDXStock[] => [
    {
      symbol: 'BBCA',
      name: 'Bank Central Asia',
      sector: 'Banking',
      price: parseFloat(faker.finance.amount({ min: 8000, max: 12000, dec: 0 })),
      change: parseFloat(faker.finance.amount({ min: -300, max: 400, dec: 0 })),
      changePercent: parseFloat(faker.finance.amount({ min: -4, max: 5, dec: 2 })),
      volume: faker.number.int({ min: 10000000, max: 100000000 }),
      marketCap: faker.number.int({ min: 800000000000, max: 1200000000000 }),
      icon: Landmark
    },
    {
      symbol: 'BMRI',
      name: 'Bank Mandiri',
      sector: 'Banking',
      price: parseFloat(faker.finance.amount({ min: 7000, max: 11000, dec: 0 })),
      change: parseFloat(faker.finance.amount({ min: -250, max: 350, dec: 0 })),
      changePercent: parseFloat(faker.finance.amount({ min: -3, max: 4, dec: 2 })),
      volume: faker.number.int({ min: 15000000, max: 120000000 }),
      marketCap: faker.number.int({ min: 600000000000, max: 900000000000 }),
      icon: Landmark
    },
    {
      symbol: 'TLKM',
      name: 'Telkom Indonesia',
      sector: 'Telecommunication',
      price: parseFloat(faker.finance.amount({ min: 3000, max: 5000, dec: 0 })),
      change: parseFloat(faker.finance.amount({ min: -150, max: 200, dec: 0 })),
      changePercent: parseFloat(faker.finance.amount({ min: -3, max: 4, dec: 2 })),
      volume: faker.number.int({ min: 20000000, max: 150000000 }),
      marketCap: faker.number.int({ min: 400000000000, max: 600000000000 }),
      icon: Zap
    },
    {
      symbol: 'UNVR',
      name: 'Unilever Indonesia',
      sector: 'Consumer Goods',
      price: parseFloat(faker.finance.amount({ min: 2200, max: 3500, dec: 0 })),
      change: parseFloat(faker.finance.amount({ min: -100, max: 150, dec: 0 })),
      changePercent: parseFloat(faker.finance.amount({ min: -2, max: 3, dec: 2 })),
      volume: faker.number.int({ min: 5000000, max: 50000000 }),
      marketCap: faker.number.int({ min: 300000000000, max: 500000000000 }),
      icon: Factory
    },
    {
      symbol: 'ASII',
      name: 'Astra International',
      sector: 'Automotive',
      price: parseFloat(faker.finance.amount({ min: 4000, max: 7000, dec: 0 })),
      change: parseFloat(faker.finance.amount({ min: -200, max: 250, dec: 0 })),
      changePercent: parseFloat(faker.finance.amount({ min: -3, max: 4, dec: 2 })),
      volume: faker.number.int({ min: 8000000, max: 80000000 }),
      marketCap: faker.number.int({ min: 500000000000, max: 800000000000 }),
      icon: Factory
    },
    {
      symbol: 'BBRI',
      name: 'Bank BRI',
      sector: 'Banking',
      price: parseFloat(faker.finance.amount({ min: 4000, max: 6500, dec: 0 })),
      change: parseFloat(faker.finance.amount({ min: -150, max: 200, dec: 0 })),
      changePercent: parseFloat(faker.finance.amount({ min: -2.5, max: 3.5, dec: 2 })),
      volume: faker.number.int({ min: 25000000, max: 200000000 }),
      marketCap: faker.number.int({ min: 700000000000, max: 1000000000000 }),
      icon: Landmark
    }
  ], []);

  const formatVolume = (volume: number): string => {
    if (volume >= 1000000000) {
      return (volume / 1000000000).toFixed(1) + 'B';
    }
    if (volume >= 1000000) {
      return (volume / 1000000).toFixed(1) + 'M';
    }
    return (volume / 1000).toFixed(0) + 'K';
  };

  const formatMarketCap = (marketCap: number): string => {
    if (marketCap >= 1000000000000) {
      return 'IDR ' + (marketCap / 1000000000000).toFixed(1) + 'T';
    }
    return 'IDR ' + (marketCap / 1000000000).toFixed(0) + 'B';
  };

  const getSectorColor = (sector: string): string => {
    switch (sector) {
      case 'Banking': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Telecommunication': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Consumer Goods': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'Automotive': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Building2 className="w-5 h-5 text-red-500 mr-2" />
          Indonesia Stock Exchange (IDX)
        </h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          IDX Live
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {idxStocks.map((stock, index) => {
          const Icon = stock.icon;
          const isPositive = stock.changePercent >= 0;
          
          return (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {stock.symbol}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {stock.name}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSectorColor(stock.sector)}`}>
                  {stock.sector}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    IDR {stock.price.toLocaleString()}
                  </span>
                  <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    <span className="text-sm font-medium">
                      {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Change:</span>
                    <p className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}IDR {stock.change.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Volume:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatVolume(stock.volume)}
                    </p>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Market Cap: </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatMarketCap(stock.marketCap)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndonesianStocks;
