import React, { useEffect, useState } from 'react'
import UploadProducts from '../../UploadProducts'
import AXIOS from 'axios'
import AdminProductCard from '../../AdminProductCard'

export default function AllProducts() {
    const [openUploadProduct,SetOpenUploadProduct] = useState(false)
    const [allProducts,SetAllProducts] = useState([])
    
    const fetchProduct = async() => {
        if(localStorage.getItem('token')){
            const resData = await AXIOS.get("http://localhost:7800/products/get-products")
        SetAllProducts(resData?.data.data||[])
    }
        }


    useEffect(()=>{
        fetchProduct()
    },[])

  return (
    <div>
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg '>All Products</h2>
                <button className='border-2 border-pink-700 text-pink-700 hover:bg-pink-700 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>{SetOpenUploadProduct(true)}}>Upload Product</button>
            </div>

            <div className='flex flex-wrap h-[calc(100vh-190px)] gap-5 max-md:gap-20 py-4 overflow-y-scroll'>
                {
                    allProducts.map((product,index)=>{
                        return(
                            <AdminProductCard data={product} key={index+"allProducts"} fetchData={fetchProduct}/>
                            
                        )
                    })
                }
            </div>





            {
                openUploadProduct&&(
                    <UploadProducts onClose={()=>{SetOpenUploadProduct(false)}} fetchData={fetchProduct}/>
                )
            }
        </div>
        
    </div>
  )
}
