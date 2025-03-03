import axios from "axios";
import { Article, Source } from "../types";

// API Keys (in a real app, these would be in environment variables)
const NEWS_API_KEY = "YOUR_NEWS_API_KEY";
const GUARDIAN_API_KEY = "YOUR_GUARDIAN_API_KEY";
const NYT_API_KEY = "YOUR_NYT_API_KEY";

// Base URLs
const NEWS_API_BASE_URL = "https://newsapi.org/v2";
const GUARDIAN_API_BASE_URL = "https://content.guardianapis.com";
const NYT_API_BASE_URL = "https://api.nytimes.com/svc";

// Fetch articles from NewsAPI
export const fetchNewsApiArticles = async (
  query = "",
  category = "",
  source = ""
): Promise<Article[]> => {
  try {
    const params: Record<string, string> = {
      apiKey: NEWS_API_KEY,
      language: "en",
      pageSize: "10",
    };

    if (query) params.q = query;
    if (category) params.category = category;
    if (source) params.sources = source;

    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      params,
    });

    return response.data.articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      description: article.description || "",
      content: article.content || "",
      url: article.url,
      image: article.urlToImage || "",
      publishedAt: article.publishedAt,
      source: {
        id: article.source.id || "newsapi",
        name: article.source.name,
      },
      author: article.author || "Unknown",
      category: category || "general",
    }));
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return [];
  }
};

// Fetch articles from The Guardian
export const fetchGuardianArticles = async (
  query = "",
  section = ""
): Promise<Article[]> => {
  try {
    const params: Record<string, string> = {
      "api-key": GUARDIAN_API_KEY,
      "show-fields": "headline,trailText,body,thumbnail,byline",
      "page-size": "10",
    };

    if (query) params.q = query;
    if (section) params.section = section;

    const response = await axios.get(`${GUARDIAN_API_BASE_URL}/search`, {
      params,
    });

    return response.data.response.results.map((article: any) => ({
      id: article.id,
      title: article.fields.headline,
      description: article.fields.trailText || "",
      content: article.fields.body || "",
      url: article.webUrl,
      image: article.fields.thumbnail || "",
      publishedAt: article.webPublicationDate,
      source: {
        id: "guardian",
        name: "The Guardian",
      },
      author: article.fields.byline || "The Guardian",
      category: article.sectionName || "general",
    }));
  } catch (error) {
    console.error("Error fetching from The Guardian:", error);
    return [];
  }
};

// Fetch articles from New York Times
export const fetchNYTArticles = async (
  query = "",
  section = ""
): Promise<Article[]> => {
  try {
    const params: Record<string, string> = {
      "api-key": NYT_API_KEY,
      "page-size": "10",
    };

    let endpoint = `${NYT_API_BASE_URL}/search/v2/articlesearch.json`;

    if (query) params.q = query;
    if (section) params.fq = `section_name:${section}`;

    const response = await axios.get(endpoint, { params });

    return response.data.response.docs.map((article: any) => ({
      id: article._id,
      title: article.headline.main,
      description: article.abstract || article.snippet || "",
      content: article.lead_paragraph || "",
      url: article.web_url,
      image:
        article.multimedia.length > 0
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : "",
      publishedAt: article.pub_date,
      source: {
        id: "nytimes",
        name: "The New York Times",
      },
      author:
        article.byline?.original?.replace("By ", "") || "The New York Times",
      category: article.section_name || "general",
    }));
  } catch (error) {
    console.error("Error fetching from NYT:", error);
    return [];
  }
};

// Fetch articles from all sources
export const fetchAllArticles = async (
  query = "",
  category = "",
  source = ""
): Promise<Article[]> => {
  try {
    const [newsApiArticles, guardianArticles, nytArticles] = await Promise.all([
      fetchNewsApiArticles(query, category, source),
      fetchGuardianArticles(query, category),
      fetchNYTArticles(query, category),
    ]);
    return [...newsApiArticles, ...guardianArticles, ...nytArticles];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

// Fetch available sources
export const fetchSources = async (): Promise<Source[]> => {
  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/sources`, {
      params: {
        apiKey: NEWS_API_KEY,
        language: "en",
      },
    });

    return response.data.sources.map((source: any) => ({
      id: source.id,
      name: source.name,
      description: source.description,
      url: source.url,
      category: source.category,
      language: source.language,
      country: source.country,
    }));
  } catch (error) {
    console.error("Error fetching sources:", error);
    return [];
  }
};
