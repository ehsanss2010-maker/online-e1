from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProductBase(BaseModel):
    category_name: str
    code: str
    serial: str
    name: str
    unit: str
    stock: int = 0
    last_purchase_price: Optional[float] = None
    last_sale_price: Optional[float] = None
    retail_price: Optional[float] = None
    wholesale_price: Optional[float] = None
    special_price: Optional[float] = None
    description: Optional[str] = None
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    is_active: bool
    has_discount: bool
    is_featured: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
