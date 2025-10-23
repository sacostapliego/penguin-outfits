import enum
from sqlalchemy import Column, Integer, String, DateTime, func, Enum, ForeignKey
from db import Base

# Define models, only shirts and pants for now...
class ItemType(enum.Enum):
    shirt = "shirt"
    pants = "pants"

# Clothing item model
class ClothingItem(Base):
    __tablename__ = "clothing_items"

    id = Column(Integer, primary_key=True, index=True)
    item_type = Column(Enum(ItemType), nullable=False)
    image_path = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# Upload model to track user uploads and generated images
class Upload(Base):
    __tablename__ = "uploads"

    id = Column(Integer, primary_key=True, index=True)
    user_image_path = Column(String, nullable=False)
    # Store Foreign Keys to the clothing items table
    shirt_item_id = Column(Integer, ForeignKey("clothing_items.id"), nullable=True)
    pants_item_id = Column(Integer, ForeignKey("clothing_items.id"), nullable=True)
    generated_image_path = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())