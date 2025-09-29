import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

const Cart = () => {
  // TODO: دریافت سبد خرید از API
  const cartItems = [
    {
      id: 1,
      productId: 1,
      name: 'شیر پرچرب',
      price: 32000,
      image: '/api/placeholder/100/100',
      quantity: 2,
      stock: 50
    },
    {
      id: 2,
      productId: 2,
      name: 'نوشابه کوکا',
      price: 12000,
      image: '/api/placeholder/100/100',
      quantity: 1,
      stock: 100
    }
  ]

  const updateQuantity = (itemId, newQuantity) => {
    // TODO: آپدیت تعداد در API
    console.log(`آپدیت تعداد آیتم ${itemId} به ${newQuantity}`)
  }

  const removeItem = (itemId) => {
    // TODO: حذف از API
    console.log(`حذف آیتم ${itemId}`)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 15000
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">سبد خرید شما خالی است</h2>
        <p className="text-gray-600 mb-8">می‌توانید از فروشگاه ما محصولات متنوعی را انتخاب کنید</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition inline-block"
        >
          شروع خرید
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">سبد خرید</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* لیست محصولات */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1 mr-4">
                  <Link to={`/product/${item.productId}`}>
                    <h3 className="font-bold text-lg hover:text-blue-600">{item.name}</h3>
                  </Link>
                  <p className="text-green-600 font-bold mt-1">
                    {item.price.toLocaleString()} تومان
                  </p>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-left w-24">
                    <span className="font-bold">
                      {(item.price * item.quantity).toLocaleString()} تومان
                    </span>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* خلاصه سبد خرید */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">خلاصه سفارش</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>جمع کل:</span>
                <span>{subtotal.toLocaleString()} تومان</span>
              </div>
              <div className="flex justify-between">
                <span>هزینه ارسال:</span>
                <span>{shipping.toLocaleString()} تومان</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-green-600">{total.toLocaleString()} تومان</span>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition mb-4">
              ادامه فرآیند خرید
            </button>

            <Link
              to="/products"
              className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 transition text-center block"
            >
              ادامه خرید
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart