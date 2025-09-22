# gnews-ok-api

A FastAPI backend for filtered Oklahoma & North Texas news with topic and image support.

## Features

- Filters RSS news items by topic and location (Oklahoma, North Texas).
- Stores news feeds and items in SQLite.
- Extracts and stores images for each article (if available).
- Static feed list auto-loaded on startup.
- Dockerized for easy deployment.

## Usage

1. Build and run with Docker Compose:

   ```bash
   docker compose up --build
   ```

2. The API will be available at [http://localhost:8000](http://localhost:8000).

3. Visit [http://localhost:8000/docs](http://localhost:8000/docs) for the OpenAPI/Swagger UI.

## Project Structure

```
app/
  main.py
  models.py
  schemas.py
  database.py
  keywords.py
  default_feeds.py
  load_default_feeds.py
  data/           # SQLite DB will be created here
requirements.txt
Dockerfile
docker-compose.yml
.dockerignore
README.md
```

## Extending

- Update `app/keywords.py` to change topics or locations.
- Add/remove feeds in `app/default_feeds.py`.

## License

MIT