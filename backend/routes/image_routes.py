from fastapi import APIRouter, UploadFile, Form
from services.gemini_service import generate_image_with_gemini
from services.huggingface_service import generate_image_with_hf
import os

router = APIRouter(prefix="/api/images", tags=["Images"])

@router.post("/generate")
async def generate_image(
    prompt: str = Form(...),
    model: str = Form("gemini")  # "gemini" or "huggingface"
):
    try:
        output_path = f"generated_{model}.png"

        if model == "gemini":
            path = generate_image_with_gemini(prompt, output_path)
        else:
            path = generate_image_with_hf(prompt, output_path)

        return {"success": True, "image_path": path}
    except Exception as e:
        return {"success": False, "error": str(e)}
