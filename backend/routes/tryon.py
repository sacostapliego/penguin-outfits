import os
from fastapi import APIRouter, UploadFile, File, HTTPException, Form, Depends
from typing import Optional
import base64
import logging
from datetime import datetime
from sqlalchemy.orm import Session
from PIL import Image
import io
import rembg

from db import SessionLocal
from models.models import Upload, ClothingItem

logger = logging.getLogger(__name__)

HF_T2I_MODEL = os.getenv("HF_TEXT2IMG_MODEL")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")


# Rename to a consistent exported name
router = APIRouter(prefix="/api", tags=["tryon"])

# --- Database Dependency ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Helper Functions ---
async def save_upload_file(file: UploadFile, subfolder: str) -> Optional[str]:
    """Saves an uploaded file, converting it to PNG format."""
    if not file or not file.filename:
        return None
    
    content = await file.read()
    await file.seek(0)

    try:
        img = Image.open(io.BytesIO(content))
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        output_bytes = io.BytesIO()
        img.save(output_bytes, format='PNG')
        png_content = output_bytes.getvalue()
    except Exception as e:
        logger.error(f"Failed to convert image to PNG: {e}")
        raise HTTPException(status_code=400, detail="Invalid image file provided.")

    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    base_filename, _ = os.path.splitext(file.filename)
    filename = f"{subfolder}_{timestamp}_{base_filename}.png"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    with open(file_path, "wb") as f:
        f.write(png_content)
    return file_path

def save_generated_file(image_bytes: bytes) -> str:
    """Saves generated image bytes to a timestamped path and returns the path."""
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"generated_{timestamp}.png"
    file_path = os.path.join(UPLOAD_DIR, filename)

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    with open(file_path, "wb") as f:
        f.write(image_bytes)
    return file_path

# --- API Endpoints ---

@router.post("/tryon/ai")
async def generate_tryon_image_ai(
    user_image: UploadFile = File(...),
    shirt_item_id: Optional[int] = Form(None),
    pants_item_id: Optional[int] = Form(None),
    provider: str = Form("auto"),
    prompt: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Generates a virtual try-on image using AI by referencing clothing item IDs.
    """
    try:
        p = provider.lower()
        image_bytes: Optional[bytes] = None
        last_error: Optional[str] = None

        # 1. Get clothing item paths from DB
        shirt_path = db.query(ClothingItem.image_path).filter(ClothingItem.id == shirt_item_id).scalar() if shirt_item_id else None
        pants_path = db.query(ClothingItem.image_path).filter(ClothingItem.id == pants_item_id).scalar() if pants_item_id else None

        # 2. Read file bytes from paths
        shirt_bytes: Optional[bytes] = None
        if shirt_path and os.path.exists(shirt_path):
            with open(shirt_path, "rb") as f:
                shirt_bytes = f.read()
        
        pants_bytes: Optional[bytes] = None
        if pants_path and os.path.exists(pants_path):
            with open(pants_path, "rb") as f:
                pants_bytes = f.read()

        # 3. Try Gemini first if a user image is available
        if user_image and p in ("auto", "gemini"):
            logger.info("Attempting Gemini virtual try-on...")
            try:
                from services.gemini_service import generate_virtual_tryon
                
                user_bytes = await user_image.read()
                await user_image.seek(0) # Reset pointer

                generated_bytes = generate_virtual_tryon(
                    user_image_bytes=user_bytes,
                    shirt_image_bytes=shirt_bytes,
                    pants_image_bytes=pants_bytes,
                )
                
                # Add background removal step
                logger.info("Removing background from generated image...")
                input_image = Image.open(io.BytesIO(generated_bytes))
                output_image = rembg.remove(input_image)
                
                output_buffer = io.BytesIO()
                output_image.save(output_buffer, format="PNG")
                image_bytes = output_buffer.getvalue()
                
                
            except Exception as e:
                last_error = str(e)
                logger.warning(f"Gemini failed: {last_error}")
                if p == "gemini":
                    raise HTTPException(status_code=400, detail=last_error)

        # 4. Fallback to Hugging Face (text-to-image only)
        if image_bytes is None:
            fallback_prompt = prompt
            if not fallback_prompt:
                items = []
                if shirt_path: items.append("a shirt")
                if pants_path: items.append("pants")
                items_text = " and ".join(items) if items else "stylish clothes"
                fallback_prompt = f"Photorealistic full-body person wearing {items_text}, neutral studio background, 4k."

            logger.info(f"Falling back to Hugging Face text-to-image. Prompt='{fallback_prompt[:100]}...'")
            try:
                from services.huggingface_service import generate_image_bytes_with_hf
                image_bytes = generate_image_bytes_with_hf(fallback_prompt, model=HF_T2I_MODEL)
            except Exception as e:
                hf_error = f"Hugging Face failed: {e}"
                logger.warning(hf_error)
                last_error = f"{(last_error + '; ') if last_error else ''}{hf_error}"
                
        # 5. Final check and save
        if image_bytes is None:
            raise HTTPException(status_code=400, detail=last_error or "AI generation failed on all providers.")

        user_path = await save_upload_file(user_image, "user")
        generated_path = save_generated_file(image_bytes)
        
        db_upload = Upload(
            user_image_path=user_path,
            shirt_item_id=shirt_item_id,
            pants_item_id=pants_item_id,
            generated_image_path=generated_path,
        )
        db.add(db_upload)
        db.commit()
        db.refresh(db_upload)

        data_url = "data:image/png;base64," + base64.b64encode(image_bytes).decode("utf-8")
        return {"success": True, "image_data_url": data_url, "upload_id": db_upload.id}

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("AI try-on endpoint failed unexpectedly.")
        raise HTTPException(status_code=500, detail=str(exc))