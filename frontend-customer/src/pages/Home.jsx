import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home(){
  const [products, setProducts] = useState([])
  useEffect(()=>{
    axios.get('/api/products/').then(r=>setProducts(r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <header><div className='container'><h1>سوپرمارکت آنلاین - صفحه اصلی</h1></div></header>
      <div className='container'>
        <h2>کالاهای پیشنهادی</h2>
        <div className='grid'>
          {products.slice(0,12).map(p=>(
            <div className='card' key={p.serial}>
              <h4>{p.title || p.serial}</h4>
              <p>قیمت: {p.retail_price || '-'}</p>
              <Link className='btn' to={'/product/'+p.serial}>مشاهده</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
