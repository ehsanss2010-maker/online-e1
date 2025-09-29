from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.product import Product
from typing import List

router = APIRouter()

@router.get("/")
def get_products():
    return {"message": "Products endpoint - to be implemented"}

@router.get("/all")
def get_all_products(db: Session = Depends(get_db)):
    """دریافت تمام محصولات"""
    products = db.query(Product).all()
    return {
        "total": len(products),
        "products": [
            {
                "id": p.id,
                "name": p.name,
                "code": p.code,
                "serial": p.serial,
                "stock": p.stock,
                "retail_price": p.retail_price
            }
            for p in products
        ]
    }