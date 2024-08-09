import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { MdUpload,MdDelete } from "react-icons/md";
import UploadImage from '../helpers/uploadImage';
import DisplayProductImage from './DisplayProductImage';
import AXIOS from 'axios'
import { toast } from 'react-toastify';

export default function UploadProducts({onClose,fetchData}) {
    const [data,SetData] = useState({
        ProductName : "",
        ProductBrand : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    })
    const [fullScreenImage,SetFullScreenImage] = useState("")
    const [openFullScreenImage,SetOpenFullScreenImage] = useState(false)

    const handleOnChange = (e) =>{
        SetData({...data,[e.target.name]:e.target.value})
    }

    const handleuploadProduct = async(e) =>{
        const file= e.target.files[0]
        UploadImage(data.ProductName||'productImage',file)
         SetData({...data,productImage:[...data.productImage,(data.ProductName||"productImage")+'_'+file.name]})
         console.log('test data',data);
    }

    const handleDeleteProductImage = async(product,index) =>{
        const newProductImages = [...data.productImage]
        newProductImages.splice(index,1)
        SetData({...data,productImage:newProductImages})

        AXIOS.post("http://localhost:7800/products/delete-product-image",{image:product,imageName:(data?.ProductName||"ProductName")})

    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log('data',data);
        const resData = await AXIOS.post("http://localhost:7800/products/upload-product",data,{headers:{token:localStorage.getItem('token')}})
        if(resData.data.success){
            toast.success(resData.data.message)
        }
        if(resData.data.error){
            toast.error(resData.data.message)
        }
        onClose()
        fetchData()
    }

  return (
    <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 pb-10 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Upload Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-pink-900 cursor-pointer' onClick={onClose}>
                    <IoIosCloseCircle/>
                </div>
            </div>

            <form onSubmit={handleSubmit} encType='multipart/form-data' className='grid p-4 gap-2 overflow-y-scroll h-full'>
                <label htmlFor="ProductName">Product Name :</label>
                <input 
                    type="text" 
                    id="ProductName" 
                    name='ProductName'
                    placeholder='Enter Product Name' 
                    value={data.ProductName} 
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded '/>



                <label htmlFor="ProductBrand" className='mt-3'>Brand Name :</label>
                <input 
                    type="text" 
                    id="ProductBrand" 
                    name='ProductBrand'
                    placeholder='Enter Brand Name' 
                    value={data.ProductBrand} 
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded '/>


                <label htmlFor="category" className='mt-3'>Category :</label>
                <select 
                name="category" 
                id="category" 
                value={data.category}
                className='p-2 bg-slate-100 border rounded '
                onChange={handleOnChange}>
                 <option value="" >Select Category</option>
                    {
                        productCategory.map((product,index)=>{
                            return(
                                <option value={product.value} key={product.value+index} onChange={handleOnChange}>{product.label}</option>
                            )
                        })
                    }
                </select>

                <label className='mt-3'>Product Images :</label>
                <label htmlFor="uploadImageInput">
                <div className='p-2 bg-slate-100 border rounded h-36 w-full flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                    
                        <span className='text-4xl'>
                            <MdUpload/>
                        </span>
                        <p className='text-sm'>Upload Product Image</p>
                        <input className='hidden' type="file" name="uploadImageInput" id="uploadImageInput" onChange={handleuploadProduct} />
                    </div>
                </div>
                </label>
                <div>
                <div className='flex items-center gap-2 overflow-x-scroll scrollbar-none py-5'>      
                    {
                        data?.productImage[0]?(
                            data.productImage.map((product,index)=>{
                                return(
                                    <div className='relative group'>
                                        <div className=' w-32 h-40'>
                                            <img key={index} 
                                            src={`http://localhost:7800/ProductImages/`+product} 
                                            width={100} 
                                            height={100} 
                                            className='bg-slate-100 border flex justify-center items-center cursor-pointer w-fit max-h-40 mx-auto min-h-40 h-fit' 
                                            alt={product} 
                                            onClick={()=>{SetOpenFullScreenImage(true)
                                            SetFullScreenImage(product)}}/>
                                        </div>
                                        <div className='absolute bottom-1 right-1 p-1 text-xs text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                            onClick={()=>{handleDeleteProductImage(product,index)}}>
                                            <MdDelete/>
                                        </div>
                                    </div>
                                    
                                )
                            })
                        ):(
                            <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                        )
                    }             
                </div>
                </div>

                    <label htmlFor='price' className='mt-3'>Price :</label>
                    
                    <input 
                    type="number" 
                    id="price" 
                    name='price'
                    placeholder='enter price' 
                    value={data.price} 
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded '/>

                    <label htmlFor='sellingPrice' className='mt-3'>selling Price :</label>
                    
                    <input 
                    type="number" 
                    id="sellingPrice" 
                    name='sellingPrice'
                    placeholder='enter sellingPrice' 
                    value={data.sellingPrice} 
                    onChange={handleOnChange}
                    className='p-2 bg-slate-100 border rounded '/>

                    <label htmlFor='description' className='mt-3'>Description :</label>

                    <textarea name="description"
                    id="description"
                    className='h-28 bg-slate-100 border resize-none p-1'
                    placeholder='enter Product Description'
                    onChange={handleOnChange}
                    />

                    <button className='px-3 mt-3 py-2 bg-pink-700 text-white mb-10 hover:bg-pink-900'>Upload Product</button>
            </form>
        </div>
        {/* display image full screen */}

        {
            openFullScreenImage&&(
                <DisplayProductImage onClose={()=>SetOpenFullScreenImage(false)} imageName={fullScreenImage}/>
            )
        }
    </div>
  )
}
