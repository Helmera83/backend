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
        orm_mode = True

class FeedItemOut(BaseModel):
    id: int
    feed_id: int
    title: str
    link: str
    summary: str
    published: str
    image_url: Optional[str] = None

    class Config:
        orm_mode = True