import React, { useMemo } from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  impact: 'High' | 'Medium' | 'Low';
  url: string;
}

const NewsEvents: React.FC = () => {
  const newsItems: NewsItem[] = useMemo(() => 
    Array.from({ length: 6 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 4, max: 8 }),
      source: faker.helpers.arrayElement(['Reuters', 'Bloomberg', 'CNBC', 'Yahoo Finance', 'MarketWatch']),
      time: faker.helpers.arrayElement(['5m ago', '15m ago', '30m ago', '1h ago', '2h ago']),
      impact: faker.helpers.arrayElement(['High', 'Medium', 'Low'] as const),
      url: faker.internet.url()
    })), []
  );

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const handleNewsClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Market News & Events
      </h2>
      
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div 
            key={item.id} 
            className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            onClick={() => handleNewsClick(item.url)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.source}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
                  {item.impact}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors">
          View More News
        </button>
      </div>
    </div>
  );
};

export default NewsEvents;
