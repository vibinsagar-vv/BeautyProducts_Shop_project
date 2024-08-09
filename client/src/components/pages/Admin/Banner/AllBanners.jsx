import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import AXIOS from 'axios'
import { toast } from 'react-toastify';
export default function AllBanners({data,fetchData}) {

  const handleDelete = async() =>{
      const resData = await AXIOS.post("http://localhost:7800/products/delete-banner",{_id:data._id},{headers:{token:localStorage.getItem('token')}})
      if(resData.data.success){
        toast.success(resData.data.message)
    }
    if(resData.data.error){
        toast.error(resData.data.message)
    }
    fetchData()
  }

  return (
    <div className='relative bg-white p-4 rounded '>
        <div className='w-full'>
            <div className='flex flex-col items-center justify-center'>
                <img className='w-fit mx-auto mb-3 rounded' src={`http://localhost:7800/Banners/${data?.BannerImage}`} alt={data.ProductName} width={120} height={120}/>
            </div>
                <h1 className='max-w-40 text-wrap line line-clamp-2'>Banner for {data.ProductName}</h1>
            
            <div className='absolute bottom-2 right-2 w-fit ml-auto p-2 bg-slate-300 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={handleDelete}>
                    <MdDelete/>
                </div>
        </div>        
    </div>
  )
}
