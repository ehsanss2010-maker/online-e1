from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.models.database import engine, Base
from app.api.v1 import users, products, upload, admin

# ایجاد جداول دیتابیس
try:
    Base.metadata.create_all(bind=engine)
    print("✅ دیتابیس با موفقیت ساخته شد")
except Exception as e:
    print(f"❌ خطا در ساخت دیتابیس: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# پیکربندی templates
templates = Jinja2Templates(directory="app/templates")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# شامل کردن روترها
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(products.router, prefix="/api/v1/products", tags=["products"])
app.include_router(upload.router, prefix="/api/v1/upload", tags=["upload"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Online E Supermarket API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    print("🚀 شروع سرور FastAPI...")
    print("📚 Documentation: http://127.0.0.1:8000/docs")
    print("👨‍💼 پنل مدیریت: http://127.0.0.1:8000/admin/")
    print("🛒 فروشگاه: http://127.0.0.1:8000/store/")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")