# RSS Reader - Material 3 Design

A modern RSS Reader application built with Material 3 (Material You) Design principles. The app allows users to add, view, and manage RSS feeds with a clean, responsive interface that supports both light and dark themes.

![RSS Reader Light Mode](https://github.com/user-attachments/assets/51dbc975-1567-4f0c-ba4a-7931e0a7a210)
![RSS Reader Dark Mode](https://github.com/user-attachments/assets/47eb9ebe-fab7-4e81-a62a-6debe785d4ba)

## Features

### Core Features
- **Add/Remove RSS Feeds**: Easily manage your RSS feed subscriptions
- **Article Management**: View articles from all subscribed feeds
- **Read/Unread Status**: Mark articles as read or unread
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Material 3 Components**: Modern UI using Material Design 3 principles

### Technical Features
- **FastAPI Backend**: High-performance Python backend with automatic API documentation
- **React Frontend**: TypeScript-based React application with Material-UI v5+
- **SQLite Database**: Lightweight database for storing feeds and articles
- **Real-time Updates**: Refresh feeds to get latest articles
- **RESTful API**: Clean API design for easy extensibility
- **State Management**: Efficient React Context-based state management
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping
- **SQLite**: Lightweight database
- **Feedparser**: RSS/Atom feed parsing
- **BeautifulSoup**: HTML parsing for article content
- **Pydantic**: Data validation using Python type annotations

### Frontend
- **React 18**: Modern React with TypeScript
- **Material-UI v5**: React components implementing Material Design 3
- **Axios**: HTTP client for API communication
- **React Context**: State management
- **Material Icons**: Comprehensive icon library

## Project Structure

```
├── app/                          # Backend application
│   ├── main.py                   # FastAPI application and routes
│   ├── models.py                 # SQLAlchemy database models
│   ├── schemas.py                # Pydantic schemas for API
│   ├── database.py               # Database configuration
│   ├── keywords.py               # Content filtering keywords (legacy)
│   ├── default_feeds.py          # Pre-configured RSS feeds
│   ├── load_default_feeds.py     # Load default feeds on startup
│   └── requirements.txt          # Python dependencies
├── frontend/                     # React frontend application
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── AddFeedDialog.tsx # Feed addition dialog
│   │   │   ├── ArticleCard.tsx   # Individual article display
│   │   │   ├── ArticleList.tsx   # Article list with filtering
│   │   │   └── FeedList.tsx      # RSS feed management
│   │   ├── api.ts                # API service layer
│   │   ├── theme.ts              # Material 3 theme configuration
│   │   ├── AppContext.tsx        # React Context for state management
│   │   └── App.tsx               # Main application component
│   ├── public/                   # Static assets
│   └── package.json              # Node.js dependencies
├── docker-compose.yml            # Docker configuration
├── Dockerfile                    # Docker image configuration
└── README.md                     # Project documentation
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Python 3.11+
- Git

### Option 1: Full Setup (Recommended for Development)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Backend Setup**
   ```bash
   # Install Python dependencies
   pip install -r app/requirements.txt
   
   # Start the backend server
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

3. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start the development server
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Option 2: Docker Setup (Recommended for Production)

1. **Clone and start with Docker**
   ```bash
   git clone <repository-url>
   cd backend
   docker compose up --build
   ```

2. **Access the Application**
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
   - Frontend: Build and serve separately or add to docker-compose.yml

### Option 3: Backend Only

If you only want to run the backend API:

```bash
# Install dependencies
pip install -r app/requirements.txt

# Start the server
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Access API documentation at http://localhost:8000/docs
```

## Usage Guide

### Adding RSS Feeds
1. Click the **+** floating action button
2. Enter the RSS feed URL (e.g., `https://rss.cnn.com/rss/edition.rss`)
3. Optionally provide a custom title
4. Click **Add Feed**

### Managing Articles
1. **View Articles**: Switch to the "Articles" tab
2. **Filter Articles**: Use the All/Unread/Read filter buttons
3. **Change View**: Toggle between grid and list view
4. **Mark as Read**: Click the circle icon on any article
5. **Read Article**: Click "Read Article" to open in a new tab
6. **Mark All Read**: Use the bulk action button

### Managing Feeds
1. **Refresh Feed**: Click the refresh icon next to any feed
2. **Remove Feed**: Click the delete icon (with confirmation)
3. **View Feed Info**: See article counts and unread indicators

### Dark Mode
- Click the theme toggle button in the top-right corner
- Theme preference is saved automatically

## API Endpoints

### Feeds
- `GET /feeds/` - List all RSS feeds
- `POST /feeds/` - Add a new RSS feed
- `DELETE /feeds/{feed_id}` - Remove a feed
- `POST /feeds/{feed_id}/refresh` - Refresh feed and fetch new articles
- `GET /feeds/{feed_id}/items` - Get articles for a specific feed

### Articles
- `GET /items` - Get all articles across all feeds
- `PATCH /items/{item_id}` - Update article (mark as read/unread)

### Example API Usage

```bash
# Add a new feed
curl -X POST "http://localhost:8000/feeds/" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://rss.cnn.com/rss/edition.rss", "title": "CNN News"}'

# Get all articles
curl -X GET "http://localhost:8000/items"

# Mark article as read
curl -X PATCH "http://localhost:8000/items/1" \
     -H "Content-Type: application/json" \
     -d '{"is_read": true}'
```

## Extending the Application

The application is designed for easy extensibility:

### Adding Authentication
1. Update backend models to include user associations
2. Add authentication middleware to FastAPI
3. Update frontend to handle user sessions
4. Modify API endpoints to filter by user

### Adding Notifications
1. Implement WebSocket connections for real-time updates
2. Add notification preferences to user model
3. Create notification components in React frontend

### Custom Feed Categories
1. Add category field to Feed model
2. Update frontend to support category management
3. Add filtering by category

### Export/Import Features
1. Add OPML export/import endpoints
2. Create UI components for file operations

## Material 3 Design Implementation

This application implements Material 3 (Material You) design principles:

- **Dynamic Color**: Theme adapts with custom color schemes
- **Rounded Corners**: Modern 12px border radius throughout
- **Elevated Surfaces**: Proper use of elevation and shadows
- **Typography Scale**: Consistent text sizing and weights
- **Interactive States**: Hover and focus states for all interactive elements
- **Responsive Layout**: Adapts to different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Notes

- The backend includes legacy filtering for Oklahoma/Texas news that can be removed if not needed
- Frontend uses React Context for state management - consider Redux for larger applications
- SQLite is used for simplicity - consider PostgreSQL for production
- Error handling is basic - enhance for production use
- No authentication is implemented - add security for production deployment

## License

MIT License - see LICENSE file for details
