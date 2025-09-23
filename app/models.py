from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from .database import Base

class Feed(Base):
    __tablename__ = "feeds"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    title = Column(String, default="")
    items = relationship("FeedItem", back_populates="feed", cascade="all, delete-orphan")

class FeedItem(Base):
    __tablename__ = "feed_items"

    id = Column(Integer, primary_key=True, index=True)
    feed_id = Column(Integer, ForeignKey("feeds.id"))
    title = Column(String)
    link = Column(String, unique=True)
    summary = Column(Text)
    published = Column(String)
    image_url = Column(String, nullable=True)
    is_read = Column(Boolean, default=False)
    feed = relationship("Feed", back_populates="items")