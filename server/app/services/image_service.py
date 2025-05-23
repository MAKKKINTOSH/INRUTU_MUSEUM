import os
from fastapi import UploadFile
from PIL import Image
import uuid
from datetime import datetime

UPLOAD_DIR = "static/images"

def ensure_upload_dir():
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

async def save_image(file: UploadFile) -> str:
    ensure_upload_dir()
    
    # Generate unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_id = str(uuid.uuid4())[:8]
    file_extension = os.path.splitext(file.filename)[1]
    filename = f"{timestamp}_{unique_id}{file_extension}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    # Save and optimize image
    image = Image.open(file.file)
    image.save(filepath, optimize=True, quality=85)
    
    # Return relative URL for database storage
    return f"/static/images/{filename}"

async def delete_image(image_url: str):
    if image_url.startswith("/static/images/"):
        filepath = os.path.join(UPLOAD_DIR, os.path.basename(image_url))
        if os.path.exists(filepath):
            os.remove(filepath) 