import { Article } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Scientists Discover New Species in Amazon Rainforest',
    description: 'A team of international researchers has discovered a new species of frog that can change colors based on its environment.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
    url: 'https://example.com/article1',
    image: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef',
    publishedAt: '2025-04-15T09:30:00Z',
    source: {
      id: 'science-daily',
      name: 'Science Daily'
    },
    author: 'Dr. Jane Smith',
    category: 'science'
  },
  {
    id: '2',
    title: 'Global Tech Conference Announces Revolutionary AI Tools',
    description: 'The annual TechWorld conference unveiled several groundbreaking AI tools that promise to transform industries.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
    url: 'https://example.com/article2',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    publishedAt: '2025-04-14T14:15:00Z',
    source: {
      id: 'tech-insider',
      name: 'Tech Insider'
    },
    author: 'Alex Johnson',
    category: 'technology'
  },
  {
    id: '3',
    title: 'Stock Markets Reach Record Highs Amid Economic Recovery',
    description: 'Global stock markets soared to unprecedented levels as economic indicators show strong recovery post-pandemic.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
    url: 'https://example.com/article3',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
    publishedAt: '2025-04-14T10:45:00Z',
    source: {
      id: 'financial-times',
      name: 'Financial Times'
    },
    author: 'Sarah Williams',
    category: 'business'
  },
  {
    id: '4',
    title: 'New Study Reveals Benefits of Mediterranean Diet',
    description: 'Research confirms that following a Mediterranean diet can significantly reduce the risk of heart disease and improve longevity.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
    url: 'https://example.com/article4',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
    publishedAt: '2025-04-13T08:20:00Z',
    source: {
      id: 'health-journal',
      name: 'Health Journal'
    },
    author: 'Dr. Michael Brown',
    category: 'health'
  },
  {
    id: '5',
    title: 'Major Film Festival Announces Award Winners',
    description: 'The International Film Festival concluded with a celebration of groundbreaking cinema from around the world.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
    url: 'https://example.com/article5',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728',
    publishedAt: '2025-04-12T22:10:00Z',
    source: {
      id: 'entertainment-weekly',
      name: 'Entertainment Weekly'
    },
    author: 'Robert Davis',
    category: 'entertainment'
  },
  {
    id: '6',
    title: 'Climate Summit Reaches Historic Agreement on Emissions',
    description: 'World leaders have committed to ambitious targets to reduce carbon emissions following a week-long climate summit.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
    url: 'https://example.com/article6',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    publishedAt: '2025-04-11T15:30:00Z',
    source: {
      id: 'global-news',
      name: 'Global News'
    },
    author: 'Emma Thompson',
    category: 'world'
  }
];

export const mockSources = [
  {
    id: 'bbc-news',
    name: 'BBC News',
    description: 'Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories.',
    url: 'http://www.bbc.co.uk/news',
    category: 'general',
    language: 'en',
    country: 'gb'
  },
  {
    id: 'cnn',
    name: 'CNN',
    description: 'View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health.',
    url: 'http://www.cnn.com',
    category: 'general',
    language: 'en',
    country: 'us'
  },
  {
    id: 'the-washington-post',
    name: 'The Washington Post',
    description: 'Breaking news and analysis on politics, business, world national news, entertainment more.',
    url: 'https://www.washingtonpost.com',
    category: 'general',
    language: 'en',
    country: 'us'
  },
  {
    id: 'the-wall-street-journal',
    name: 'The Wall Street Journal',
    description: 'WSJ online coverage of breaking news and current headlines from the US and around the world.',
    url: 'http://www.wsj.com',
    category: 'business',
    language: 'en',
    country: 'us'
  },
  {
    id: 'the-guardian-uk',
    name: 'The Guardian',
    description: 'Latest news, sport, business, comment, analysis and reviews from the Guardian, the world\'s leading liberal voice.',
    url: 'https://www.theguardian.com',
    category: 'general',
    language: 'en',
    country: 'gb'
  },
  {
    id: 'al-jazeera-english',
    name: 'Al Jazeera English',
    description: 'News, analysis from the Middle East & worldwide, multimedia & interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.',
    url: 'http://www.aljazeera.com',
    category: 'general',
    language: 'en',
    country: 'qa'
  }
];