import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Filter, Grid, List } from 'lucide-react'

const Products = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const category = searchParams.get('category')

  useEffect(() => {
    // TODO: دریافت محصولات از API
    const mockProducts = [
      {
        id: 1,
        name: 'شیر پرچرب',
        price: 32000,
        originalPrice: 35000,
        image: '/api/placeholder/300/300',
        category: 'لبنیات',
        stock: 50,
        isFeatured: true
      },
      {
        id: 2,
        name: 'نوشابه کوکا',
        price: 12000,
        originalPrice: 15000,
        image: '/api/placeholder/300/300',
        category: 'نوشیدنی',
        stock: 100,
        isFeatured: true
      },
      {
        id: 3,
        name: 'شکلات کیت کت',
        price: 8000,
        originalPrice: 10000,
        image: '/api/placeholder/300/300',
        category: 'تنقلات',
        stock: 200,
        isFeatured: false
      },
      {
        id: 4,
        name: 'پنیر پیتزا',
        price: 45000,
        originalPrice: 50000,
        image: '/api/placeholder/300/300',
        category: 'لبنیات',
        stock: 30,
        isFeatured: true
      },
      {
        id: 5,
        name: 'ماست میوه‌ای',
        price: 18000,
        originalPrice: 20000,
        image: '/api/placeholder/300/300',
        category: 'لبنیات',
        stock: 80,
        isFeatured: false
      },
      {
        id: 6,
        name: 'آب معدنی',
        price: 6000,
        originalPrice: 7000,
        image: '/api/placeholder/300/300',
        category: 'نوشیدنی',
        stock: 150,
        isFeatured: false
      }
    ]

    // فیلتر بر اساس دسته‌بندی
    if (category) {
      const filtered = mockProducts.filter(p => p.category === category)
      setProducts(filtered)
    } else {
      setProducts(mockProducts)
    }
  }, [category])

  const categories = [
    { name: 'همه', count: products.length },
    { name: 'لبنیات', count: products.filter(p => p.category === 'لبنیات').length },
    { name: 'نوشیدنی', count: products.filter(p => p.category === 'نوشیدنی').length },
    { name: 'تنقلات', count: products.filter(p => p.category === 'تنقلات').length }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* هدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {category ? `محصولات ${category}` : 'همه محصولات'}
          </h1>
          <p className="text-gray-600">
            {products.length} محصول یافت شد
          </p>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse mt-4 md:mt-0">
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* سایدبار فیلترها */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center mb-6">
              <Filter size={20} className="ml-2" />
              <h3 className="font-bold text-lg">فیلترها</h3>
            </div>

            {/* دسته‌بندی‌ها */}
            <div className="mb-6">
              <h4 className="font-bold mb-3">دسته‌بندی</h4>
              <div className="space-y-2">
                {categories.map(cat => (
                  <Link
                    key={cat.name}
                    to={cat.name === 'همه' ? '/products' : `/products?category=${cat.name}`}
                    className={`flex justify-between items-center p-2 rounded hover:bg-gray-100 ${
                      (!category && cat.name === 'همه') || category === cat.name ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-sm text-gray-500 bg-gray-200 px-2 rounded-full">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* قیمت */}
            <div>
              <h4 className="font-bold mb-3">محدوده قیمت</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="price" className="ml-2" />
                  زیر ۲۰,۰۰۰ تومان
                </label>
                <label className="flex items-center">
                  <input type="radio" name="price" className="ml-2" />
                  ۲۰,۰۰۰ - ۵۰,۰۰۰ تومان
                </label>
                <label className="flex items-center">
                  <input type="radio" name="price" className="ml-2" />
                  بالای ۵۰,۰۰۰ تومان
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* لیست محصولات */}
        <div className="md:w-3/4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map(product => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ProductCard = ({ product }) => (
  <div className="product-card bg-white rounded-lg shadow-md overflow-hidden">
    <Link to={`/product/${product.id}`}>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            تخفیف
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
            ویژه
          </div>
        )}
      </div>
    </Link>

    <div className="p-4">
      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
        {product.category}
      </span>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-bold text-lg mt-2 mb-1 hover:text-blue-600">{product.name}</h3>
      </Link>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="text-green-600 font-bold">
            {product.price.toLocaleString()} تومان
          </span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-sm line-through">
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
          افزودن به سبد
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        موجودی: {product.stock} عدد
      </div>
    </div>
  </div>
)

const ProductRow = ({ product }) => (
  <div className="product-card bg-white rounded-lg shadow-md p-4 flex items-center">
    <Link to={`/product/${product.id}`} className="flex-shrink-0">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />
    </Link>

    <div className="flex-1 mr-4">
      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
        {product.category}
      </span>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-bold text-lg mt-1 mb-2 hover:text-blue-600">{product.name}</h3>
      </Link>
      <p className="text-gray-600 text-sm mb-2">موجودی: {product.stock} عدد</p>

      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="text-green-600 font-bold text-lg">
            {product.price.toLocaleString()} تومان
          </span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-sm line-through">
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          افزودن به سبد
        </button>
      </div>
    </div>
  </div>
)

export default Products