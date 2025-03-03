import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Article } from '../types';
import { ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        {article.image ? (
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-2 py-1 text-xs font-semibold">
          {article.source.name}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <span className="text-white text-xs">{article.category}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{article.author || 'Unknown author'}</span>
          <span>{formattedDate}</span>
        </div>
        
        <div className="mt-4 flex justify-end">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Read more <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;