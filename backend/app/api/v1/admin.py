from fastapi import APIRouter, Request, Depends, UploadFile, File, Form, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.product import Product, Category
from app.services.excel_processor import ExcelProcessor
import os
import tempfile
from typing import Optional

router = APIRouter()


# پنل مدیریت - داشبورد
@router.get("/", response_class=HTMLResponse)
async def admin_dashboard(request: Request, db: Session = Depends(get_db)):
    try:
        products = db.query(Product).all()
        categories = db.query(Category).all()

        total_products = len(products)
        total_categories = len(categories)
        low_stock_products = len([p for p in products if p.stock < 10])

        # آمار محصولات پرتکرار
        from collections import Counter
        category_counts = Counter(p.category_name for p in products)
        top_category = category_counts.most_common(1)[0] if category_counts else ("هیچ", 0)

        return {
            "request": request,
            "total_products": total_products,
            "total_categories": total_categories,
            "low_stock_products": low_stock_products,
            "top_category": top_category,
            "products": products[:5]  # 5 محصول آخر
        }
    except Exception as e:
        return {
            "request": request,
            "error": str(e),
            "total_products": 0,
            "total_categories": 0,
            "low_stock_products": 0,
            "top_category": ("هیچ", 0),
            "products": []
        }


# صفحه مدیریت محصولات
@router.get("/products", response_class=HTMLResponse)
async def admin_products(
        request: Request,
        db: Session = Depends(get_db),
        category: Optional[str] = None,
        search: Optional[str] = None
):
    try:
        query = db.query(Product)

        # فیلتر بر اساس دسته‌بندی
        if category:
            query = query.filter(Product.category_name == category)

        # جستجو
        if search:
            query = query.filter(
                Product.name.ilike(f"%{search}%") |
                Product.code.ilike(f"%{search}%") |
                Product.serial.ilike(f"%{search}%")
            )

        products = query.order_by(Product.created_at.desc()).all()
        categories = db.query(Category).all()

        return {
            "request": request,
            "products": products,
            "categories": categories,
            "current_category": category,
            "search_query": search
        }
    except Exception as e:
        return {
            "request": request,
            "products": [],
            "categories": [],
            "current_category": category,
            "search_query": search,
            "error": str(e)
        }


# صفحه آپلود اکسل
@router.get("/upload", response_class=HTMLResponse)
async def admin_upload_page(request: Request):
    return {"request": request}


# پردازش آپلود فایل اکسل
@router.post("/upload-excel")
async def admin_upload_excel(
        request: Request,
        file: UploadFile = File(...),
        db: Session = Depends(get_db)
):
    try:
        if not file.filename.endswith(('.xlsx', '.xls')):
            return {
                "request": request,
                "success": False,
                "error": "فایل باید از نوع اکسل باشد (xlsx یا xls)"
            }

        # ایجاد فایل موقت
        file_extension = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name

        # پردازش فایل
        processor = ExcelProcessor(db)
        result = processor.process_excel_file(temp_file_path)

        # حذف فایل موقت
        os.unlink(temp_file_path)

        return {
            "request": request,
            "success": result["success"],
            "created": result.get("created", 0),
            "updated": result.get("updated", 0),
            "errors": result.get("errors", 0),
            "total": result.get("total", 0),
            "error": result.get("error")
        }

    except Exception as e:
        return {
            "request": request,
            "success": False,
            "error": f"خطا در پردازش فایل: {str(e)}"
        }


# حذف محصول
@router.post("/products/delete/{product_id}")
async def delete_product(
        product_id: int,
        request: Request,
        db: Session = Depends(get_db)
):
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return {
                "request": request,
                "success": False,
                "error": "محصول یافت نشد"
            }

        db.delete(product)
        db.commit()

        return {
            "request": request,
            "success": True,
            "message": "محصول با موفقیت حذف شد"
        }

    except Exception as e:
        db.rollback()
        return {
            "request": request,
            "success": False,
            "error": f"خطا در حذف محصول: {str(e)}"
        }


# ویرایش محصول
@router.get("/products/edit/{product_id}", response_class=HTMLResponse)
async def edit_product_page(
        product_id: int,
        request: Request,
        db: Session = Depends(get_db)
):
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        categories = db.query(Category).all()

        if not product:
            return {
                "request": request,
                "error": "محصول یافت نشد"
            }

        return {
            "request": request,
            "product": product,
            "categories": categories
        }

    except Exception as e:
        return {
            "request": request,
            "error": str(e)
        }


@router.post("/products/update/{product_id}")
async def update_product(
        product_id: int,
        request: Request,
        name: str = Form(...),
        category_name: str = Form(...),
        code: str = Form(...),
        serial: str = Form(...),
        unit: str = Form(...),
        stock: int = Form(...),
        retail_price: float = Form(...),
        wholesale_price: float = Form(...),
        db: Session = Depends(get_db)
):
    try:
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            return {
                "request": request,
                "success": False,
                "error": "محصول یافت نشد"
            }

        # بررسی تکراری نبودن کد و سریال
        existing_code = db.query(Product).filter(
            Product.code == code,
            Product.id != product_id
        ).first()
        if existing_code:
            return {
                "request": request,
                "success": False,
                "error": "کد کالا تکراری است"
            }

        existing_serial = db.query(Product).filter(
            Product.serial == serial,
            Product.id != product_id
        ).first()
        if existing_serial:
            return {
                "request": request,
                "success": False,
                "error": "سریال کالا تکراری است"
            }

        # آپدیت محصول
        product.name = name
        product.category_name = category_name
        product.code = code
        product.serial = serial
        product.unit = unit
        product.stock = stock
        product.retail_price = retail_price
        product.wholesale_price = wholesale_price

        db.commit()

        return {
            "request": request,
            "success": True,
            "message": "محصول با موفقیت ویرایش شد"
        }

    except Exception as e:
        db.rollback()
        return {
            "request": request,
            "success": False,
            "error": f"خطا در ویرایش محصول: {str(e)}"
        }


# ایجاد محصول جدید
@router.get("/products/create", response_class=HTMLResponse)
async def create_product_page(request: Request, db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return {
        "request": request,
        "categories": categories
    }


@router.post("/products/create")
async def create_product(
        request: Request,
        name: str = Form(...),
        category_name: str = Form(...),
        code: str = Form(...),
        serial: str = Form(...),
        unit: str = Form(...),
        stock: int = Form(0),
        retail_price: float = Form(...),
        wholesale_price: float = Form(...),
        db: Session = Depends(get_db)
):
    try:
        # بررسی تکراری نبودن کد و سریال
        existing_code = db.query(Product).filter(Product.code == code).first()
        if existing_code:
            return {
                "request": request,
                "success": False,
                "error": "کد کالا تکراری است"
            }

        existing_serial = db.query(Product).filter(Product.serial == serial).first()
        if existing_serial:
            return {
                "request": request,
                "success": False,
                "error": "سریال کالا تکراری است"
            }

        # ایجاد محصول جدید
        new_product = Product(
            name=name,
            category_name=category_name,
            code=code,
            serial=serial,
            unit=unit,
            stock=stock,
            retail_price=retail_price,
            wholesale_price=wholesale_price
        )

        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        return {
            "request": request,
            "success": True,
            "message": "محصول جدید با موفقیت ایجاد شد",
            "product_id": new_product.id
        }

    except Exception as e:
        db.rollback()
        return {
            "request": request,
            "success": False,
            "error": f"خطا در ایجاد محصول: {str(e)}"
        }


# مدیریت دسته‌بندی‌ها
@router.get("/categories", response_class=HTMLResponse)
async def admin_categories(request: Request, db: Session = Depends(get_db)):
    categories = db.query(Category).all()
    return {
        "request": request,
        "categories": categories
    }


@router.post("/categories/create")
async def create_category(
        request: Request,
        name: str = Form(...),
        description: str = Form(None),
        db: Session = Depends(get_db)
):
    try:
        # بررسی تکراری نبودن نام دسته‌بندی
        existing_category = db.query(Category).filter(Category.name == name).first()
        if existing_category:
            return {
                "request": request,
                "success": False,
                "error": "نام دسته‌بندی تکراری است"
            }

        new_category = Category(
            name=name,
            description=description
        )

        db.add(new_category)
        db.commit()

        return {
            "request": request,
            "success": True,
            "message": "دسته‌بندی جدید با موفقیت ایجاد شد"
        }

    except Exception as e:
        db.rollback()
        return {
            "request": request,
            "success": False,
            "error": f"خطا در ایجاد دسته‌بندی: {str(e)}"
        }


# گزارش‌ها
@router.get("/reports", response_class=HTMLResponse)
async def admin_reports(request: Request, db: Session = Depends(get_db)):
    try:
        products = db.query(Product).all()

        # آمار پایه
        total_products = len(products)
        total_categories = len(set(p.category_name for p in products))
        out_of_stock = len([p for p in products if p.stock == 0])
        low_stock = len([p for p in products if 0 < p.stock < 10])

        # آمار قیمت
        if products:
            avg_price = sum(p.retail_price or 0 for p in products) / len(products)
            max_price = max(p.retail_price or 0 for p in products)
            min_price = min(p.retail_price or 0 for p in products if p.retail_price)
        else:
            avg_price = max_price = min_price = 0

        return {
            "request": request,
            "total_products": total_products,
            "total_categories": total_categories,
            "out_of_stock": out_of_stock,
            "low_stock": low_stock,
            "avg_price": round(avg_price, 2),
            "max_price": max_price,
            "min_price": min_price,
            "products": products
        }

    except Exception as e:
        return {
            "request": request,
            "error": str(e)
        }