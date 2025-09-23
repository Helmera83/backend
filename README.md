# RSS Reader - Material 3 Design

A modern, responsive RSS reader application built with React and Material UI v5, featuring Material 3 (Material You) design principles. The application provides a clean interface for managing RSS feeds and reading articles with full support for light/dark modes.

![RSS Reader Screenshot](https://github.com/user-attachments/assets/4812ea80-2d6c-440e-9ae2-b32d4000f715)

## Features

### ✨ Core Functionality
- **RSS Feed Management**: Add, remove, and refresh RSS feeds
- **Article Reading**: View articles with metadata (title, date, source, summary)
- **Read/Unread Status**: Mark articles as read or unread with visual indicators
- **Feed Filtering**: View all articles or filter by specific feeds
- **Responsive Design**: Optimized for desktop and mobile devices

### 🎨 Material 3 Design
- **Modern UI**: Material 3 (Material You) design language
- **Dynamic Colors**: Beautiful purple primary color scheme
- **Elevated Surfaces**: Cards, buttons, and dialogs with proper shadows
- **Typography**: Roboto font with Material 3 typography scales
- **Icons**: Material Design icons throughout the interface
- **Smooth Animations**: Hover effects and transitions

### 🌙 Theme Support
- **Light/Dark Mode**: Toggle between light and dark themes
- **Persistent Preference**: Theme choice saved in localStorage
- **Material 3 Colors**: Proper color schemes for both modes

### 📱 Responsive Layout
- **Sidebar Navigation**: Collapsible feed list on mobile
- **Mobile-First**: Hamburger menu and touch-friendly interface
- **Desktop Optimized**: Fixed sidebar and efficient use of space

## Tech Stack

### Backend (FastAPI)
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM for database management
- **SQLite**: Lightweight database for feed and article storage
- **Feedparser**: RSS/Atom feed parsing
- **BeautifulSoup**: HTML parsing for article images
- **Pydantic**: Data validation and serialization

### Frontend (React + Material UI)
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Material UI v5**: React component library with Material 3 theming
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API communication
- **React Context**: State management for app-wide state

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application and routes
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic schemas for API
│   ├── database.py          # Database configuration
│   ├── keywords.py          # Content filtering keywords
│   ├── default_feeds.py     # Default RSS feeds
│   └── load_default_feeds.py # Feed initialization
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── FeedList.tsx
│   │   │   └── AddFeedDialog.tsx
│   │   ├── App.tsx          # Main application component
│   │   ├── theme.ts         # Material 3 theme configuration
│   │   ├── context.tsx      # React Context for state management
│   │   ├── api.ts           # API client functions
│   │   ├── types.ts         # TypeScript type definitions
│   │   └── main.tsx         # Application entry point
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   └── vite.config.ts       # Vite configuration
├── Dockerfile               # Backend containerization
├── docker-compose.yml       # Full-stack deployment
└── README.md               # This file
```

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Install Python dependencies**:
   ```bash
   pip install -r app/requirements.txt
   ```

2. **Start the FastAPI server**:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

3. **API will be available at**: `http://localhost:8000`
4. **API documentation**: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Application will be available at**: `http://localhost:5173`

### Docker Setup (Alternative)

1. **Build and run with Docker Compose**:
   ```bash
   docker compose up --build
   ```

2. **Access the application**:
   - Backend API: `http://localhost:8000`
   - Frontend: `http://localhost:5173` (if using dev setup)

## Usage

### Adding RSS Feeds
1. Click the purple floating action button (➕) in the bottom right
2. Enter the RSS feed URL (required)
3. Optionally provide a custom title
4. Click "Add Feed" to save

### Managing Articles
- **View Articles**: Articles appear in the main content area
- **Mark as Read/Unread**: Click the email icons on article cards
- **Open Articles**: Click the external link icon to open in new tab
- **Filter by Feed**: Click on a feed in the sidebar to filter articles

### Using Dark Mode
- Click the moon/sun icon in the top right to toggle themes
- Your preference is automatically saved

### Responsive Features
- **Mobile**: Use the hamburger menu to access the feed sidebar
- **Desktop**: Sidebar is always visible for easy navigation

## API Endpoints

### Feeds
- `GET /feeds/` - List all feeds
- `POST /feeds/` - Add new feed
- `DELETE /feeds/{feed_id}` - Remove feed
- `POST /feeds/{feed_id}/refresh` - Refresh feed articles
- `GET /feeds/{feed_id}/items` - Get articles for specific feed

### Articles
- `GET /articles` - Get all articles across feeds
- `PATCH /articles/{item_id}` - Update article read status
- `POST /articles/{item_id}/mark-read` - Mark article as read
- `POST /articles/{item_id}/mark-unread` - Mark article as unread

## Development

### Backend Development
- Uses FastAPI with automatic API documentation
- SQLAlchemy models with migration support
- Comprehensive error handling and validation
- CORS enabled for frontend integration

### Frontend Development
- TypeScript for type safety
- Material UI components with custom Material 3 theming
- React Context for state management
- Responsive design with mobile-first approach
- Modern React patterns (hooks, functional components)

### Content Filtering
The backend includes content filtering based on keywords and location (Oklahoma & North Texas focus). You can modify the filtering in `app/keywords.py` or disable it in `app/main.py`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Future Enhancements

- [ ] User authentication and personalized feeds
- [ ] Push notifications for new articles
- [ ] Article bookmarking and favorites
- [ ] Full-text search across articles
- [ ] Import/export OPML feed lists
- [ ] Article text summarization
- [ ] Offline reading support
- [ ] Social sharing features
