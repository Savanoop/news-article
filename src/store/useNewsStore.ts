import { create } from 'zustand';
import { Article, SearchFilters, UserPreferences } from '../types';

interface NewsState {
  articles: Article[];
  filteredArticles: Article[];
  isLoading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  userPreferences: UserPreferences;
  
  // Actions
  setArticles: (articles: Article[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  setUserPreferences: (preferences: Partial<UserPreferences>) => void;
  filterArticles: () => void;
}

const defaultSearchFilters: SearchFilters = {
  query: '',
  sources: [],
  categories: [],
  authors: [],
  fromDate: null,
  toDate: null,
};

const defaultUserPreferences: UserPreferences = {
  preferredSources: [],
  preferredCategories: [],
  preferredAuthors: [],
};

export const useNewsStore = create<NewsState>((set, get) => ({
  articles: [],
  filteredArticles: [],
  isLoading: false,
  error: null,
  searchFilters: defaultSearchFilters,
  userPreferences: defaultUserPreferences,

  setArticles: (articles) => {
    set({ articles });
  },

  setIsLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setSearchFilters: (filters) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters },
    }));
  },

  setUserPreferences: (preferences) => {
    set((state) => ({
      userPreferences: { ...state.userPreferences, ...preferences },
    }));

    const { searchFilters, userPreferences } = get();
    const updatedPrefs = { ...userPreferences, ...preferences };

    if (searchFilters.sources.length === 0 && updatedPrefs.preferredSources.length > 0) {
      get().setSearchFilters({ sources: updatedPrefs.preferredSources });
    }

    if (searchFilters.categories.length === 0 && updatedPrefs.preferredCategories.length > 0) {
      get().setSearchFilters({ categories: updatedPrefs.preferredCategories });
    }

    if (searchFilters.authors.length === 0 && updatedPrefs.preferredAuthors.length > 0) {
      get().setSearchFilters({ authors: updatedPrefs.preferredAuthors });
    }
  },

  filterArticles: () => {
    const { articles, searchFilters } = get();

    let filtered = [...articles];

    if (searchFilters.query) {
      const query = searchFilters.query.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          (article.content && article.content.toLowerCase().includes(query))
      );
    }

    if (searchFilters.sources.length > 0) {
      filtered = filtered.filter((article) =>
        searchFilters.sources.includes(article.source.id)
      );
    }

    if (searchFilters.categories.length > 0) {
      filtered = filtered.filter((article) =>
        searchFilters.categories.includes(article.category)
      );
    }

    if (searchFilters.authors.length > 0) {
      filtered = filtered.filter(
        (article) =>
          article.author && searchFilters.authors.includes(article.author)
      );
    }

    if (searchFilters.fromDate) {
      const fromDate = new Date(searchFilters.fromDate);
      filtered = filtered.filter(
        (article) => new Date(article.publishedAt) >= fromDate
      );
    }

    if (searchFilters.toDate) {
      const toDate = new Date(searchFilters.toDate);
      filtered = filtered.filter(
        (article) => new Date(article.publishedAt) <= toDate
      );
    }

    set({ filteredArticles: filtered });
  },
}));
