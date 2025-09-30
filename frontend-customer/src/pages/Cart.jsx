import React, {useState} from 'react'
export default function Cart(){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')||'[]'))
  const total = cart.reduce((s,i)=>s+(i.price||0),0)
  return (
    <div className='container'>
      <h2>سبد خرید</h2>
      {cart.map((it,idx)=>(<div key={idx} className='card'><b>{it.title}</b> - {it.price}</div>))}
      <h3>جمع: {total}</h3>
      <button className='btn' onClick={()=>{ alert('ثبت سفارش (نمونه)'); localStorage.removeItem('cart'); setCart([]) }}>ثبت سفارش</button>
    </div>
  )
}
