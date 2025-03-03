import React, { useState } from 'react';
import { Source, Category } from '../types';
import { useNewsStore } from '../store/useNewsStore';
import { Save, X } from 'lucide-react';

interface UserPreferencesProps {
  sources: Source[];
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({
  sources,
  categories,
  isOpen,
  onClose,
}) => {
  const { userPreferences, setUserPreferences } = useNewsStore();
  const [selectedSources, setSelectedSources] = useState<string[]>(userPreferences.preferredSources);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(userPreferences.preferredCategories);

  const handleSourceChange = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const savePreferences = () => {
    setUserPreferences({
      preferredSources: selectedSources,
      preferredCategories: selectedCategories,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Customize Your News Feed</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-130px)]">
          <p className="text-gray-600 mb-4">
            Select your preferred sources and categories to personalize your news feed.
          </p>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Preferred Sources</h3>
            <div className="space-y-2">
              {sources.map((source) => (
                <label key={source.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSources.includes(source.id)}
                    onChange={() => handleSourceChange(source.id)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm">{source.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Preferred Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg mr-2 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={savePreferences}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Save size={16} className="mr-1" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;