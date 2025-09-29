import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Share2, Star, Truck, Shield } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)

  // TODO: دریافت اطلاعات محصول از API
  const product = {
    id: 1,
    name: 'شیر پرچرب',
    description: 'شیر پرچرب تازه با کیفیت عالی، مناسب برای مصرف روزانه خانواده',
    price: 32000,
    originalPrice: 35000,
    image: '/api/placeholder/400/400',
    category: 'لبنیات',
    stock: 50,
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    features: [
      'تازه و با کیفیت',
      'مناسب برای تمام سنین',
      'فاقد مواد نگهدارنده'
    ],
    rating: 4.5,
    reviews: 128
  }

  const relatedProducts = [
    {
      id: 2,
      name: 'ماست میوه‌ای',
      price: 18000,
      image: '/api/placeholder/200/200',
      category: 'لبنیات'
    },
    {
      id: 3,
      name: 'پنیر پیتزا',
      price: 45000,
      image: '/api/placeholder/200/200',
      category: 'لبنیات'
    }
  ]

  const handleAddToCart = () => {
    // TODO: افزودن به سبد خرید
    console.log(`افزودن ${quantity} عدد ${product.name} به سبد خرید`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* گالری تصاویر */}
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-4 space-x-reverse">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-gray-200 hover:border-blue-500"
                />
              ))}
            </div>
          </div>

          {/* اطلاعات محصول */}
          <div className="md:w-1/2 p-8 border-r border-gray-200">
            <div className="mb-4">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center ml-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} نظر)</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-bold mb-2">ویژگی‌ها:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* قیمت و اقدامات */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="text-2xl font-bold text-green-600">
                    {product.price.toLocaleString()} تومان
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <ShoppingCart size={20} className="ml-2" />
                  افزودن به سبد خرید
                </button>

                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart size={20} className="text-gray-600" />
                </button>

                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="text-sm text-gray-500">
                موجودی: {product.stock} عدد
              </div>
            </div>
          </div>
        </div>

        {/* اطلاعات اضافی */}
        <div className="border-t border-gray-200">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <Truck size={24} className="text-blue-600 ml-3" />
                <div>
                  <div className="font-bold">تحویل سریع</div>
                  <div className="text-sm text-gray-600">تحویل در کمتر از ۲ ساعت</div>
                </div>
              </div>
              <div className="flex items-center">
                <Shield size={24} className="text-green-600 ml-3" />
                <div>
                  <div className="font-bold">ضمانت بازگشت</div>
                  <div className="text-sm text-gray-600">۷ روز ضمانت بازگشت کالا</div>
                </div>
              </div>
              <div className="flex items-center">
                <Star size={24} className="text-yellow-600 ml-3" />
                <div>
                  <div className="font-bold">کیفیت عالی</div>
                  <div className="text-sm text-gray-600">تضمین بهترین کیفیت</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* محصولات مرتبط */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map(relatedProduct => (
            <div key={relatedProduct.id} className="product-card bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/product/${relatedProduct.id}`}>
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
              </Link>

              <div className="p-4">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {relatedProduct.category}
                </span>
                <Link to={`/product/${relatedProduct.id}`}>
                  <h3 className="font-bold text-lg mt-2 mb-1 hover:text-blue-600">{relatedProduct.name}</h3>
                </Link>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-green-600 font-bold">
                    {relatedProduct.price.toLocaleString()} تومان
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                    افزودن به سبد
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail