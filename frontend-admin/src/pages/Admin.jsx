import React, {useState} from 'react'
import axios from 'axios'
export default function Admin(){
  const [file,setFile] = useState(null)
  const upload = async ()=>{
    if(!file) return alert('فایل انتخاب نشده')
    const fd = new FormData(); fd.append('file', file)
    await axios.post('/api/products/upload-excel', fd, { headers: {'Content-Type':'multipart/form-data'}})
    alert('فایل صف شد')
  }
  return (
    <div style={{padding:20}}>
      <h2>پنل مدیریت</h2>
      <div>
        <label>آپلود اکسل: </label>
        <input type='file' onChange={e=>setFile(e.target.files[0])} />
        <button onClick={upload}>آپلود</button>
      </div>
      <div style={{marginTop:20}}>
        <h3>سفارش‌ها</h3>
        <p>در این اسکلت، سفارش‌ها در backend ذخیره نشده‌اند. بعداً اضافه می‌شود.</p>
      </div>
    </div>
  )
}
