import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface Feed {
  id: number;
  url: string;
  title: string;
}

export interface FeedItem {
  id: number;
  feed_id: number;
  title: string;
  link: string;
  summary: string;
  published: string;
  image_url?: string;
  is_read: boolean;
}

export interface FeedCreate {
  url: string;
  title: string;
}

export interface FeedItemUpdate {
  is_read: boolean;
}

export const feedsApi = {
  // Feed management
  getFeeds: async (): Promise<Feed[]> => {
    const response = await api.get('/feeds/');
    return response.data;
  },

  addFeed: async (feed: FeedCreate): Promise<Feed> => {
    const response = await api.post('/feeds/', feed);
    return response.data;
  },

  removeFeed: async (feedId: number): Promise<Feed> => {
    const response = await api.delete(`/feeds/${feedId}`);
    return response.data;
  },

  refreshFeed: async (feedId: number): Promise<FeedItem[]> => {
    const response = await api.post(`/feeds/${feedId}/refresh`);
    return response.data;
  },

  getFeedItems: async (feedId: number): Promise<FeedItem[]> => {
    const response = await api.get(`/feeds/${feedId}/items`);
    return response.data;
  },

  // Item management
  getAllItems: async (): Promise<FeedItem[]> => {
    const response = await api.get('/items');
    return response.data;
  },

  updateItem: async (itemId: number, update: FeedItemUpdate): Promise<FeedItem> => {
    const response = await api.patch(`/items/${itemId}`, update);
    return response.data;
  },
};