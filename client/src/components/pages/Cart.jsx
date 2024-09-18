import React, { useContext, useEffect, useState } from 'react'
import AXIOS from 'axios'
import displayINRCurrency from '../../helpers/displayCurrency'
import { IoMdClose } from "react-icons/io";
import Context from '../../context/context';
import MyNavbar from '../flowbiteHeader';

export default function Cart() {
    const [data,SetData] = useState([])
    const context = useContext(Context)
    const TotalQty = data.reduce((prev,curr)=>{
        console.log(curr);
        
       return prev + parseInt(curr.Quantity)
    },0)
    const TotalPrice = data.reduce((prev,curr)=>{
        console.log(curr);
        
       return prev + parseInt(curr.Quantity*curr.ProductId.sellingPrice)
    },0)
    

    const fetchData = async() =>{
        try{
            const header={
                token:localStorage.getItem('token')||""
              }
            const resData =await AXIOS.get("http://localhost:7800/user/view-cart-product",{headers:header})
            if(resData.data.success){
                SetData(resData.data.data)
            }
        }catch(err){
            console.log(err);
            
        }
    }
    console.log(data);
    
    useEffect(()=>{
        fetchData()
    },[])

    const handleDeleteCartPrduct =async(id)=>{
        const resData =await AXIOS.post("http://localhost:7800/user/delete-cart-product",{_id:id},{headers:{token:localStorage.getItem('token')||""}})
        
        if(resData.data.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }
    
    const increaseQty = async(id,qty) =>{
        const resData =await AXIOS.post("http://localhost:7800/user/update-cart",{Quantity:qty+1,Id:id},{headers:{token:localStorage.getItem('token')||""}})
        
        if(resData.data.success){
            fetchData()
        }
    }
    const decreaseQty = async(id,qty) =>{
        if(qty>1){
            const resData =await AXIOS.post("http://localhost:7800/user/update-cart",{Quantity:qty-1,Id:id},{headers:{token:localStorage.getItem('token')||""}})
            if(resData.data.success){
                fetchData()
            }
        }        
        
    }
    
  return (
    <div>
        <div className='container sm:text-2xl md:text-4xl mx-auto pt-16 p-4'>
        <div className='text-center text-xl my-3'>
            {
                data.length === 0 ? (
                    <p className='bg-white py-5'>No Data</p>
                ):(
                    <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
                        <div className='w-full max-w-3xl '>
                            {data.map((product,index)=>{
                                return(
                                    <div key={index} className='flex w-full h-32 my-2 border bg-white border-black relative'>
                                        <div className='absolute right-1 top-1 text-lg rounded-full p-1 font-bold hover:text-white hover:bg-red-600 cursor-pointer' onClick={()=>{handleDeleteCartPrduct(product?._id)}}>
                                                <IoMdClose/>
                                            </div>
                                        <div className='flex items-center justify-center min-w-32 h-32 p-2'>
                                            <img src={`http://localhost:7800/ProductImages/${product?.ProductId.productImage[0]}`} alt="" className='w-full h-full object-scale-down mix-blend-multiply'/>
                                        </div>
                                        <div className='px-4 w-full  py-2 text-start'>
                                            <h2 className='text-lg font-medium text-start lg:text-xl text-ellipsis line-clamp-1'>{product?.ProductId.ProductName}</h2>
                                            <p className='text-sm lg:text-base capitalize  text-slate-400'>{product?.ProductId?.category}</p>
                                            <div className='flex justify-between'>
                                            <p className='text-base lg:text-lg capitalize font-medium  text-slate-600'>{displayINRCurrency(product?.ProductId?.sellingPrice)}</p>
                                            <p className='text-base lg:text-lg capitalize font-bold  text-pink-700'>{displayINRCurrency(product?.ProductId?.sellingPrice*product?.Quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-2'>
                                                {product?.Quantity>1 && (<button className='border-2 border-pink-800 font-extrabold text-pink-700 hover:bg-pink-800 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>decreaseQty(product?._id,product?.Quantity)}>-</button>)}
                                                <span className='font-medium'>{product?.Quantity}</span>
                                                <button className='border-2 border-pink-800 font-extrabold text-pink-700 hover:bg-pink-800 hover:text-white w-6 h-6 flex justify-center items-center rounded'onClick={()=>increaseQty(product?._id,product?.Quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='w-full flex justify-center p-4'>
                             <div className='lg:w-[60%] w-full h-52 bg-white border border-black'>
                                <h2 className='text-white bg-pink-800 px-4 py-1 text-start font-bold'>
                                    Summery
                                </h2>
                                <div className='text-start p-4 flex lg:justify-between'>
                                    <p>Quantity :</p>
                                    <p className='lg:px-4 px-7 font-bold'>{TotalQty}</p>
                                </div>
                                <div className='text-start p-4 flex lg:justify-between'>
                                    <p>Total Price :</p>
                                    <p className='lg:px-4 px-7 font-bold'>{displayINRCurrency(TotalPrice)}</p>
                                </div>
                                <button className='w-full bg-gray-600 py-3 text-white font-bold'>Buy Products</button>
                             </div>
                        </div>
                    </div>
                )
            }
        </div>

    </div>
    </div>
  )
}
