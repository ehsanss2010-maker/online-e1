import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* لوگو */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <span className="text-xl font-bold text-gray-800">Online E</span>
          </Link>

          {/* منوی اصلی */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition">خانه</Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 transition">محصولات</Link>
            <Link to="/products?category=لبنیات" className="text-gray-600 hover:text-blue-600 transition">لبنیات</Link>
            <Link to="/products?category=نوشابه" className="text-gray-600 hover:text-blue-600 transition">نوشیدنی</Link>
            <Link to="/products?category=شکلات" className="text-gray-600 hover:text-blue-600 transition">تنقلات</Link>
          </div>

          {/* جستجو و اقدامات */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="جستجوی محصولات..."
                className="bg-transparent outline-none pr-2 text-sm w-64"
              />
            </div>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -left-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                0
              </span>
            </Link>

            <button className="p-2 text-gray-600 hover:text-blue-600 transition">
              <User size={24} />
            </button>

            <button className="md:hidden p-2 text-gray-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar