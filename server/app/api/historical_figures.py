from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import models
from app.schemas import schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.HistoricalFigure])
def get_historical_figures(db: Session = Depends(get_db)):
    figures = db.query(models.HistoricalFigure).all()
    return figures

@router.get("/{figure_id}", response_model=schemas.HistoricalFigure)
def get_historical_figure(figure_id: int, db: Session = Depends(get_db)):
    figure = db.query(models.HistoricalFigure).filter(models.HistoricalFigure.id == figure_id).first()
    if figure is None:
        raise HTTPException(status_code=404, detail="Historical figure not found")
    return figure

@router.post("/", response_model=schemas.HistoricalFigure)
def create_historical_figure(figure: schemas.HistoricalFigureCreate, db: Session = Depends(get_db)):
    # Create figure without images first
    figure_data = figure.dict(exclude={'image_ids'})
    db_figure = models.HistoricalFigure(**figure_data)
    db.add(db_figure)
    db.commit()
    db.refresh(db_figure)

    # Add images
    for image_id in figure.image_ids:
        image = db.query(models.Image).filter(models.Image.id == image_id).first()
        if image:
            db_figure.images.append(image)
    
    db.commit()
    db.refresh(db_figure)
    return db_figure

@router.get("/search/{query}", response_model=List[schemas.HistoricalFigure])
def search_historical_figures(query: str, db: Session = Depends(get_db)):
    figures = db.query(models.HistoricalFigure).filter(
        models.HistoricalFigure.last_name.ilike(f"%{query}%") |
        models.HistoricalFigure.first_name.ilike(f"%{query}%") |
        models.HistoricalFigure.middle_name.ilike(f"%{query}%") |
        models.HistoricalFigure.science_fields.ilike(f"%{query}%")
    ).all()
    return figures 