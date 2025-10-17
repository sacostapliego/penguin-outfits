from fastapi import APIRouter, UploadFile, Form
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from db import SessionLocal
from models import Upload
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_file(file: UploadFile, subfolder: str):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"{subfolder}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    return file_path

@router.post("/generate")
async def generate_image(
    user_image: UploadFile,
    shirt_image: UploadFile = None,
    pants_image: UploadFile = None,
):
    db: Session = SessionLocal()

    # Save uploaded files locally
    user_path = save_file(user_image, "user")
    shirt_path = save_file(shirt_image, "shirt") if shirt_image else None
    pants_path = save_file(pants_image, "pants") if pants_image else None

    # Mock generated image (placeholder)
    generated_path = os.path.join(UPLOAD_DIR, "mock_generated_image.png")

    # Store record in DB
    record = Upload(
        user_image_path=user_path,
        shirt_image_path=shirt_path,
        pants_image_path=pants_path,
        generated_image_path=generated_path,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    db.close()

    return JSONResponse(
        {
            "message": "Images uploaded and saved successfully.",
            "generated_image_url": f"http://127.0.0.1:8000/{record.generated_image_path}",
        }
    )
