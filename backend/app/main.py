from fastapi import FastAPI
from .api import products
from .core import settings
from sqlmodel import create_engine, SQLModel
from .models import Product, ProductImage

app = FastAPI(title="Online-e API (FastAPI)")

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL, echo=False)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(products.router)
