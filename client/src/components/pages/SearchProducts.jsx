import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import AXIOS from 'axios'

export default function SearchProducts() {
    const [data,SetData] = useState([])
    const params = useLocation()
    // console.log("params",params);
    const fetchData =async()=>{
        const resData = await AXIOS.get("http://localhost:7800/products/search"+params.search)
        SetData(resData.data.data)
    }
    useEffect(()=>{fetchData()})
  return (
    <div>
        Search
    </div>
  )
}
