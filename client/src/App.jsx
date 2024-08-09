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
import { useEffect } from "react"
import AXIOS from 'axios'
import Context from "./context/context"
import { useDispatch } from "react-redux"
import { setUserDetials } from "./store/userSlice"
import AdminPanel from "./components/pages/Admin/AdminPanel"
import fetchProduct from './helpers/contextFun'
import CategoryProducts from "./components/pages/CategoryProducts"
import ProductDetials from "./components/pages/ProductDetials"

function App() {
  const dispatch = useDispatch()
  const fetchUserDetials = async()=>{
    try{
    const header={
      token:localStorage.getItem('token')||""
    }
    const resData = await AXIOS.post("http://localhost:7800/user/user-detials",{},{headers:header})
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
  useEffect(()=>{
    fetchUserDetials()
  },[])

  return (
    <>
    <Context.Provider value={{
      fetchUserDetials,
      fetchProduct
    }}>
    <ToastContainer position="top-right"
autoClose={3000}
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
    <main className="min-h-[calc(100vh-60px)] bg-pink-50 pt-16">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPasswod/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/product-category/:categoryName" element={<CategoryProducts/>}/>
        <Route path="/product/:id" element={<ProductDetials/>}/>
        <Route path="/admin-panel/*" element={<AdminPanel/>}/>
      </Routes>
    </main>
    <Footer/>
    </Context.Provider>
    </>
  )
}

export default App
