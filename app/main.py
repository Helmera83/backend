from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
import feedparser
from typing import List
from .database import get_db, engine, Base
from .models import Feed, FeedItem
from .schemas import FeedCreate, FeedOut, FeedItemOut
from .keywords import KEYWORDS, LOCATION_KEYWORDS
from .load_default_feeds import load_default_feeds
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="RSS Reader Backend (OK & N. Texas Filtered)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    load_default_feeds()

def matches_topics_and_location(title, summary):
    text = (title + " " + summary).lower()
    topic_match = any(
        kw.lower() in text
        for keywords in KEYWORDS.values()
        for kw in keywords
    )
    location_match = any(loc in text for loc in LOCATION_KEYWORDS)
    return topic_match and location_match

def extract_image(entry):
    # 1. Try media_content
    if 'media_content' in entry:
        for m in entry.media_content:
            if 'url' in m:
                return m['url']
    # 2. Try enclosure
    if 'enclosures' in entry:
        for enclosure in entry.enclosures:
            if 'image' in enclosure.get('type', '') or enclosure.get('type', '') == 'image/jpeg':
                return enclosure.get('url')
    # 3. Try summary/content HTML
    html = getattr(entry, "summary", "") or getattr(entry, "content", [{}])[0].get("value", "")
    soup = BeautifulSoup(html, "html.parser")
    img_tag = soup.find("img")
    if img_tag and img_tag.get("src"):
        return img_tag.get("src")
    return None

@app.post("/feeds/", response_model=FeedOut)
def add_feed(feed: FeedCreate, db: Session = Depends(get_db)):
    db_feed = db.query(Feed).filter(Feed.url == feed.url).first()
    if db_feed:
        raise HTTPException(status_code=400, detail="Feed already exists")
    new_feed = Feed(url=feed.url, title=feed.title)
    db.add(new_feed)
    db.commit()
    db.refresh(new_feed)
    return new_feed

@app.get("/feeds/", response_model=List[FeedOut])
def list_feeds(db: Session = Depends(get_db)):
    return db.query(Feed).all()

@app.delete("/feeds/{feed_id}", response_model=FeedOut)
def remove_feed(feed_id: int, db: Session = Depends(get_db)):
    feed = db.query(Feed).get(feed_id)
    if not feed:
        raise HTTPException(status_code=404, detail="Feed not found")
    db.delete(feed)
    db.commit()
    return feed

@app.post("/feeds/{feed_id}/refresh", response_model=List[FeedItemOut])
def refresh_feed(feed_id: int, db: Session = Depends(get_db)):
    feed = db.query(Feed).get(feed_id)
    if not feed:
        raise HTTPException(status_code=404, detail="Feed not found")
    parsed = feedparser.parse(feed.url)
    new_items = []
    for entry in parsed.entries:
        exists = db.query(FeedItem).filter(FeedItem.link == entry.link, FeedItem.feed_id == feed_id).first()
        title = entry.title
        summary = getattr(entry, "summary", "")
        if not exists and matches_topics_and_location(title, summary):
            image_url = extract_image(entry)
            item = FeedItem(
                feed_id=feed_id,
                title=title,
                link=entry.link,
                summary=summary,
                published=getattr(entry, "published", ""),
                image_url=image_url
            )
            db.add(item)
            db.commit()
            db.refresh(item)
            new_items.append(item)
    return new_items

@app.get("/feeds/{feed_id}/items", response_model=List[FeedItemOut])
def get_feed_items(feed_id: int, db: Session = Depends(get_db)):
    return db.query(FeedItem).filter(FeedItem.feed_id == feed_id).order_by(FeedItem.published.desc()).all()