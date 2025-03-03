import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useNewsStore } from '../store/useNewsStore';

const SearchBar: React.FC = () => {
  const { searchFilters, setSearchFilters, filterArticles, articles } = useNewsStore();
  const [searchQuery, setSearchQuery] = useState(searchFilters.query);
  const [showFilters, setShowFilters] = useState(false);
  const [fromDate, setFromDate] = useState(searchFilters.fromDate || '');
  const [toDate, setToDate] = useState(searchFilters.toDate || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilters({ query: searchQuery });
  };

  const handleDateFilter = () => {
    setSearchFilters({
      fromDate: fromDate || null,
      toDate: toDate || null,
    });
  };
  useEffect(() => {
    filterArticles();
  }, [searchFilters, articles, filterArticles]);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for news..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </form>

      {showFilters && (
        <div className="mt-4 p-4 border-t border-gray-200">
          <h3 className="font-semibold mb-3">Filter by date</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleDateFilter}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;