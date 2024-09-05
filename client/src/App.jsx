import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Home from "./components/pages/Home"
import './App.css'
// import Header from "./components/Header"
import Footer from "./components/Footer"
// import Login from "./components/pages/Login"
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
import MyNavbar from "./components/flowbiteHeader"
import AuthPage from "./components/AuthPage"
import Log from "./components/Log"
import SlideNavbar from "./components/SlideNavbar"
import AuthForm from "./components/SlideNavbar"
import TableComponent from "./components/TableComponent"
import SelectionTable from "./components/SimpleTable"
import DashBoard from "./components/DashBoard"
import UserPage from "./Users/UserPage"
function App() {
  const dispatch = useDispatch()
  const [cartProductCount,SetCartProductCount] = useState(0)
  const url=useLocation()
  console.log(url);
  
  
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
      <main className=" bg-white">
        <Routes>
          <Route path="/*" element={<UserPage/>}/>
          <Route path="/dashboard/*" element={<DashBoard/>}/>
        </Routes>
      </main>
    </Context.Provider>
    </>
  )
}

export default App
