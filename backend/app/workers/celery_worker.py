from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "online_e_worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL
)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='Asia/Tehran',
    enable_utc=True,
)

@celery_app.task
def process_excel_async(file_path: str):
    """پردازش فایل اکسل در پس‌زمینه"""
    # این تاسک می‌تواند برای پردازش فایل‌های بزرگ استفاده شود
    pass