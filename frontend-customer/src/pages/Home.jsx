import React from 'react'
import { Link } from 'react-router-dom'
import { Truck, Shield, Award, Clock } from 'lucide-react'

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'شیر پرچرب',
      price: '۳۲,۰۰۰',
      originalPrice: '۳۵,۰۰۰',
      image: '/api/placeholder/200/200',
      category: 'لبنیات'
    },
    {
      id: 2,
      name: 'نوشابه کوکا',
      price: '۱۲,۰۰۰',
      originalPrice: '۱۵,۰۰۰',
      image: '/api/placeholder/200/200',
      category: 'نوشیدنی'
    },
    {
      id: 3,
      name: 'شکلات کیت کت',
      price: '۸,۰۰۰',
      originalPrice: '۱۰,۰۰۰',
      image: '/api/placeholder/200/200',
      category: 'تنقلات'
    },
    {
      id: 4,
      name: 'پنیر پیتزا',
      price: '۴۵,۰۰۰',
      originalPrice: '۵۰,۰۰۰',
      image: '/api/placeholder/200/200',
      category: 'لبنیات'
    }
  ]

  const features = [
    {
      icon: <Truck size={32} />,
      title: 'تحویل سریع',
      description: 'تحویل در کمتر از ۲ ساعت'
    },
    {
      icon: <Shield size={32} />,
      title: 'ضمانت کیفیت',
      description: 'تضمین بهترین کیفیت'
    },
    {
      icon: <Award size={32} />,
      title: 'قیمت مناسب',
      description: 'قیمت‌های رقابتی'
    },
    {
      icon: <Clock size={32} />,
      title: 'پشتیبانی ۲۴/۷',
      description: 'پشتیبانی دائمی'
    }
  ]

  return (
    <div>
      {/* هیرو بخش */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            سوپرمارکت آنلاین <span className="text-yellow-300">Online E</span>
          </h1>
          <p className="text-xl mb-8 opacity-90">
            بهترین محصولات با بهترین قیمت‌ها - تحویل درب منزل
          </p>
          <Link
            to="/products"
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition inline-block"
          >
            شروع خرید
          </Link>
        </div>
      </section>

      {/* ویژگی‌ها */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* محصولات ویژه */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">محصولات ویژه</h2>
            <p className="text-gray-600">برترین محصولات با تخفیف‌های ویژه</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    تخفیف
                  </div>
                </div>

                <div className="p-4">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-lg mt-2 mb-1">{product.name}</h3>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-green-600 font-bold">{product.price} تومان</span>
                      <span className="text-gray-400 text-sm line-through">{product.originalPrice}</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                      افزودن به سبد
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition inline-block"
            >
              مشاهده همه محصولات
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home