import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Product(){
  const {serial} = useParams()
  const [p, setP] = useState(null)
  useEffect(()=>{
    axios.get('/api/products/'+serial).then(r=>setP(r.data)).catch(()=>{})
  },[serial])
  if(!p) return <div className='container'>در حال بارگذاری...</div>
  return (
    <div className='container'>
      <h2>{p.title || p.serial}</h2>
      <p>موجودی: {p.stock}</p>
      <p>قیمت خرده: {p.retail_price}</p>
      <button className='btn' onClick={()=>{
        const cart = JSON.parse(localStorage.getItem('cart')||'[]')
        cart.push({serial:p.serial, title:p.title, price:p.retail_price})
        localStorage.setItem('cart', JSON.stringify(cart))
        alert('به سبد اضافه شد')
      }}>افزودن به سبد</button>
      <div style={{marginTop:20}}>
        <h4>مقایسه قیمت</h4>
        <button className='btn' onClick={()=>axios.post('/api/products/'+serial+'/compare-prices')}>بررسی قیمت</button>
      </div>
    </div>
  )
}
