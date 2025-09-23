import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle as ReadIcon,
  RadioButtonUnchecked as UnreadIcon,
  OpenInNew as OpenIcon,
} from '@mui/icons-material';
import { FeedItem } from '../api';
import { useApp } from '../AppContext';

interface ArticleCardProps {
  item: FeedItem;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ item }) => {
  const { actions, state } = useApp();

  const handleToggleRead = async () => {
    await actions.markAsRead(item.id, !item.is_read);
  };

  const handleOpenArticle = () => {
    window.open(item.link, '_blank', 'noopener,noreferrer');
    if (!item.is_read) {
      actions.markAsRead(item.id, true);
    }
  };

  const getFeedTitle = (feedId: number) => {
    const feed = state.feeds.find(f => f.id === feedId);
    return feed?.title || 'Unknown Feed';
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    const cleanText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return cleanText.length > maxLength
      ? cleanText.substring(0, maxLength) + '...'
      : cleanText;
  };

  return (
    <Card
      sx={{
        transition: 'all 0.2s ease-in-out',
        opacity: item.is_read ? 0.7 : 1,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {item.image_url && (
        <CardMedia
          component="img"
          height="200"
          image={item.image_url}
          alt={item.title}
          sx={{
            objectFit: 'cover',
            filter: item.is_read ? 'grayscale(30%)' : 'none',
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: item.is_read ? 400 : 600,
                color: item.is_read ? 'text.secondary' : 'text.primary',
                mb: 1,
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Chip
                label={getFeedTitle(item.feed_id)}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
              <Typography variant="caption" color="text.secondary">
                {formatDate(item.published)}
              </Typography>
              {!item.is_read && (
                <Chip
                  label="New"
                  size="small"
                  color="primary"
                  sx={{ fontSize: '0.7rem' }}
                />
              )}
            </Box>
          </Box>
          <Tooltip title={item.is_read ? 'Mark as unread' : 'Mark as read'}>
            <IconButton
              onClick={handleToggleRead}
              size="small"
              color={item.is_read ? 'default' : 'primary'}
            >
              {item.is_read ? <ReadIcon /> : <UnreadIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        
        {item.summary && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              lineHeight: 1.5,
              fontWeight: item.is_read ? 300 : 400,
            }}
          >
            {truncateText(item.summary)}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ pt: 0 }}>
        <Button
          size="small"
          startIcon={<OpenIcon />}
          onClick={handleOpenArticle}
          variant="outlined"
        >
          Read Article
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;