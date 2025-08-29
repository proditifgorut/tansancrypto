import React, { useMemo } from 'react';
import { faker } from '@faker-js/faker';

const AssetHeatmap: React.FC = () => {
  const heatmapData = useMemo(() => {
    const sectors = [
      'Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer',
      'Industrial', 'Materials', 'Utilities', 'Real Estate'
    ];
    
    return sectors.map(sector => ({
      sector,
      change: parseFloat(faker.finance.amount({ min: -5, max: 8, dec: 2 })),
      assets: Array.from({ length: faker.number.int({ min: 4, max: 8 }) }, () => ({
        name: faker.company.name().substring(0, 4).toUpperCase(),
        change: parseFloat(faker.finance.amount({ min: -8, max: 12, dec: 2 })),
        price: parseFloat(faker.finance.amount({ min: 10, max: 500, dec: 2 }))
      }))
    }));
  }, []);

  const getColorClass = (change: number) => {
    if (change > 3) return 'bg-green-600 text-white';
    if (change > 1) return 'bg-green-400 text-white';
    if (change > 0) return 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200';
    if (change > -1) return 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200';
    if (change > -3) return 'bg-red-400 text-white';
    return 'bg-red-600 text-white';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Market Heatmap
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {heatmapData.map((sector, sectorIndex) => (
          <div key={sectorIndex} className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {sector.sector}
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {sector.assets.map((asset, assetIndex) => (
                <div
                  key={assetIndex}
                  className={`p-3 rounded-lg ${getColorClass(asset.change)} cursor-pointer hover:opacity-80 transition-opacity`}
                  title={`${asset.name}: ${asset.change > 0 ? '+' : ''}${asset.change}%`}
                >
                  <div className="text-xs font-medium truncate">{asset.name}</div>
                  <div className="text-xs opacity-90">${asset.price.toFixed(2)}</div>
                  <div className="text-xs font-semibold">
                    {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-600 rounded"></div>
          <span>Strong Decline</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-200 rounded"></div>
          <span>Decline</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-200 rounded"></div>
          <span>Gain</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span>Strong Gain</span>
        </div>
      </div>
    </div>
  );
};

export default AssetHeatmap;
