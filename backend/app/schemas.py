from pydantic import BaseModel
from typing import Optional, List

class ProductCreate(BaseModel):
    serial: str
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

class ImportReport(BaseModel):
    created: int
    updated: int
    errors: int
    details: Optional[list] = []
