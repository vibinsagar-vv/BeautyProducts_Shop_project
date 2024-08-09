import React, { useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import AddToCart from '../helpers/AddToCart'

export default function VerticalCardProduct({category,heading}) {
    const [data,SetData] = useState([])
    const [loading,SetLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const fetchData = async() =>{
        SetLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        SetLoading(false)
        SetData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div className='container mx-auto px-4 my-6'>

        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>


        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none'>
            {

                data.map((product,index)=>{
                    return(
                        <Link to={"/product/"+product?._id} key={index} className='w-full min-w-[280px] md:min-w-[250px] max-w-[280px] md:max-w-[250px] bg-white rounded-md shadow-md'>
                            <div className='bg-slate-200 rounded-t-md h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center'>
                                <img src={`http://localhost:7800/ProductImages/${product.productImage[0]}`} alt="" className='object-scale-down h-full max-w-24 hover:scale-110 transition-all mix-blend-multiply' />
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium md:text-lg text-base text-ellipsis line-clamp-1 text-black'>{product?.ProductName}</h2>
                                <p className='capitalize text-slate-500'>{product.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button className='text-sm bg-pink-700 hover:bg-pink-900 text-white px-3 py-0.5 rounded-full' onClick={(e)=>AddToCart(e,product?._id)}>Add to Cart</button>
                            </div>
                        </Link>
                    )
                })
            }
        </div>

        

    </div>
  )
}
