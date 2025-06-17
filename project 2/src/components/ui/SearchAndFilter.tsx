import React from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchAndFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
  }[];
  showFilters: boolean;
  onToggleFilters: () => void;
  className?: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Поиск...",
  filters = [],
  showFilters,
  onToggleFilters,
  className = ''
}) => {
  return (
    <div className={`card bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 p-6 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input bg-gray-900/50 border-gray-700 text-gray-100 pl-10"
          />
        </div>
        {filters.length > 0 && (
          <button
            onClick={onToggleFilters}
            className="btn border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center"
          >
            <Filter className="h-5 w-5 mr-2" />
            Фильтры
            {showFilters ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </button>
        )}
      </div>

      {showFilters && filters.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
          {filters.map((filter, index) => (
            <div key={index}>
              <label className="label text-gray-300">{filter.label}</label>
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="input bg-gray-900/50 border-gray-700 text-gray-100"
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;