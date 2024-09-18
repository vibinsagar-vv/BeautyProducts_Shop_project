import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import AXIOS from 'axios'
import MyNavbar from '../flowbiteHeader'
import Footer from '../Footer'
import AdminProductCard from '../AdminProductCard'
import SearchProductCard from '../../helpers/SearchProductCard'
import displayINRCurrency from '../../helpers/displayCurrency'
import AddToCart from '../../helpers/AddToCart'
import Context from '../../context/context'

export default function SearchProducts() {
    const [data,SetData] = useState([])
    const nav = useNavigate();
    const params = useLocation()
    const { fetchUserAddToCart } = useContext(Context)
    console.log("params",params);
    const search = (params.search.split('='))[1]
    
    const fetchProduct = async() => {
      if(localStorage.getItem('token')){
          const resData = await AXIOS.get("http://localhost:7800/products/get-products")
      SetData(resData?.data.data||[])
  }
      }

      const handleAddToCart = async (e, id) => {
        e?.stopPropagation();
        e?.preventDefault();
    
        if (localStorage.getItem('token')) {
          await AddToCart(id, nav);
          await fetchUserAddToCart();
        } else {
          toast.error('Please login...');
          nav('/login');
        }
      };


  useEffect(()=>{
      fetchProduct()
  },[])

  return (
    <div className='pt-24 '>
        <div className='md:max-w-7xl p-8 justify-center md:justify-start flex flex-wrap h-[calc(100vh)] scrollbar-none gap-6 mx-auto md:gap-x-36 gap-y-10 lg:gap-y-20 max-md:gap-20 py-4 overflow-y-scroll'>
                {
                    data.filter((product)=>{
                      console.log(product);
                      
                      return (product.ProductName.toLowerCase().match(search.toLowerCase())||product.category.toLowerCase().match(search.toLowerCase())||product.subcategory.toLowerCase().match(search.toLowerCase())||product.ProductBrand.toLowerCase().match(search.toLowerCase()))
                    }).map((product,index)=>{
                        return(
                          <Link
                          to={`/product/${product?._id}`}
                          key={index}
                          className="ml-3 md:ml-0 max-h-[460px]  w-72 sm:w-[30%] md:w-[25%] lg:w-[25%] bg-white shadow-accent-dark shadow-lg rounded-lg overflow-hidden hover:shadow-accent-dark hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                        >
                          <div className="relative h-48 md:h-60 lg:max-h-72 bg-primary-light flex items-center justify-center overflow-hidden">
                            {product.productImage[0]?(<img
                              src={`http://localhost:7800/ProductImages/${product.productImage[0]}`}
                              alt={product?.ProductName}
                              className="p-4 w-full h-full transform object-scale-down hover:scale-110 transition-transform duration-500 ease-in-out"
                            />):(<img
                              src={noImage}
                              alt={product?.ProductName}
                              className="p-4 w-full h-full transform object-scale-down hover:scale-110 transition-transform duration-500 ease-in-out"
                            />)}
                            {product?.isNew && (
                              <span className="absolute top-2 right-2 bg-accent-light text-white text-xs px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <div className="p-4 flex flex-col justify-between h-40 lg:h-48">
                            <h2 className="font-semibold text-lg lg:text-xl text-gray-800 truncate">
                              {product?.ProductName}
                            </h2>
                            <p className="text-sm text-gray-500 capitalize">
                              {product?.category}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div>
                                <p className="text-xl text-accent-light font-bold">
                                  {displayINRCurrency(product?.sellingPrice)}
                                </p>
                                <p className="text-sm text-gray-400 line-through">
                                  {displayINRCurrency(product?.price)}
                                </p>
                              </div>
                              {localStorage.getItem('token') && (
                                <button
                                  className="sm:text-xs md:text-base py-1.5 px-4 bg-accent-light text-white font-semibold rounded-full hover:bg-tertiary-dark hover:text-white transition-colors duration-300"
                                  onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                  Add to Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </Link>
                            
                        )
                    })
                }
            </div>
        <Footer/>
    </div>
  )
}
