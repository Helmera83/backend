import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Feed, FeedItem } from './types';

interface AppState {
  feeds: Feed[];
  articles: FeedItem[];
  loading: boolean;
  error: string | null;
  selectedFeed: number | null;
  darkMode: boolean;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FEEDS'; payload: Feed[] }
  | { type: 'ADD_FEED'; payload: Feed }
  | { type: 'REMOVE_FEED'; payload: number }
  | { type: 'SET_ARTICLES'; payload: FeedItem[] }
  | { type: 'UPDATE_ARTICLE'; payload: FeedItem }
  | { type: 'SET_SELECTED_FEED'; payload: number | null }
  | { type: 'TOGGLE_DARK_MODE' };

const initialState: AppState = {
  feeds: [],
  articles: [],
  loading: false,
  error: null,
  selectedFeed: null,
  darkMode: localStorage.getItem('darkMode') === 'true',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FEEDS':
      return { ...state, feeds: action.payload };
    case 'ADD_FEED':
      return { ...state, feeds: [...state.feeds, action.payload] };
    case 'REMOVE_FEED':
      return { 
        ...state, 
        feeds: state.feeds.filter(feed => feed.id !== action.payload),
        selectedFeed: state.selectedFeed === action.payload ? null : state.selectedFeed
      };
    case 'SET_ARTICLES':
      return { ...state, articles: action.payload };
    case 'UPDATE_ARTICLE':
      return {
        ...state,
        articles: state.articles.map(article =>
          article.id === action.payload.id ? action.payload : article
        ),
      };
    case 'SET_SELECTED_FEED':
      return { ...state, selectedFeed: action.payload };
    case 'TOGGLE_DARK_MODE':
      const newDarkMode = !state.darkMode;
      localStorage.setItem('darkMode', newDarkMode.toString());
      return { ...state, darkMode: newDarkMode };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}