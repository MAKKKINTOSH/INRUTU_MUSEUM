from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ImageBase(BaseModel):
    url: str

class ImageCreate(ImageBase):
    pass

class Image(ImageBase):
    id: int

    class Config:
        from_attributes = True

class HallCategoryBase(BaseModel):
    name: str

class HallCategoryCreate(HallCategoryBase):
    pass

class HallCategory(HallCategoryBase):
    id: int

    class Config:
        from_attributes = True

class HallBase(BaseModel):
    name: str
    category_id: int
    image_id: int

class HallCreate(HallBase):
    pass

class Hall(HallBase):
    id: int
    category: HallCategory
    image: Image

    class Config:
        from_attributes = True

class ArtifactCategoryBase(BaseModel):
    name: str

class ArtifactCategoryCreate(ArtifactCategoryBase):
    pass

class ArtifactCategory(ArtifactCategoryBase):
    id: int

    class Config:
        from_attributes = True

class ArtifactBase(BaseModel):
    name: str
    description: str
    creation_year: int
    category_id: int
    hall_id: int

class ArtifactCreate(ArtifactBase):
    image_ids: List[int]

class Artifact(ArtifactBase):
    id: int
    category: ArtifactCategory
    hall: Hall
    images: List[Image]

    class Config:
        from_attributes = True

class HistoricalFigureBase(BaseModel):
    last_name: str
    first_name: str
    middle_name: Optional[str] = None
    birth_date: datetime
    death_date: Optional[datetime] = None
    science_fields: str
    description: str
    biography: str

class HistoricalFigureCreate(HistoricalFigureBase):
    image_ids: List[int]

class HistoricalFigure(HistoricalFigureBase):
    id: int
    images: List[Image]

    class Config:
        from_attributes = True 