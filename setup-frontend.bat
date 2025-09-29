@echo off
chcp 65001
echo 🚀 راه اندازی Frontend پروژه Online E...

cd frontend-customer

echo 📦 در حال نصب dependencies...
call npm install

echo.
echo ✅ Frontend با موفقیت راه اندازی شد!
echo.
echo 🎯 دستورات اجرا:
echo    cd frontend-customer
echo    npm run dev
echo.
echo 🌐 پس از اجرا به آدرس برید: http://localhost:3000
echo.

pause