import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
    CELERY_RESULT_BACKEND: str = os.getenv("CELERY_RESULT_BACKEND", "redis://redis:6379/0")
    S3_ENDPOINT: str | None = os.getenv("S3_ENDPOINT")
    S3_BUCKET: str | None = os.getenv("S3_BUCKET")
    S3_KEY: str | None = os.getenv("S3_KEY")
    S3_SECRET: str | None = os.getenv("S3_SECRET")
    BING_API_KEY: str | None = os.getenv("BING_API_KEY")
    FILE_UPLOAD_DIR: str = os.getenv("FILE_UPLOAD_DIR", "/tmp/uploads")

    class Config:
        env_file = ".env"

settings = Settings()
