import React from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';
import { Loader } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader size={40} className="text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded-lg text-center">
        <p className="text-lg mb-2">No articles found</p>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;