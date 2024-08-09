import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'
import { Link } from 'react-router-dom'
export default function CategoryList() {

    const [categoryProduct,SetCategoryProduct] = useState([])
    const [loading,SetLoading] = useState(false)
    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async() => {
        SetLoading(true)
        const resData = await AXIOS.get("http://localhost:7800/products/get-category-product")
        SetLoading(false)
        SetCategoryProduct(resData.data.data)
    }
    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4 '>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
            {

                loading ?(
                    categoryLoading.map((element,index)=>{
                        return(
                            <div className='h-16 w-16  md:min-w-20 md:h-20 rounded-full overflow-hidden animate-pulse p-4 bg-slate-200' 
                            key={"categoryLoading"+index}>
                             </div>
                        )
                    })                    
                ):(
                    categoryProduct.map((product,index)=>{
                        return(
                            <Link to={"/product-category/"+product?.category} key={product.category} className=' flex flex-col items-center justify-center cursor-pointer'>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 border hover:bg-white flex items-center justify-center'>
                                    <img src={`http://localhost:7800/ProductImages/${product?.productImage[0]}`} alt={product?.category}  className='max-h-16 object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className=' text-center capitalize text-sm md:text-base'>{product.category}</p>
                            </Link>
                        )
                    })
                )

                
            }
        </div>
    </div>
  )
}
