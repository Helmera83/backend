import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import {
  MarkEmailRead,
  MarkEmailUnread,
  OpenInNew,
} from '@mui/icons-material';
import type { FeedItem, Feed } from '../types';
import { useAppContext } from '../context';
import { feedsApi } from '../api';

interface ArticleCardProps {
  article: FeedItem;
  feed?: Feed;
}

export function ArticleCard({ article, feed }: ArticleCardProps) {
  const { dispatch } = useAppContext();

  const handleToggleRead = async () => {
    try {
      const updatedArticle = article.is_read
        ? await feedsApi.markArticleUnread(article.id)
        : await feedsApi.markArticleRead(article.id);
      
      dispatch({ type: 'UPDATE_ARTICLE', payload: updatedArticle });
    } catch (error) {
      console.error('Error updating article read status:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update article status' });
    }
  };

  const handleOpenLink = () => {
    window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
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

  return (
    <Card
      sx={{
        mb: 2,
        opacity: article.is_read ? 0.7 : 1,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
    >
      {article.image_url && (
        <CardMedia
          component="img"
          height="200"
          image={article.image_url}
          alt={article.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              textDecoration: article.is_read ? 'line-through' : 'none',
              fontWeight: article.is_read ? 400 : 500,
              flex: 1,
              mr: 1,
            }}
          >
            {article.title}
          </Typography>
          
          <Box display="flex" gap={0.5}>
            <IconButton
              size="small"
              onClick={handleToggleRead}
              color={article.is_read ? 'default' : 'primary'}
              title={article.is_read ? 'Mark as unread' : 'Mark as read'}
            >
              {article.is_read ? <MarkEmailUnread /> : <MarkEmailRead />}
            </IconButton>
            
            <IconButton
              size="small"
              onClick={handleOpenLink}
              color="primary"
              title="Open article"
            >
              <OpenInNew />
            </IconButton>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {article.summary}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
          <Box display="flex" gap={1} alignItems="center">
            {feed && (
              <Chip
                label={feed.title}
                size="small"
                variant="outlined"
                color="primary"
              />
            )}
            <Chip
              label={article.is_read ? 'Read' : 'Unread'}
              size="small"
              color={article.is_read ? 'default' : 'primary'}
              variant={article.is_read ? 'outlined' : 'filled'}
            />
          </Box>
          
          <Typography variant="caption" color="text.secondary">
            {formatDate(article.published)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}