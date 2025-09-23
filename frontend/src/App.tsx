import { useEffect, useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Fab,
  Snackbar,
  Alert,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Add,
  DarkMode,
  LightMode,
  Menu,
  Refresh,
  Article,
} from '@mui/icons-material';
import { lightTheme, darkTheme } from './theme';
import { AppProvider, useAppContext } from './context';
import { feedsApi } from './api';
import { ArticleCard } from './components/ArticleCard';
import { FeedList } from './components/FeedList';
import { AddFeedDialog } from './components/AddFeedDialog';

const DRAWER_WIDTH = 320;

function AppContent() {
  const { state, dispatch } = useAppContext();
  const [addFeedOpen, setAddFeedOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Load initial data
  useEffect(() => {
    loadFeeds();
    loadArticles();
  }, []);

  // Filter articles based on selected feed
  const filteredArticles = state.selectedFeed
    ? state.articles.filter(article => article.feed_id === state.selectedFeed)
    : state.articles;

  const loadFeeds = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const feeds = await feedsApi.getFeeds();
      dispatch({ type: 'SET_FEEDS', payload: feeds });
    } catch (error) {
      console.error('Error loading feeds:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load feeds' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadArticles = async () => {
    try {
      const articles = await feedsApi.getAllArticles();
      dispatch({ type: 'SET_ARTICLES', payload: articles });
    } catch (error) {
      console.error('Error loading articles:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load articles' });
    }
  };

  const handleRefreshAll = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Refresh all feeds
      await Promise.all(
        state.feeds.map(feed => feedsApi.refreshFeed(feed.id))
      );
      // Reload articles after refresh
      await loadArticles();
    } catch (error) {
      console.error('Error refreshing feeds:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh feeds' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleCloseError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const selectedFeedData = state.selectedFeed
    ? state.feeds.find(feed => feed.id === state.selectedFeed)
    : null;

  const unreadCount = state.articles.filter(article => !article.is_read).length;

  const sidebarContent = (
    <Box sx={{ width: DRAWER_WIDTH, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div">
          RSS Feeds
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {state.feeds.length} feed{state.feeds.length !== 1 ? 's' : ''} • {unreadCount} unread
        </Typography>
      </Box>
      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <FeedList onFeedSelect={() => isMobile && setDrawerOpen(false)} />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
          )}
          
          <Article sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RSS Reader
            {selectedFeedData && (
              <Typography variant="subtitle2" component="span" sx={{ ml: 1, opacity: 0.8 }}>
                • {selectedFeedData.title}
              </Typography>
            )}
          </Typography>

          <IconButton color="inherit" onClick={handleRefreshAll} disabled={state.loading}>
            <Refresh />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          >
            {state.darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {sidebarContent}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              position: 'relative',
              height: '100vh',
            },
          }}
          open
        >
          {sidebarContent}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          height: '100vh',
          overflow: 'auto',
          pt: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {filteredArticles.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: '60vh', textAlign: 'center' }}
            >
              <Article sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                {state.selectedFeed ? 'No articles in this feed' : 'No articles yet'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {state.feeds.length === 0 
                  ? 'Add some RSS feeds to get started'
                  : 'Try refreshing your feeds to load articles'
                }
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                {selectedFeedData ? `${selectedFeedData.title}` : 'All Articles'}
                <Typography variant="subtitle1" component="span" sx={{ ml: 2, color: 'text.secondary' }}>
                  {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                </Typography>
              </Typography>
              
              {filteredArticles.map((article) => {
                const feed = state.feeds.find(f => f.id === article.feed_id);
                return (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    feed={feed}
                  />
                );
              })}
            </Box>
          )}
        </Container>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add feed"
        onClick={() => setAddFeedOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Add />
      </Fab>

      {/* Add Feed Dialog */}
      <AddFeedDialog
        open={addFeedOpen}
        onClose={() => setAddFeedOpen(false)}
      />

      {/* Error Snackbar */}
      <Snackbar
        open={!!state.error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {state.error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function App() {
  const [darkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
