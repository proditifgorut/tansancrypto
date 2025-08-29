import React from 'react';
import MarketOverview from '../components/dashboard/MarketOverview';
import PriceChart from '../components/dashboard/PriceChart';
import AssetHeatmap from '../components/dashboard/AssetHeatmap';
import NewsEvents from '../components/dashboard/NewsEvents';
import TopMovers from '../components/dashboard/TopMovers';
import AlertsSummary from '../components/dashboard/AlertsSummary';
import GoldTracker from '../components/dashboard/GoldTracker';
import IndonesianStocks from '../components/dashboard/IndonesianStocks';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Investment Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Real-time market insights with Gold & Indonesian stocks
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 text-sm">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Live
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Gold
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              IDX
            </span>
            <span className="text-gray-500">Last updated: Just now</span>
          </div>
        </div>
      </div>

      {/* Market Overview Cards */}
      <MarketOverview />

      {/* Gold Tracker */}
      <GoldTracker />

      {/* Indonesian Stocks */}
      <IndonesianStocks />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <PriceChart />
          <AssetHeatmap />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <AlertsSummary />
          <TopMovers />
          <NewsEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
