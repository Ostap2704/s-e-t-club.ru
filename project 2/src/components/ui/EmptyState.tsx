import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = '' 
}) => {
  return (
    <div className={`card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-12 text-center ${className}`}>
      <div className="flex justify-center mb-6">
        <div className="p-6 bg-purple-500/10 rounded-full">
          <Icon className="h-16 w-16 text-purple-400" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{description}</p>
      
      {action && (
        <button 
          onClick={action.onClick}
          className={`btn transition-all duration-300 ${
            action.variant === 'secondary'
              ? 'border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]'
              : 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]'
          }`}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;