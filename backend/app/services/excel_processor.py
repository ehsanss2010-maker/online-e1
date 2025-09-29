import pandas as pd
from sqlalchemy.orm import Session
from app.models.product import Product
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)


class ExcelProcessor:
    def __init__(self, db: Session):
        self.db = db

    def process_excel_file(self, file_path: str) -> Dict:
        """پردازش فایل اکسل و ایجاد/آپدیت محصولات"""
        try:
            # خواندن فایل اکسل
            df = pd.read_excel(file_path)
            logger.info(f"فایل اکسل خوانده شد. تعداد سطرها: {len(df)}")

            # نگاشت ستون‌ها به فیلدهای محصول
            created_count = 0
            updated_count = 0
            error_count = 0

            for index, row in df.iterrows():
                try:
                    result = self._process_row(row)
                    if result == "created":
                        created_count += 1
                    elif result == "updated":
                        updated_count += 1
                except Exception as e:
                    logger.error(f"خطا در پردازش سطر {index}: {e}")
                    error_count += 1

            return {
                "success": True,
                "created": created_count,
                "updated": updated_count,
                "errors": error_count,
                "total": len(df)
            }

        except Exception as e:
            logger.error(f"خطا در پردازش فایل اکسل: {e}")
            return {
                "success": False,
                "error": str(e)
            }

    def _process_row(self, row) -> str:
        """پردازش یک سطر از اکسل"""
        # استخراج داده‌ها از سطر (مطابق با ساختار اکسل شما)
        serial = str(row.iloc[3]) if pd.notna(row.iloc[3]) else None  # D=سریال
        code = str(row.iloc[2]) if pd.notna(row.iloc[2]) else None  # C=کد

        if not serial and not code:
            raise ValueError("سریال یا کد کالا ضروری است")

        # بررسی وجود محصول
        product = None
        if serial:
            product = self.db.query(Product).filter(Product.serial == serial).first()
        if not product and code:
            product = self.db.query(Product).filter(Product.code == code).first()

        # آماده‌سازی داده‌ها
        product_data = {
            "category_name": str(row.iloc[1]) if pd.notna(row.iloc[1]) else "دسته‌بندی نشده",  # B=گروه کالا
            "code": code,
            "serial": serial,
            "name": str(row.iloc[4]) if pd.notna(row.iloc[4]) else "بدون نام",  # E=نام کالا
            "unit": str(row.iloc[6]) if pd.notna(row.iloc[6]) else "عدد",  # G=واحد کالا
            "stock": int(row.iloc[17]) if pd.notna(row.iloc[17]) else 0,  # R=موجودی
            "last_purchase_price": float(row.iloc[26]) if pd.notna(row.iloc[26]) else None,  # Aa=قیمت خرید
            "last_sale_price": float(row.iloc[27]) if pd.notna(row.iloc[27]) else None,  # Ab=قیمت فروش
            "retail_price": float(row.iloc[42]) if pd.notna(row.iloc[42]) else None,  # Aq=قیمت خرده
            "wholesale_price": float(row.iloc[43]) if pd.notna(row.iloc[43]) else None,  # Ar=قیمت جمله
            "special_price": float(row.iloc[45]) if pd.notna(row.iloc[45]) else None,  # At=قیمت خاص
        }

        if product:
            # آپدیت محصول موجود
            for key, value in product_data.items():
                setattr(product, key, value)
            self.db.commit()
            return "updated"
        else:
            # ایجاد محصول جدید
            new_product = Product(**product_data)
            self.db.add(new_product)
            self.db.commit()
            self.db.refresh(new_product)
            return "created"