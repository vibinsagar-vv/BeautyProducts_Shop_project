import React, { useEffect, useState } from 'react'
import CategoryList from '../CategoryList'
import BannerProduct from '../BannerProduct'
import HorizontalCardProduct from '../HorizontalCardProduct'
import AXIOS from 'axios'
import VerticalCardProduct from '../VerticalCardProduct'

export default function Home() {

  const [category,SetCategory] = useState([])

  const fetchCategoryProduct = async() => {
    const resData = await AXIOS.get("http://localhost:7800/products/get-category-product")
    await SetCategory(resData.data.category)
    // await console.log(category);
    
}
useEffect(()=>{
    fetchCategoryProduct()
},[])

  return (
    <div className=' min-h-[calc(100vh-120px)] pb-8'>
        <CategoryList/>
        <BannerProduct/>
        <div>
          {
            category.map((name,index)=>{
              if(name=="makeup"||name=="hairoil&shampoo"){
                  return(
                    <VerticalCardProduct key={index} category={name} heading={`Top ${name}s`}/>
                  )
              }else{
                return(
                  <HorizontalCardProduct key={index} category={name} heading={`Top ${name}:`}/>
                )
              }              
            })
          }
        </div>
    </div>
  )
}
