import React, { useEffect, useState } from 'react'
import AXIOS from 'axios'
import { Link } from 'react-router-dom'
import Heading from '../helpers/Heading'
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
    <div className='container mx-auto p-4 pt-10 '>
                <Heading text='Shop By Category'/>
        <div className='flex items-center gap-4 justify-between lg:justify-center overflow-scroll scrollbar-none pl-3'>
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
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-2  border border-slate-800 shadow-pink-950 shadow-lg bg-white hover:bg-white flex items-center justify-center'>
                                    <img src={`http://localhost:7800/ProductImages/${product?.productImage[0]}`} alt={product?.category}  className='max-h-16 object-scale-down mix-blend-multiply hover:scale-110 transition-all'/>
                                </div>
                                <p className='Marck text-center font-semibold text-slate-800 capitalize text-sm md:text-base pt-2'>{product.category}</p>
                            </Link>
                        )
                    })
                )

                
            }
        </div>
    </div>
  )
}
