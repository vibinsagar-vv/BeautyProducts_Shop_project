import React, { useContext, useState } from 'react'
import { FaEye,FaEyeSlash,FaUserCircle } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import AXIOS from 'axios'
import { toast } from 'react-toastify';
import Context from '../../context/context';
export default function Login() {
  const nav=useNavigate()
  const generalContext = useContext(Context)
  const [showpassword,Setshowpassword]=useState(false)
  const [data,SetData]=useState({
    email:"",
    password:""
  })

  const handleChange=(e)=>{
    const {name,value} = e.target

    SetData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const resData=await AXIOS.post("http://localhost:7800/user/login",data)
   
   localStorage?.setItem("token",resData.data.data.token)
   localStorage?.setItem("role",resData.data.data.role)

    
   if(resData.data.success){
    toast.success(resData.data.message)
    generalContext.fetchUserDetials()
    generalContext.fetchUserAddToCart()
      nav('/')
   }
   if(resData.data.error){
    toast.error(resData.data.message)
   }
    }catch(error){
      toast.error(error.response.data.message)
    }
  }
  return (
    <section id='login'className='h-[calc(100vh-120px)] p-16 flex justify-center ease-in-out'>
        <div className='flex border-2 h-full w-[60%] border-accent-dark rounded-xl'>
        <div className='mx-auto pt-16 container rounded-l-xl lg:w-[60%] p-4'>
           <div className='p-5 w-full max-w-sm mx-auto'>
           <h1 className='text-center text-5xl font-bold text-accent-dark'>LogIn</h1>
                <form onSubmit={handleSubmit} className='pt-8 flex justify-center flex-col gap-4'>
                  {/* <div className='grid'> */}
                  <div className='relative'>
  <input 
    type="email" 
    name="email" 
    id="email" 
    value={data.email}
    onChange={handleChange}
    className='peer w-full bg-transparent border-b-2 border-gray-400 py-1 focus:outline-none focus:border-b-accent-light focus:border-b-[3px] transition-colors' 
    placeholder=" "  // Add a blank placeholder to trigger peer-placeholder-shown
  />
  <label 
    className='absolute text-gray-600 font-medium left-0 top-1 cursor-text 
               peer-focus:text-xs peer-focus:text-accent-light peer-focus:-top-4 
               transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-gray-600 
               peer-placeholder-shown:text-base' 
    htmlFor='email'>
    Email
  </label>
</div>

                  <div className='flex '>
                    <div className='relative w-full'>
                      <input 
                      type={showpassword?"text":"password"} 
                      name="password" 
                      id="password"
                      value={data.password}
                      onChange={handleChange}
                      className='w-full border-gray-400 bg-transparent border-b-2 py-1 focus:outline-none focus:border-b-accent-light focus:border-b-[3px] transition-colors peer'/>
                      <label className='absolute text-gray-600 font-medium left-0 top-1 cursor-text peer-focus:text-xs peer-focus:text-accent-light peer-focus:-top-4 transition-all' htmlFor='password'>Password</label>
                      <div className='cursor-pointer absolute right-1 top-2 flex items-center text-xl text-textColor-light' onClick={()=>Setshowpassword((preve)=>!preve)}>
                          <span className='hover:text-accent-light'>
                            {showpassword?
                            <FaEyeSlash/>:<FaEye/>
                            }
                            
                          </span>
                        </div>
                    </div>
                  </div>
                  <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-pink-700 '>
                            Forgot password?
                    </Link>
                  <button className='bg-accent-dark text-white font-bold px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-tertiary-dark' >LOG IN</button>
                </form>
                <p className='lg:hidden py-6'>Don't have account ?<Link to={"/sign-up"} className='text-pink-700 hover:underline hover:text-pink-900'>Sign Up</Link></p>
           </div>
        </div>
        <div className='hidden bg-accent-light h w-[40%] rounded-r-xl lg:flex flex-col gap-8 justify-center items-center'>
              <p className='text-4xl font-extrabold text-white font-serif'>Hello,Friend!</p>
              <p className='text-center w-[80%] text-white'>Enter your personal detials and start journey with Us</p>
              <Link to={"/sign-up"} className='border-[3px] border-white text-white font-bold text-center px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6' >SIGN UP</Link>
              </div>
        </div>
    </section>
  )
}
