from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class ProductImage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: Optional[int] = Field(default=None, foreign_key="product.id")
    url: str
    source: Optional[str] = None

    # relationship set on Product side (see below)

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    serial: str = Field(index=True, unique=True)
    code: Optional[str] = None
    title: Optional[str] = None
    category: Optional[str] = None
    unit: Optional[str] = None
    stock: Optional[int] = 0
    last_purchase_price: Optional[float] = None
    last_sale_price: Optional[float] = None
    retail_price: Optional[float] = None
    wholesale_price: Optional[float] = None
    tax_flag: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    images: List[ProductImage] = Relationship(back_populates="product")

ProductImage.product = Relationship(back_populates="images")
