import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import type { FeedCreate } from '../types';
import { useAppContext } from '../context';
import { feedsApi } from '../api';

interface AddFeedDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddFeedDialog({ open, onClose }: AddFeedDialogProps) {
  const { dispatch } = useAppContext();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const feedData: FeedCreate = {
        url: url.trim(),
        title: title.trim() || undefined,
      };

      const newFeed = await feedsApi.addFeed(feedData);
      dispatch({ type: 'ADD_FEED', payload: newFeed });
      
      // Reset form
      setUrl('');
      setTitle('');
      onClose();

      // Try to refresh the feed to get initial articles
      try {
        await feedsApi.refreshFeed(newFeed.id);
      } catch (refreshError) {
        console.log('Initial feed refresh failed:', refreshError);
      }
    } catch (error: any) {
      setError(error.response?.data?.detail || 'Failed to add feed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setUrl('');
      setTitle('');
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add RSS Feed</DialogTitle>
        
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            
            <TextField
              label="RSS Feed URL"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              fullWidth
              placeholder="https://example.com/feed.xml"
              disabled={loading}
            />
            
            <TextField
              label="Feed Title (Optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              placeholder="Will be auto-detected if left empty"
              disabled={loading}
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !url.trim()}
          >
            {loading ? 'Adding...' : 'Add Feed'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}