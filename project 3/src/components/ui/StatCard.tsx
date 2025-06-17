import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'purple' | 'pink' | 'blue' | 'green' | 'yellow' | 'red' | 'cyan' | 'orange';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'purple',
  trend,
  className = '' 
}) => {
  const colorClasses = {
    purple: 'border-purple-500/20 bg-purple-900/20 text-purple-400',
    pink: 'border-pink-500/20 bg-pink-900/20 text-pink-400',
    blue: 'border-blue-500/20 bg-blue-900/20 text-blue-400',
    green: 'border-green-500/20 bg-green-900/20 text-green-400',
    yellow: 'border-yellow-500/20 bg-yellow-900/20 text-yellow-400',
    red: 'border-red-500/20 bg-red-900/20 text-red-400',
    cyan: 'border-cyan-500/20 bg-cyan-900/20 text-cyan-400',
    orange: 'border-orange-500/20 bg-orange-900/20 text-orange-400'
  };

  const iconColorClasses = {
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    cyan: 'text-cyan-400',
    orange: 'text-orange-400'
  };

  return (
    <div className={`card border ${colorClasses[color]} p-6 text-center hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 ${className}`}>
      <div className="flex justify-center mb-4">
        <div className={`p-4 bg-${color}-500/10 rounded-full`}>
          <Icon className={`h-8 w-8 ${iconColorClasses[color]}`} />
        </div>
      </div>
      <h3 className={`text-2xl font-bold mb-2 ${iconColorClasses[color]}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </h3>
      <p className="text-gray-400 text-sm">{title}</p>
      {trend && (
        <div className={`mt-2 text-xs ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
};

export default StatCard;