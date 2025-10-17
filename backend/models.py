from sqlalchemy import Column, Integer, String, DateTime, func
from db import Base

class Upload(Base):
    __tablename__ = "uploads"

    id = Column(Integer, primary_key=True, index=True)
    user_image_path = Column(String, nullable=False)
    shirt_image_path = Column(String, nullable=True)
    pants_image_path = Column(String, nullable=True)
    generated_image_path = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())