from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models import models
from app.schemas import schemas
from app.services.image_service import save_image

router = APIRouter()

@router.post("/upload", response_model=schemas.Image)
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Save image and get URL
        image_url = await save_image(file)
        
        # Create image record in database
        db_image = models.Image(url=image_url)
        db.add(db_image)
        db.commit()
        db.refresh(db_image)
        
        return db_image
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload-multiple", response_model=List[schemas.Image])
async def upload_multiple_images(
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    uploaded_images = []
    
    for file in files:
        if not file.content_type.startswith('image/'):
            continue
        
        try:
            # Save image and get URL
            image_url = await save_image(file)
            
            # Create image record in database
            db_image = models.Image(url=image_url)
            db.add(db_image)
            db.commit()
            db.refresh(db_image)
            
            uploaded_images.append(db_image)
        except Exception as e:
            continue
    
    return uploaded_images 