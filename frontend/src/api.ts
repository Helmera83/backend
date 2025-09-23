import axios from 'axios';
import type { Feed, FeedItem, FeedCreate, FeedItemUpdate } from './types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const feedsApi = {
  // Feed management
  async getFeeds(): Promise<Feed[]> {
    const response = await api.get('/feeds/');
    return response.data;
  },

  async addFeed(feed: FeedCreate): Promise<Feed> {
    const response = await api.post('/feeds/', feed);
    return response.data;
  },

  async removeFeed(feedId: number): Promise<Feed> {
    const response = await api.delete(`/feeds/${feedId}`);
    return response.data;
  },

  async refreshFeed(feedId: number): Promise<FeedItem[]> {
    const response = await api.post(`/feeds/${feedId}/refresh`);
    return response.data;
  },

  // Articles
  async getAllArticles(): Promise<FeedItem[]> {
    const response = await api.get('/articles');
    return response.data;
  },

  async getFeedItems(feedId: number): Promise<FeedItem[]> {
    const response = await api.get(`/feeds/${feedId}/items`);
    return response.data;
  },

  async updateArticle(itemId: number, update: FeedItemUpdate): Promise<FeedItem> {
    const response = await api.patch(`/articles/${itemId}`, update);
    return response.data;
  },

  async markArticleRead(itemId: number): Promise<FeedItem> {
    const response = await api.post(`/articles/${itemId}/mark-read`);
    return response.data;
  },

  async markArticleUnread(itemId: number): Promise<FeedItem> {
    const response = await api.post(`/articles/${itemId}/mark-unread`);
    return response.data;
  },
};

export default api;