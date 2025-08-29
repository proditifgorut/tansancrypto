import React from 'react';
import { Bell, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Building2 } from 'lucide-react';
import { faker } from '@faker-js/faker';

const AlertsSummary: React.FC = () => {
  const alerts = [
    {
      id: 1,
      type: 'price',
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
      title: 'BTC Price Alert',
      message: 'Bitcoin crossed $45,000',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'gold',
      icon: DollarSign,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      title: 'Gold Price Alert',
      message: 'Gold (XAU/USD) reached $2,050/oz',
      time: '5 minutes ago'
    },
    {
      id: 3,
      type: 'idx',
      icon: Building2,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      title: 'IDX Stock Alert',
      message: 'BBCA volume spike +400% above average',
      time: '8 minutes ago'
    },
    {
      id: 4,
      type: 'volume',
      icon: AlertTriangle,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      title: 'Volume Spike',
      message: 'AAPL volume +250% above average',
      time: '12 minutes ago'
    },
    {
      id: 5,
      type: 'gold_technical',
      icon: TrendingDown,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      title: 'Gold Technical Alert',
      message: 'Gold RSI indicates oversold condition',
      time: '18 minutes ago'
    },
    {
      id: 6,
      type: 'idx_breakout',
      icon: TrendingUp,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      title: 'IDX Breakout',
      message: 'TLKM broke resistance at IDR 4,200',
      time: '25 minutes ago'
    },
    {
      id: 7,
      type: 'news',
      icon: Bell,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      title: 'Market News',
      message: 'BI Rate decision announcement today',
      time: '30 minutes ago'
    },
    {
      id: 8,
      type: 'gold_futures',
      icon: DollarSign,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      title: 'Gold Futures Alert',
      message: 'Gold futures premium widening',
      time: '35 minutes ago'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Smart Alerts
        </h2>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {alerts.length} Active
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            2 Gold
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            2 IDX
          </span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`p-3 rounded-lg ${alert.bg} cursor-pointer hover:opacity-80 transition-opacity`}>
              <div className="flex items-start">
                <Icon className={`w-5 h-5 ${alert.color} mt-0.5 mr-3 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.title}
                    </p>
                    {(alert.type.includes('gold') || alert.type.includes('idx')) && (
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${
                        alert.type.includes('gold') 
                          ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                          : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                      }`}>
                        {alert.type.includes('gold') ? 'GOLD' : 'IDX'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {alert.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
            View All Alerts
          </button>
          <button className="text-sm text-gray-500 hover:text-gray-600 font-medium">
            Configure Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsSummary;
