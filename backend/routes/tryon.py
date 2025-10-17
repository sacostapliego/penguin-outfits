import os
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import Optional
from PIL import Image
import io
import base64
import logging
logger = logging.getLogger(__name__)

HF_T2I_MODEL = os.getenv("HF_TEXT2IMG_MODEL")

# Rename to a consistent exported name
router = APIRouter(prefix="/api", tags=["tryon"])

# --- Helper Functions ---
async def uploadfile_to_base64(file: Optional[UploadFile]) -> Optional[str]:
    """Reads UploadFile and converts its contents to a base64 string."""
    if file is None:
        return None
    file_bytes = await file.read()
    # Ensure the image is read correctly to determine the MIME type
    try:
        Image.open(io.BytesIO(file_bytes))
    except Exception as e:
        logger.error(f"Failed to open image file for conversion: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid image file uploaded: {file.filename}")
        
    return base64.b64encode(file_bytes).decode('utf-8')

# --- API Endpoints ---

# AI Virtual Try-On Endpoint, using Gemini and Hugging Face
@router.post("/tryon/ai")
async def generate_tryon_image_ai(
    user_image: Optional[UploadFile] = File(None),
    shirt_image: Optional[UploadFile] = File(None),
    pants_image: Optional[UploadFile] = File(None),
    provider: str = Form("auto"),
    prompt: Optional[str] = Form(None),
):
    """
    Generates a virtual try-on image using AI.
    - Primary: Gemini (if user image is provided).
    - Fallback: Hugging Face (text-to-image).
    """
    try:
        p = provider.lower()
        image_bytes: Optional[bytes] = None
        last_error: Optional[str] = None

        # 1) Try Gemini first if a user image is available
        if user_image and p in ("auto", "gemini"):
            logger.info("Attempting Gemini virtual try-on...")
            try:
                # Import the new, correct function
                from services.gemini_service import generate_virtual_tryon
                
                # Read all image bytes
                user_bytes = await user_image.read()
                shirt_bytes = await shirt_image.read() if shirt_image else None
                pants_bytes = await pants_image.read() if pants_image else None

                image_bytes = generate_virtual_tryon(
                    user_image_bytes=user_bytes,
                    shirt_image_bytes=shirt_bytes,
                    pants_image_bytes=pants_bytes
                )
            except Exception as e:
                last_error = str(e)
                logger.warning(f"Gemini failed: {last_error}")
                if p == "gemini": # If user explicitly asked for Gemini, fail here
                    raise HTTPException(status_code=400, detail=last_error)

        # 2) Fallback to Hugging Face (text-to-image only)
        if image_bytes is None:
            fallback_prompt = prompt
            if not fallback_prompt:
                items = []
                if shirt_image: items.append("a shirt")
                if pants_image: items.append("pants")
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
                
        # 3) Final check
        if image_bytes is None:
            raise HTTPException(status_code=400, detail=last_error or "AI generation failed on all providers.")

        data_url = "data:image/png;base64," + base64.b64encode(image_bytes).decode("utf-8")
        return {"success": True, "image_data_url": data_url}

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("AI try-on endpoint failed unexpectedly.")
        raise HTTPException(status_code=500, detail=str(exc))