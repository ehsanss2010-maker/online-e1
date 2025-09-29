import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* درباره ما */}
          <div>
            <h3 className="text-lg font-bold mb-4">Online E</h3>
            <p className="text-gray-300 text-sm">
              سوپرمارکت آنلاین با بهترین قیمت‌ها و سریع‌ترین تحویل
            </p>
          </div>

          {/* دسترسی سریع */}
          <div>
            <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white transition">خانه</Link></li>
              <li><Link to="/products" className="hover:text-white transition">همه محصولات</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">سبد خرید</Link></li>
            </ul>
          </div>

          {/* دسته‌بندی‌ها */}
          <div>
            <h3 className="text-lg font-bold mb-4">دسته‌بندی‌ها</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/products?category=لبنیات" className="hover:text-white transition">لبنیات</Link></li>
              <li><Link to="/products?category=نوشابه" className="hover:text-white transition">نوشیدنی</Link></li>
              <li><Link to="/products?category=شکلات" className="hover:text-white transition">تنقلات</Link></li>
              <li><Link to="/products?category=خشکبار" className="hover:text-white transition">خشکبار</Link></li>
            </ul>
          </div>

          {/* تماس با ما */}
          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
              <p>ایمیل: info@online-e.ir</p>
              <p>آدرس: تهران، خیابان ولیعصر</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© 2024 Online E. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer