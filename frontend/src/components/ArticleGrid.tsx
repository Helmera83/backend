import React, { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Paper,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ViewList as ListIcon,
  ViewModule as GridIcon,
  Article as ArticleIcon,
  CheckCircleOutline as MarkAllReadIcon,
} from '@mui/icons-material';
import { useApp } from '../AppContext';
import ArticleCard from './ArticleCard';

type ViewMode = 'grid' | 'list';
type FilterMode = 'all' | 'unread' | 'read';

/**
 * ArticleGrid Component - Main article display grid for the Articles tab
 * 
 * This component handles the display of articles in a responsive grid layout
 * with filtering and view mode options. It replaces the existing ArticleList
 * as the main content area when the Articles tab is active.
 * 
 * Features:
 * - Responsive grid layout
 * - Article filtering (all/unread/read)
 * - View mode toggle (grid/list)
 * - Mark all as read functionality
 * - Empty state handling
 */
const ArticleGrid: React.FC = () => {
  const { state, actions } = useApp();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  // Filter articles based on selected filter mode
  const filteredItems = state.items.filter(item => {
    switch (filterMode) {
      case 'unread':
        return !item.is_read;
      case 'read':
        return item.is_read;
      default:
        return true;
    }
  });

  const unreadCount = state.items.filter(item => !item.is_read).length;
  const readCount = state.items.filter(item => item.is_read).length;

  const handleMarkAllRead = async () => {
    const unreadItems = state.items.filter(item => !item.is_read);
    if (unreadItems.length > 0 && window.confirm(`Mark all ${unreadItems.length} articles as read?`)) {
      // TODO: Consider batch API call for better performance
      for (const item of unreadItems) {
        await actions.markAsRead(item.id, true);
      }
    }
  };

  // Empty state when no articles are available
  if (state.items.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <ArticleIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          No articles found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add some RSS feeds and refresh them to see articles here
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {/* Article controls and statistics */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" component="h2">
              Articles
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={`${state.items.length} total`}
                size="small"
                variant="outlined"
              />
              {unreadCount > 0 && (
                <Chip
                  label={`${unreadCount} unread`}
                  size="small"
                  color="primary"
                />
              )}
              {readCount > 0 && (
                <Chip
                  label={`${readCount} read`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {unreadCount > 0 && (
              <Tooltip title="Mark all as read">
                <IconButton onClick={handleMarkAllRead} color="primary">
                  <MarkAllReadIcon />
                </IconButton>
              </Tooltip>
            )}
            
            {/* Filter controls */}
            <ToggleButtonGroup
              value={filterMode}
              exclusive
              onChange={(_, value) => value && setFilterMode(value)}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="unread">Unread</ToggleButton>
              <ToggleButton value="read">Read</ToggleButton>
            </ToggleButtonGroup>
            
            <Divider orientation="vertical" flexItem />
            
            {/* View mode controls */}
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, value) => value && setViewMode(value)}
              size="small"
            >
              <ToggleButton value="grid">
                <GridIcon />
              </ToggleButton>
              <ToggleButton value="list">
                <ListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Paper>

      {/* Articles display area */}
      {filteredItems.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No {filterMode === 'all' ? '' : filterMode} articles
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: viewMode === 'grid' ? 'repeat(2, 1fr)' : '1fr',
            md: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
            lg: viewMode === 'grid' ? 'repeat(4, 1fr)' : '1fr'
          },
          gap: 3
        }}>
          {filteredItems.map((item) => (
            <ArticleCard key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ArticleGrid;