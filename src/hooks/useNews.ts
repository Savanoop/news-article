import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllArticles, fetchSources } from '../api/newsApi';
import { useNewsStore } from '../store/useNewsStore';
import { mockArticles, mockSources } from '../data/mockArticles';

const useMockData = true;

export const useNews = () => {
  const { 
    articles, 
    filteredArticles, 
    isLoading: storeLoading, 
    error: storeError,
    searchFilters,
    userPreferences,
    setArticles,
    setIsLoading,
    setError,
    setSearchFilters,
    setUserPreferences,
  } = useNewsStore();

  // Fetch articles
  const { 
    isLoading: articlesLoading, 
    error: articlesError,
    refetch: refetchArticles,
  } = useQuery({
    queryKey: ['articles', searchFilters.query, searchFilters.categories, searchFilters.sources],
    queryFn: async () => {
      const data = useMockData ? mockArticles : await fetchAllArticles(
        searchFilters.query,
        searchFilters.categories.join(','),
        searchFilters.sources.join(',')
      );
      setArticles(data);
      setIsLoading(false);
      console.log("Fetched data:", data); // Debugging
      return data;
    },
  });

  // Fetch sources
  const { data: sources } = useQuery({
    queryKey: ['sources'],
    queryFn: () => useMockData ? Promise.resolve(mockSources) : fetchSources(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Update loading state
  useEffect(() => {
    setIsLoading(articlesLoading);
  }, [articlesLoading, setIsLoading]);

  // Update error state
  useEffect(() => {
    if (articlesError) {
      setError((articlesError as Error).message);
    }
  }, [articlesError, setError]);

  return {
    articles,
    filteredArticles,
    sources: sources || [],
    isLoading: storeLoading,
    error: storeError,
    searchFilters,
    userPreferences,
    setSearchFilters,
    setUserPreferences,
    refetchArticles,
  };
};