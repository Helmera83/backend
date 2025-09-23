// API Types
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
  title?: string;
}

export interface FeedItemUpdate {
  is_read: boolean;
}