import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { useApp } from '../AppContext';

interface AddFeedDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddFeedDialog: React.FC<AddFeedDialogProps> = ({ open, onClose }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const { actions, state } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      await actions.addFeed(url.trim(), title.trim() || 'Untitled Feed');
      if (!state.error) {
        setUrl('');
        setTitle('');
        onClose();
      }
    }
  };

  const handleClose = () => {
    setUrl('');
    setTitle('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="h2">
          Add RSS Feed
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              autoFocus
              label="Feed URL"
              type="url"
              fullWidth
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/feed.xml"
              helperText="Enter the RSS feed URL"
            />
            <TextField
              label="Feed Title (Optional)"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Favorite Blog"
              helperText="Leave empty to auto-detect from feed"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={state.loading || !url.trim()}
          >
            {state.loading ? 'Adding...' : 'Add Feed'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddFeedDialog;