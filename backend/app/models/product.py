from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.models.database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    # مطابق با فایل اکسل شما
    category_name = Column(String, index=True)  # B=گروه کالا
    code = Column(String, unique=True, index=True)  # C=کد
    serial = Column(String, unique=True, index=True)  # D=سریال
    name = Column(String, index=True, nullable=False)  # E=نام کالا
    unit = Column(String)  # G=واحد کالا
    stock = Column(Integer, default=0)  # R=موجودی
    last_purchase_price = Column(Float)  # Aa=آخرين قيمت خريد
    last_sale_price = Column(Float)  # Ab=آخرين قيمت فروش
    retail_price = Column(Float)  # Aq=قيمت خرده
    wholesale_price = Column(Float)  # Ar=قيمت جمله
    special_price = Column(Float)  # At=قيمت خاص

    # فیلدهای اضافی
    description = Column(Text)
    image_url = Column(String)
    is_active = Column(Boolean, default=True)
    has_discount = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
