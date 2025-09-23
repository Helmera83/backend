import React, { useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Fab,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  RssFeed as RssFeedIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';
import { createAppTheme } from './theme';
import { AppProvider, useApp } from './AppContext';
import AddFeedDialog from './components/AddFeedDialog';
import FeedList from './components/FeedList';
import ArticleList from './components/ArticleList';

function AppContent() {
  const { state, actions } = useApp();
  const [addFeedOpen, setAddFeedOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" elevation={0} sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Toolbar>
          <RssFeedIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography 
            variant="h6" 
            component="h1" 
            sx={{ 
              flexGrow: 1,
              color: 'text.primary',
              fontWeight: 600
            }}
          >
            RSS Reader
          </Typography>
          
          <Tooltip title={state.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={actions.toggleDarkMode}
              color="inherit"
              sx={{ color: 'text.primary' }}
            >
              {state.isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ px: 2 }}
          >
            <Tab 
              icon={<RssFeedIcon />} 
              label="Feeds" 
              iconPosition="start"
              sx={{ minHeight: 48 }}
            />
            <Tab 
              icon={<ArticleIcon />} 
              label="Articles" 
              iconPosition="start"
              sx={{ minHeight: 48 }}
            />
          </Tabs>
        </Box>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box role="tabpanel" hidden={activeTab !== 0}>
          {activeTab === 0 && <FeedList />}
        </Box>
        <Box role="tabpanel" hidden={activeTab !== 1}>
          {activeTab === 1 && <ArticleList />}
        </Box>
      </Container>

      <Fab
        color="primary"
        aria-label="add feed"
        onClick={() => setAddFeedOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <AddIcon />
      </Fab>

      <AddFeedDialog
        open={addFeedOpen}
        onClose={() => setAddFeedOpen(false)}
      />

      <Snackbar
        open={!!state.error}
        autoHideDuration={6000}
        onClose={() => window.location.reload()} // Simple error clear
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          severity="error" 
          variant="filled"
          onClose={() => window.location.reload()}
        >
          {state.error}
        </Alert>
      </Snackbar>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <ThemeProviderWrapper />
    </AppProvider>
  );
}

function ThemeProviderWrapper() {
  const { state } = useApp();
  const theme = createAppTheme(state.isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
