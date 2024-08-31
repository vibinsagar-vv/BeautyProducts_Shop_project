import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./components/pages/Home"
import './App.css'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/pages/Login"
import ForgotPasswod from "./components/pages/ForgotPasswod"
import SignUp from "./components/pages/SignUp"
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"
import AXIOS from 'axios'
import Context from "./context/context"
import { useDispatch } from "react-redux"
import { setUserDetials } from "./store/userSlice"
import AdminPanel from "./components/pages/Admin/AdminPanel"
import fetchProduct from './helpers/contextFun'
import CategoryProducts from "./components/pages/CategoryProducts"
import ProductDetials from "./components/pages/ProductDetials"
import OtpInput from "./components/pages/OtpInput"
import ProfilePage from "./components/pages/Profile"
import Cart from "./components/pages/Cart"
import SearchProducts from "./components/pages/SearchProducts"

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,SetCartProductCount] = useState(0)


  const fetchUserDetials = async()=>{
    try{
    const header={
      token:localStorage.getItem('token')||""
    }
    const resData = await AXIOS.get("http://localhost:7800/user/user-detials",{headers:header})
    if(resData.data.success){
        dispatch(setUserDetials(resData.data.data))
    }
    // if(resData.data.error){
    //     console.log(resData.data.message);
    // }
  }catch(err){
    console.log(err);
  }
  }

  const fetchUserAddToCart = async() =>{
        try{
          const header={
            token:localStorage.getItem('token')||""
          }
            const CartData = await AXIOS.get("http://localhost:7800/user/countAddToCart",{headers:header})    
            
            SetCartProductCount(CartData?.data?.data?.count)
            

        }catch(error){
          console.log(error);
          
        }
  }

  useEffect(()=>{

    //user Detials
    fetchUserDetials()

    //user cart detial
    fetchUserAddToCart()
  },[])

  return (
    <>
    <Context.Provider value={{
      fetchUserDetials, //user detial fetch
      fetchProduct,
      cartProductCount, //cart product count
      fetchUserAddToCart
    }}>
    <ToastContainer position="top-right"
autoClose={500}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
transition={Bounce}
pauseOnHover
theme="colored"
/>
    <Header/>
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-neutral-light pt-16">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgot-password" element={<ForgotPasswod/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/otp-verification" element={<OtpInput/>}/>
          <Route path="/product-category/:categoryName" element={<CategoryProducts/>}/>
          <Route path="/product/:id" element={<ProductDetials/>}/>
          <Route path="/admin-panel/*" element={<AdminPanel/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/search" element={<SearchProducts/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
    </Context.Provider>
    </>
  )
}

export default App
