from fastapi import APIRouter, UploadFile, File, BackgroundTasks, Depends, HTTPException
import os
from ..core import settings
from ..utils.excel_import import parse_excel
from ..tasks import import_excel_task
from sqlmodel import Session, create_engine, SQLModel

router = APIRouter(prefix="/api/products", tags=["products"])

DATABASE_URL = settings.DATABASE_URL
engine = create_engine(DATABASE_URL, echo=False)

def get_session():
    with Session(engine) as session:
        yield session

@router.post("/upload-excel", response_model=dict)
async def upload_excel(file: UploadFile = File(...)):
    os.makedirs(settings.FILE_UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(settings.FILE_UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    # delegate to celery task
    import_excel_task.delay(file_path)
    return {"status": "queued", "file": file.filename}
