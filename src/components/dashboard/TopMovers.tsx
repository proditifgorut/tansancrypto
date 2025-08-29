import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  type: 'crypto' | 'us_stock' | 'idx' | 'gold';
}

const TopMovers: React.FC = () => {
  const { gainers, losers } = useMemo(() => {
    const generateMovers = (isGainer: boolean): Stock[] => {
      const types: Stock['type'][] = ['crypto', 'us_stock', 'idx', 'gold'];
      
      return Array.from({ length: 6 }, () => {
        const type = faker.helpers.arrayElement(types);
        let symbol = '';
        let name = '';
        let price = 0;
        
        switch (type) {
          case 'crypto':
            symbol = faker.helpers.arrayElement(['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT']);
            name = symbol.split('/')[0];
            price = parseFloat(faker.finance.amount({ min: 100, max: 50000, dec: 2 }));
            break;
          case 'us_stock':
            symbol = faker.helpers.arrayElement(['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'NVDA']);
            name = faker.company.name().substring(0, 10);
            price = parseFloat(faker.finance.amount({ min: 50, max: 500, dec: 2 }));
            break;
          case 'idx':
            symbol = faker.helpers.arrayElement(['BBCA', 'BMRI', 'TLKM', 'UNVR', 'ASII', 'BBRI']);
            name = faker.company.name().substring(0, 10);
            price = parseFloat(faker.finance.amount({ min: 2000, max: 12000, dec: 0 }));
            break;
          case 'gold':
            symbol = faker.helpers.arrayElement(['XAU/USD', 'Gold Futures', 'GOLD ETF']);
            name = 'Gold';
            price = parseFloat(faker.finance.amount({ min: 1900, max: 2100, dec: 2 }));
            break;
        }
        
        return {
          symbol,
          name,
          price,
          change: parseFloat(isGainer 
            ? faker.finance.amount({ min: 5, max: 25, dec: 2 })
            : faker.finance.amount({ min: -25, max: -5, dec: 2 })),
          volume: faker.number.int({ min: 1000000, max: 100000000 }),
          type
        };
      });
    };

    return {
      gainers: generateMovers(true),
      losers: generateMovers(false)
    };
  }, []);

  const formatVolume = (volume: number): string => {
    if (volume >= 1000000) {
      return (volume / 1000000).toFixed(1) + 'M';
    }
    return (volume / 1000).toFixed(0) + 'K';
  };

  const formatPrice = (price: number, type: Stock['type']): string => {
    if (type === 'idx') {
      return `IDR ${price.toLocaleString()}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const getTypeColor = (type: Stock['type']): string => {
    switch (type) {
      case 'crypto': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'us_stock': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'idx': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'gold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getTypeLabel = (type: Stock['type']): string => {
    switch (type) {
      case 'crypto': return 'Crypto';
      case 'us_stock': return 'US';
      case 'idx': return 'IDX';
      case 'gold': return 'Gold';
      default: return '';
    }
  };

  const StockItem: React.FC<{ stock: Stock; isGainer: boolean }> = ({ stock, isGainer }) => (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {stock.symbol}
          </p>
          <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(stock.type)}`}>
            {getTypeLabel(stock.type)}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Vol: {formatVolume(stock.volume)}
        </p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {formatPrice(stock.price, stock.type)}
        </p>
        <p className={`text-xs font-medium ${isGainer ? 'text-green-600' : 'text-red-600'}`}>
          {isGainer ? '+' : ''}{stock.change.toFixed(2)}%
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Top Movers (All Markets)
      </h2>
      
      <div className="space-y-6">
        {/* Top Gainers */}
        <div>
          <div className="flex items-center mb-3">
            <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
            <h3 className="text-sm font-medium text-green-600 dark:text-green-400">
              Top Gainers
            </h3>
          </div>
          <div className="space-y-2">
            {gainers.map((stock, index) => (
              <StockItem key={`gainer-${index}`} stock={stock} isGainer={true} />
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div>
          <div className="flex items-center mb-3">
            <TrendingDown className="w-4 h-4 text-red-500 mr-2" />
            <h3 className="text-sm font-medium text-red-600 dark:text-red-400">
              Top Losers
            </h3>
          </div>
          <div className="space-y-2">
            {losers.map((stock, index) => (
              <StockItem key={`loser-${index}`} stock={stock} isGainer={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMovers;
