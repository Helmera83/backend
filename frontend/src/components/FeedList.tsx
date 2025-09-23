import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  RssFeed as RssFeedIcon,
} from '@mui/icons-material';
import { useApp } from '../AppContext';

const FeedList: React.FC = () => {
  const { state, actions } = useApp();

  const getFeedItemCount = (feedId: number) => {
    return state.items.filter(item => item.feed_id === feedId).length;
  };

  const getUnreadCount = (feedId: number) => {
    return state.items.filter(item => item.feed_id === feedId && !item.is_read).length;
  };

  const handleRefresh = async (feedId: number) => {
    await actions.refreshFeed(feedId);
  };

  const handleRemove = async (feedId: number) => {
    if (window.confirm('Are you sure you want to remove this feed?')) {
      await actions.removeFeed(feedId);
    }
  };

  if (state.feeds.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <RssFeedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No RSS feeds added yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click the + button to add your first feed
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h2">
          RSS Feeds ({state.feeds.length})
        </Typography>
      </Box>
      <List>
        {state.feeds.map((feed, index) => {
          const itemCount = getFeedItemCount(feed.id);
          const unreadCount = getUnreadCount(feed.id);
          
          return (
            <ListItem
              key={feed.id}
              divider={index < state.feeds.length - 1}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      {feed.title || 'Untitled Feed'}
                    </Typography>
                    {itemCount > 0 && (
                      <Chip
                        label={`${itemCount} articles`}
                        size="small"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                    )}
                    {unreadCount > 0 && (
                      <Chip
                        label={`${unreadCount} unread`}
                        size="small"
                        color="primary"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '300px',
                    }}
                  >
                    {feed.url}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Refresh feed">
                    <IconButton
                      edge="end"
                      onClick={() => handleRefresh(feed.id)}
                      disabled={state.loading}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove feed">
                    <IconButton
                      edge="end"
                      onClick={() => handleRemove(feed.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default FeedList;