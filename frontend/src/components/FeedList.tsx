import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  RssFeed,
  Delete,
  Refresh,
} from '@mui/icons-material';
import type { Feed } from '../types';
import { useAppContext } from '../context';
import { feedsApi } from '../api';

interface FeedListProps {
  onFeedSelect?: (feedId: number | null) => void;
}

export function FeedList({ onFeedSelect }: FeedListProps) {
  const { state, dispatch } = useAppContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [feedToDelete, setFeedToDelete] = useState<Feed | null>(null);
  const [refreshingFeeds, setRefreshingFeeds] = useState<Set<number>>(new Set());

  const handleFeedClick = (feedId: number) => {
    const newSelection = state.selectedFeed === feedId ? null : feedId;
    dispatch({ type: 'SET_SELECTED_FEED', payload: newSelection });
    onFeedSelect?.(newSelection);
  };

  const handleDeleteClick = (feed: Feed, e: React.MouseEvent) => {
    e.stopPropagation();
    setFeedToDelete(feed);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!feedToDelete) return;

    try {
      await feedsApi.removeFeed(feedToDelete.id);
      dispatch({ type: 'REMOVE_FEED', payload: feedToDelete.id });
      setDeleteDialogOpen(false);
      setFeedToDelete(null);
    } catch (error) {
      console.error('Error deleting feed:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete feed' });
    }
  };

  const handleRefreshFeed = async (feedId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setRefreshingFeeds(prev => new Set([...prev, feedId]));
    
    try {
      await feedsApi.refreshFeed(feedId);
      // Optionally reload articles here
    } catch (error) {
      console.error('Error refreshing feed:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh feed' });
    } finally {
      setRefreshingFeeds(prev => {
        const newSet = new Set(prev);
        newSet.delete(feedId);
        return newSet;
      });
    }
  };

  const getArticleCount = (feedId: number) => {
    return state.articles.filter(article => article.feed_id === feedId).length;
  };

  const getUnreadCount = (feedId: number) => {
    return state.articles.filter(article => article.feed_id === feedId && !article.is_read).length;
  };

  if (state.feeds.length === 0) {
    return (
      <Box p={3} textAlign="center">
        <RssFeed sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No RSS feeds yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add your first RSS feed to get started
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <List>
        {state.feeds.map((feed) => {
          const articleCount = getArticleCount(feed.id);
          const unreadCount = getUnreadCount(feed.id);
          const isSelected = state.selectedFeed === feed.id;
          const isRefreshing = refreshingFeeds.has(feed.id);

          return (
            <ListItem key={feed.id} disablePadding>
              <ListItemButton
                selected={isSelected}
                onClick={() => handleFeedClick(feed.id)}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon>
                  <RssFeed color={isSelected ? 'primary' : 'inherit'} />
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: isSelected ? 600 : 400,
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {feed.title || feed.url}
                      </Typography>
                      {unreadCount > 0 && (
                        <Chip
                          label={unreadCount}
                          size="small"
                          color="primary"
                          sx={{ minWidth: 'auto', height: 20 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {articleCount} article{articleCount !== 1 ? 's' : ''}
                    </Typography>
                  }
                />

                <Box display="flex" gap={0.5}>
                  <IconButton
                    size="small"
                    onClick={(e) => handleRefreshFeed(feed.id, e)}
                    disabled={isRefreshing}
                    title="Refresh feed"
                  >
                    <Refresh sx={{ fontSize: 18 }} />
                  </IconButton>
                  
                  <IconButton
                    size="small"
                    onClick={(e) => handleDeleteClick(feed, e)}
                    color="error"
                    title="Delete feed"
                  >
                    <Delete sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Feed</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{feedToDelete?.title || feedToDelete?.url}"?
            This will also remove all articles from this feed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}