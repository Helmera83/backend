import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
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

const ArticleList: React.FC = () => {
  const { state, actions } = useApp();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

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
      for (const item of unreadItems) {
        await actions.markAsRead(item.id, true);
      }
    }
  };

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

      {filteredItems.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No {filterMode === 'all' ? '' : filterMode} articles
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid 
              item 
              xs={12} 
              sm={viewMode === 'grid' ? 6 : 12} 
              md={viewMode === 'grid' ? 4 : 12}
              lg={viewMode === 'grid' ? 3 : 12}
              key={item.id}
            >
              <ArticleCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ArticleList;