from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from db import Base, engine
from routes.generate import router as generate_router
from routes.tryon import router as tryon_router
from routes.clothing import router as clothing_router

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Full-Stack AI Closet API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    # Since only for local use, allow all origins
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads folder to serve images
upload_dir = os.getenv("UPLOAD_DIR", "uploads")
os.makedirs(upload_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=upload_dir), name="uploads")

# Include routers
app.include_router(generate_router)
app.include_router(tryon_router)
app.include_router(clothing_router)


@app.get("/")
def root():
    return {"message": "Penguin Outfits API is running!"}