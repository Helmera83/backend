from pydantic import BaseModel, ConfigDict
from typing import Optional

class FeedCreate(BaseModel):
    url: str
    title: Optional[str] = ""

class FeedOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    url: str
    title: str

class FeedItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    feed_id: int
    title: str
    link: str
    summary: str
    published: str
    image_url: Optional[str] = None
    is_read: bool = False

class FeedItemUpdate(BaseModel):
    is_read: bool