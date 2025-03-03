import React from 'react';
import { Source, Category } from '../types';
import { useNewsStore } from '../store/useNewsStore';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  sources: Source[];
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  sources, 
  categories, 
  isOpen,
  onClose
}) => {
  const { searchFilters, setSearchFilters } = useNewsStore();

  const handleSourceChange = (sourceId: string) => {
    const updatedSources = searchFilters.sources.includes(sourceId)
      ? searchFilters.sources.filter(id => id !== sourceId)
      : [...searchFilters.sources, sourceId];
    
    setSearchFilters({ sources: updatedSources });
  };

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategories = searchFilters.categories.includes(categoryId)
      ? searchFilters.categories.filter(id => id !== categoryId)
      : [...searchFilters.categories, categoryId];
    
    setSearchFilters({ categories: updatedCategories });
  };

  const clearFilters = () => {
    setSearchFilters({
      sources: [],
      categories: [],
      authors: [],
    });
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={onClose}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4 overflow-y-auto h-full pb-20 w-max">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Sources</h3>
            <button 
              onClick={clearFilters}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-2">
            {sources.map((source) => (
              <label key={source.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={searchFilters.sources.includes(source.id)}
                  onChange={() => handleSourceChange(source.id)}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm">{source.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={searchFilters.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;