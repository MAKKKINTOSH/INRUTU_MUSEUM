from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import models
from app.schemas import schemas
from app.services.image_service import save_image

router = APIRouter()

@router.get("/categories", response_model=List[schemas.ArtifactCategory])
def get_artifact_categories(db: Session = Depends(get_db)):
    categories = db.query(models.ArtifactCategory).all()
    return categories

@router.post("/categories", response_model=schemas.ArtifactCategory)
def create_artifact_category(category: schemas.ArtifactCategoryCreate, db: Session = Depends(get_db)):
    db_category = models.ArtifactCategory(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.get("/", response_model=List[schemas.Artifact])
def get_artifacts(db: Session = Depends(get_db)):
    artifacts = db.query(models.Artifact).all()
    return artifacts

@router.get("/{artifact_id}", response_model=schemas.Artifact)
def get_artifact(artifact_id: int, db: Session = Depends(get_db)):
    artifact = db.query(models.Artifact).filter(models.Artifact.id == artifact_id).first()
    if artifact is None:
        raise HTTPException(status_code=404, detail="Artifact not found")
    return artifact

@router.post("/", response_model=schemas.Artifact)
async def create_artifact(
    name: str,
    description: str,
    creation_year: int,
    category_id: int,
    hall_id: int,
    images: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    # Create artifact
    db_artifact = models.Artifact(
        name=name,
        description=description,
        creation_year=creation_year,
        category_id=category_id,
        hall_id=hall_id
    )
    db.add(db_artifact)
    db.commit()
    db.refresh(db_artifact)

    # Upload and link images
    for image_file in images:
        if image_file.content_type.startswith('image/'):
            try:
                image_url = await save_image(image_file)
                db_image = models.Image(url=image_url)
                db.add(db_image)
                db.commit()
                db.refresh(db_image)
                db_artifact.images.append(db_image)
            except Exception as e:
                continue
    
    db.commit()
    db.refresh(db_artifact)
    return db_artifact

@router.get("/category/{category_id}", response_model=List[schemas.Artifact])
def get_artifacts_by_category(category_id: int, db: Session = Depends(get_db)):
    artifacts = db.query(models.Artifact).filter(models.Artifact.category_id == category_id).all()
    return artifacts

@router.get("/hall/{hall_id}", response_model=List[schemas.Artifact])
def get_artifacts_by_hall(hall_id: int, db: Session = Depends(get_db)):
    artifacts = db.query(models.Artifact).filter(models.Artifact.hall_id == hall_id).all()
    return artifacts 