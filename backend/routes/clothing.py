import os
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from db import SessionLocal
from models.models import ClothingItem, ItemType
from .tryon import save_upload_file

router = APIRouter(prefix="/api/clothing", tags=["Clothing"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upload", response_model=dict)
async def upload_clothing_item(
    item_type: ItemType,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Uploads a single clothing item (shirt or pants) and saves it."""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    # Use the save helper from tryon route, specifying item type as subfolder
    saved_path = await save_upload_file(file, item_type.value)

    db_item = ClothingItem(item_type=item_type, image_path=saved_path)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    # Return a serializable model
    return {
        "id": db_item.id,
        "item_type": db_item.item_type.value,
        "image_path": db_item.image_path,
        "created_at": db_item.created_at.isoformat()
    }


@router.get("/", response_model=List[dict])
def get_all_clothing_items(db: Session = Depends(get_db)):
    """Returns a list of all uploaded clothing items."""
    items = db.query(ClothingItem).order_by(ClothingItem.created_at.desc()).all()
    # Manually construct dicts to handle Enum and DateTime
    return [
        {
            "id": item.id,
            "item_type": item.item_type.value,
            "image_path": item.image_path,
            "created_at": item.created_at.isoformat()
        }
        for item in items
    ]
    
@router.get("/history", response_model=List[dict])
def get_generation_history(db: Session = Depends(get_db)):
    """Returns a list of previously generated full-shot outfits."""
    # Import the Upload model locally to avoid circular dependency issues if you split files later
    from models.models import Upload
    
    history = db.query(Upload).filter(Upload.generated_image_path.isnot(None)).order_by(Upload.created_at.desc()).all()
    
    return [
        {
            "id": upload.id,
            "image_path": upload.generated_image_path,
            "created_at": upload.created_at.isoformat()
        }
        for upload in history
    ]