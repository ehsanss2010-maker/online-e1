import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Online E Supermarket"
    PROJECT_VERSION: str = "1.0.0"

    # استفاده از SQLite برای توسعه
    DATABASE_URL: str = "sqlite:///./online_e.db"

    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30

    REDIS_URL: str = "memory://"

settings = Settings()
