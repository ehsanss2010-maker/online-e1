from sqlmodel import Session, select
from .models import Product
from .schemas import ProductCreate

def get_product_by_serial(session: Session, serial: str):
    return session.exec(select(Product).where(Product.serial == serial)).first()

def create_product(session: Session, p: ProductCreate):
    product = Product(**p.dict())
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

def update_product_from_dict(session: Session, product: Product, d: dict):
    for k, v in d.items():
        if hasattr(product, k) and v is not None:
            setattr(product, k, v)
    session.add(product)
    session.commit()
    session.refresh(product)
    return product
