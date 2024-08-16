import React, { useEffect, useState } from 'react'
import CategoryList from '../CategoryList'
import BannerProduct from '../BannerProduct'
import HorizontalCardProduct from '../HorizontalCardProduct'
import AXIOS from 'axios'
import VerticalCardProduct from '../VerticalCardProduct'
import Heading from '../../helpers/Heading'

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
        <div className=''>
        <BannerProduct/>
        </div>
        <div className='px-6'>
        <CategoryList/>
        </div>
        <div className='px-6'>
          {
            category.map((name,index)=>{
              if(name=="makeup"||name=="whiteningcreams"){
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
