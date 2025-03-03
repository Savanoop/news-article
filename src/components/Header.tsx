import React from 'react';
import { Newspaper, Menu, Settings } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onPreferencesClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onPreferencesClick }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onMenuClick}
            className="mr-4 md:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <Newspaper size={28} className="text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">NewsAggregator</h1>
          </div>
        </div>
        
        <button
          onClick={onPreferencesClick}
          className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Settings size={18} className="text-gray-600" />
          <span className="hidden sm:inline text-gray-700">Preferences</span>
        </button>
      </div>
    </header>
  );
};

export default Header;