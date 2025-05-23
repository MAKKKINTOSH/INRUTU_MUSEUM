from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter()

@router.get("/categories", response_model=List[schemas.HallCategory])
def get_hall_categories(db: Session = Depends(get_db)):
    categories = db.query(models.HallCategory).all()
    return categories

@router.post("/categories", response_model=schemas.HallCategory)
def create_hall_category(category: schemas.HallCategoryCreate, db: Session = Depends(get_db)):
    db_category = models.HallCategory(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.get("/", response_model=List[schemas.Hall])
def get_halls(db: Session = Depends(get_db)):
    halls = db.query(models.Hall).all()
    return halls

@router.get("/{hall_id}", response_model=schemas.Hall)
def get_hall(hall_id: int, db: Session = Depends(get_db)):
    hall = db.query(models.Hall).filter(models.Hall.id == hall_id).first()
    if hall is None:
        raise HTTPException(status_code=404, detail="Hall not found")
    return hall

@router.post("/", response_model=schemas.Hall)
def create_hall(hall: schemas.HallCreate, db: Session = Depends(get_db)):
    db_hall = models.Hall(**hall.dict())
    db.add(db_hall)
    db.commit()
    db.refresh(db_hall)
    return db_hall

@router.get("/category/{category_id}", response_model=List[schemas.Hall])
def get_halls_by_category(category_id: int, db: Session = Depends(get_db)):
    halls = db.query(models.Hall).filter(models.Hall.category_id == category_id).all()
    return halls 