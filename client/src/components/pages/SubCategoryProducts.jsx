import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "../flowbiteHeader";
import Footer from "../Footer";
import axios from 'axios'
import fetchCategoryWiseProduct from "../../helpers/fetchCategoryWiseProduct";

export default function SubCategoryProducts() {
  const [data,setData] = useState([])
  const params = useParams();

  const fetchData = async()=>{
    const categoryProduct = await fetchCategoryWiseProduct(params.subcategoryName);
    // console.log(categoryProduct);
    setData(categoryProduct.data)
    
  }
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div>
      <div className="pt-16">{params.subcategoryName}</div>
      <Footer/>
    </div>
  );
}
