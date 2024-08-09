import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AXIOS from 'axios'
export default function ProductDetials() {

  const [data,SetData] = useState({
    ProductName:"",
    ProductBrand:"",
    category:"",
    price:"",
    sellingPrice:"",
    productImage:[],
    description:""
  })

  const params = useParams()

    const fetchProductDetail = async() => {
        const resData = await AXIOS.post("http://localhost:7800/products/product-detials",{productId:params?.id})
        SetData(resData.data.data)
    }
  return (
    <div className='h-full'>ProductDetials</div>
  )
}
