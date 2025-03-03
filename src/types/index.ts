export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author?: string;
  category: string;
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface SearchFilters {
  query: string;
  sources: string[];
  categories: string[];
  authors: string[];
  fromDate: string | null;
  toDate: string | null;
}

export interface UserPreferences {
  preferredSources: string[];
  preferredCategories: string[];
  preferredAuthors: string[];
}