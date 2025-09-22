from .database import SessionLocal
from .models import Feed
from .default_feeds import DEFAULT_FEEDS

def load_default_feeds():
    db = SessionLocal()
    for feed in DEFAULT_FEEDS:
        exists = db.query(Feed).filter(Feed.url == feed['url']).first()
        if not exists:
            db_feed = Feed(url=feed['url'], title=feed['title'])
            db.add(db_feed)
    db.commit()
    db.close()