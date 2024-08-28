import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link, useNavigate } from 'react-router-dom'
import AddToCart from '../helpers/AddToCart'
import Heading from '../helpers/Heading'
import Context from '../context/context'
import { toast } from 'react-toastify'

export default function VerticalCardProduct({category,heading}) {
    const [data,SetData] = useState([])
    const [loading,SetLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)
    const nav = useNavigate()

    const handleAddToCart = async(e,id) =>{
        e?.stopPropagation()
        e?.preventDefault()
    
            if(localStorage.getItem('token')){
            await AddToCart(id,nav)
            await fetchUserAddToCart()
            }else{
                toast.error("please login...")
                nav("/login")
            }
    }

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
    <div className='container mx-auto px-4 my-6 mb-12'>

    <div>
    {/* <h2 className='text-2xl font-semibold py-4'>{heading}</h2> */}
        <Heading text={heading}/>
    </div>

        <div className='flex items-center md:justify-center lg:justify-center gap-6 md:gap-10 overflow-scroll scrollbar-none'>
            {

                data.map((product,index)=>{
                    return(
                        <Link to={"/product/"+product?._id} key={index} className='w-full min-w-[180px] md:min-w-[200px] max-w-[180px] md:max-w-[200px] bg-white border-black border'>
                            <div className='bg-orange-100 bg-opacity-65 h-full p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center'>
                                <img src={`http://localhost:7800/ProductImages/${product.productImage[0]}`} alt="" className='object-scale-down h-full max-w-32 hover:scale-110 transition-all mix-blend-multiply' />
                            </div>
                            <div className='p-4 grid gap-2'>
                                <h2 className='font-medium md:text-base text-sm text-ellipsis line-clamp-1 text-black'>{product?.ProductName}</h2>
                                <p className='capitalize text-slate-500 text-xs'>{product.category}</p>
                                <div className='flex items-center gap-3'>
                                    <p className='text-slate-950 font-extrabold'>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through text-sm'>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button className='text-sm bg-transparent border border-pink-700 font-bold text-pink-600 hover:bg-pink-600 hover:text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}
