import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';

// Mock trending articles data - TODO: Replace with real API data
const mockTrendingArticles = [
  {
    id: 1,
    title: "Breaking: Major Economic Summit Concludes",
    views: 15420,
    source: "CNN News"
  },
  {
    id: 2,
    title: "Tech Innovation Drives Market Growth",
    views: 12380,
    source: "KFOR News"
  },
  {
    id: 3,
    title: "Climate Change Summit Reaches Agreement",
    views: 11250,
    source: "Dallas Morning News"
  },
  {
    id: 4,
    title: "Sports: Championship Finals This Weekend",
    views: 9840,
    source: "The Oklahoman"
  },
  {
    id: 5,
    title: "Healthcare Policy Updates Announced",
    views: 8730,
    source: "KOCO 5 News"
  },
  {
    id: 6,
    title: "Education Reform Bill Passes Senate",
    views: 7650,
    source: "Oklahoma Daily News"
  },
  {
    id: 7,
    title: "Local Business Growth Continues",
    views: 6890,
    source: "The Journal Record"
  }
];

const TrendingArticles: React.FC = () => {
  return (
    <Paper sx={{ p: 2, height: 'fit-content', position: 'sticky', top: 20 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TrendingIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" component="h3">
          Trending Articles
        </Typography>
      </Box>
      
      <List dense>
        {mockTrendingArticles.map((article, index) => (
          <ListItem 
            key={article.id}
            sx={{ 
              px: 0,
              cursor: 'pointer',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Chip
                    label={index + 1}
                    size="small"
                    color="primary"
                    sx={{ 
                      minWidth: 24, 
                      height: 20, 
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.875rem',
                      lineHeight: 1.3,
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                  >
                    {article.title}
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {article.source}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {article.views.toLocaleString()} views
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ 
          display: 'block', 
          textAlign: 'center', 
          mt: 2, 
          fontStyle: 'italic' 
        }}
      >
        * Mock data - Replace with real trending metrics
      </Typography>
    </Paper>
  );
};

export default TrendingArticles;