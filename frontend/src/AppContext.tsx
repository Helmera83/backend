import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Feed, FeedItem, feedsApi } from './api';

interface AppState {
  feeds: Feed[];
  items: FeedItem[];
  loading: boolean;
  error: string | null;
  isDarkMode: boolean;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FEEDS'; payload: Feed[] }
  | { type: 'ADD_FEED'; payload: Feed }
  | { type: 'REMOVE_FEED'; payload: number }
  | { type: 'SET_ITEMS'; payload: FeedItem[] }
  | { type: 'UPDATE_ITEM'; payload: FeedItem }
  | { type: 'ADD_ITEMS'; payload: FeedItem[] }
  | { type: 'TOGGLE_DARK_MODE' };

const initialState: AppState = {
  feeds: [],
  items: [],
  loading: false,
  error: null,
  isDarkMode: localStorage.getItem('darkMode') === 'true',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FEEDS':
      return { ...state, feeds: action.payload };
    case 'ADD_FEED':
      return { ...state, feeds: [...state.feeds, action.payload] };
    case 'REMOVE_FEED':
      return {
        ...state,
        feeds: state.feeds.filter(feed => feed.id !== action.payload),
        items: state.items.filter(item => item.feed_id !== action.payload),
      };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'ADD_ITEMS':
      const existingItemIds = new Set(state.items.map(item => item.id));
      const newItems = action.payload.filter(item => !existingItemIds.has(item.id));
      return { ...state, items: [...state.items, ...newItems] };
    case 'TOGGLE_DARK_MODE':
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', newDarkMode.toString());
      return { ...state, isDarkMode: newDarkMode };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  actions: {
    loadFeeds: () => Promise<void>;
    addFeed: (url: string, title: string) => Promise<void>;
    removeFeed: (feedId: number) => Promise<void>;
    refreshFeed: (feedId: number) => Promise<void>;
    loadAllItems: () => Promise<void>;
    markAsRead: (itemId: number, isRead: boolean) => Promise<void>;
    toggleDarkMode: () => void;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    loadFeeds: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const feeds = await feedsApi.getFeeds();
        dispatch({ type: 'SET_FEEDS', payload: feeds });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load feeds' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    addFeed: async (url: string, title: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const newFeed = await feedsApi.addFeed({ url, title });
        dispatch({ type: 'ADD_FEED', payload: newFeed });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to add feed' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    removeFeed: async (feedId: number) => {
      try {
        await feedsApi.removeFeed(feedId);
        dispatch({ type: 'REMOVE_FEED', payload: feedId });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to remove feed' });
      }
    },

    refreshFeed: async (feedId: number) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const newItems = await feedsApi.refreshFeed(feedId);
        dispatch({ type: 'ADD_ITEMS', payload: newItems });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh feed' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    loadAllItems: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const items = await feedsApi.getAllItems();
        dispatch({ type: 'SET_ITEMS', payload: items });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load items' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },

    markAsRead: async (itemId: number, isRead: boolean) => {
      try {
        const updatedItem = await feedsApi.updateItem(itemId, { is_read: isRead });
        dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to update item' });
      }
    },

    toggleDarkMode: () => {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    },
  };

  useEffect(() => {
    actions.loadFeeds();
    actions.loadAllItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};