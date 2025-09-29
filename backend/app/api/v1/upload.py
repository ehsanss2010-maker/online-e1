from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.services.excel_processor import ExcelProcessor
import os
import tempfile

router = APIRouter()


@router.post("/excel")
async def upload_excel_file(
        file: UploadFile = File(...),
        db: Session = Depends(get_db)
):
    """آپلود فایل اکسل و پردازش آن"""

    # بررسی نوع فایل
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="فایل باید از نوع اکسل باشد")

    try:
        # ایجاد فایل موقت
        file_extension = os.path.splitext(file.filename)[1]
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=file_extension)

        # ذخیره فایل آپلود شده
        content = await file.read()
        temp_file.write(content)
        temp_file.close()

        # پردازش فایل اکسل
        processor = ExcelProcessor(db)
        result = processor.process_excel_file(temp_file.name)

        # حذف فایل موقت
        os.unlink(temp_file.name)

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"خطا در پردازش فایل: {str(e)}")


@router.get("/test")
def test_upload():
    """تست endpoint آپلود"""
    return {"message": "آپلود endpoint کار می‌کند"}