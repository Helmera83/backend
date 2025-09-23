from pydantic import BaseModel
from typing import Optional

class FeedCreate(BaseModel):
    url: str
    title: Optional[str] = ""

class FeedOut(BaseModel):
    id: int
    url: str
    title: str

    class Config:
        from_attributes = True

class FeedItemOut(BaseModel):
    id: int
    feed_id: int
    title: str
    link: str
    summary: str
    published: str
    image_url: Optional[str] = None
    is_read: bool = False

    class Config:
        from_attributes = True

class FeedItemUpdate(BaseModel):
    is_read: bool