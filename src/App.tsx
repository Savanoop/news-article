import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import ArticleList from './components/ArticleList';
import UserPreferences from './components/UserPreferences';
import { useNews } from './hooks/useNews';
import { categories } from './data/categories';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  
  const { 
    filteredArticles, 
    sources, 
    isLoading, 
    error 
  } = useNews();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        onMenuClick={() => setSidebarOpen(true)} 
        onPreferencesClick={() => setPreferencesOpen(true)} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <SearchBar />
        
        <div className="flex flex-col md:flex-row gap-6">
          <FilterSidebar 
            sources={sources} 
            categories={categories}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <div className="flex-grow">
            <ArticleList 
              articles={filteredArticles} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </div>
      </main>
      
      <UserPreferences 
        sources={sources}
        categories={categories}
        isOpen={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
      />
      
      <footer className="bg-white shadow-md mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600 text-sm">
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;