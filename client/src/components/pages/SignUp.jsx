import React, { useState } from 'react'
import { FaEye,FaEyeSlash,FaUserCircle } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import imageTobase64 from '../../helpers/imageTobase64';
import AXIOS from 'axios'
import { toast } from 'react-toastify';




export default function SignUp() {
    const [showpassword,Setshowpassword]=useState(false)
    const [showConfirmPassword,SetshowConfirmPassword]=useState(false)
    const [profilePhoto,SetProfilePhoto]=useState("")
    const nav =useNavigate()

  const [data,SetData]=useState({
    email:"",
    password:"",
    name:"",
    confirmPassword:"",
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
      if(data.password===data.confirmPassword){
      const resultdata=await AXIOS.post('http://localhost:7800/user/generate-otp',data)
        localStorage.setItem('token',resultdata.data.data)
        localStorage.setItem('verifiction',resultdata.data.Otp)
        sessionStorage.setItem('targetTime',resultdata.data.time)
      if(resultdata.data.success){
        toast.success(resultdata.data.message)
        nav('/otp-verification')
      }

      if(resultdata.data.error){
        toast.error(resultdata.data.message)
      }
      }else{
         toast.error("please check the password and confirm password");
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <section id='signup' className='h-[calc(100vh-120px)] p-16 flex justify-center ease-in-out'>
          <div className='flex border-2 h-full w-[60%] border-accent-dark rounded-xl'>
          <div className='hidden bg-accent-light h w-[40%] rounded-l-xl lg:flex flex-col gap-8 justify-center items-center'>
              <p className='text-4xl font-extrabold text-white font-serif'>Hello,Friend!</p>
              <p className='text-center w-[80%] text-white'>Enter your personal detials and start journey with Us</p>
              <Link to={"/sign-up"} className='border-[3px] border-white text-white font-bold text-center px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6' >SIGN UP</Link>
              </div>
          <div className='mx-auto pt-16 container rounded-r-xl lg:w-[60%] p-4'>
            <div className='p-5 w-full max-w-sm mx-auto'>
              <h1 className='text-center text-5xl font-bold text-accent-dark'>Sign-UP</h1>
            <form onSubmit={handleSubmit} className='pt-8 flex flex-col gap-6'>
                          <div className='relative'>
                          <input 
                          type="name" 
                          name="name" 
                          id="name" 
                          value={data.name}
                          onChange={handleChange}
                          required
                          class="block px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer" 
                          placeholder=" "/>
                          <label for="name" 
                            class="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Name</label>
                          </div>
                          <div class="relative">
                              <input 
                                type="email"
                                id="email"
                                name="email" 
                                value={data.email}
                                onChange={handleChange}
                                class="block px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer" 
                                placeholder=" " 
                                required 
                              />
                              <label 
                                for="email" 
                                class="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                                Email
                              </label>
                            </div>
                      <div className='flex'>
                          <div className='relative w-full'>
                          <input 
                          type={showpassword?"text":"password"} 
                          name="password" 
                          id="password"
                          value={data.password}
                          onChange={handleChange}
                          required
                          class="block px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer" 
                          placeholder=" "/>
                          <label class="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4" htmlFor='password'>Password</label>
                              <div className='cursor-pointer absolute right-1 top-2 flex items-center text-xl text-textColor-light' onClick={()=>Setshowpassword((preve)=>!preve)}>
                              <span className='hover:text-pink-700'>
                                  {showpassword?
                                  <FaEyeSlash/>:<FaEye/>
                                  }
                              </span>
                              </div>
                          </div>
                      </div>
                      <div className='flex'>
                          <div className='relative w-full'>
                          <input 
                          type={showConfirmPassword?"text":"password"} 
                          name="confirmPassword" 
                          id="confirmPassword"
                          value={data.confirmPassword}
                          onChange={handleChange}
                          required
                          class="block px-2.5 pb-0.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-b-[3px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-accent-dark peer" 
                          placeholder=" "/>
                          <label class="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:text-accent-dark px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4" htmlFor='password'>Confirm Password</label>
                              <div className='cursor-pointer absolute right-1 top-2 flex items-center text-xl text-textColor-light' onClick={()=>SetshowConfirmPassword((preve)=>!preve)}>
                              <span className='hover:text-pink-700'>
                                  {showConfirmPassword?
                                  <FaEyeSlash/>:<FaEye/>
                                  }
                                  
                              </span>
                              </div>
                          </div>
                      </div>

                      <button type='submit' className='bg-accent-dark text-white font-bold px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-tertiary-dark' >SIGN UP</button>
                  </form>
                  <p className='lg:hidden py-6'>Already have account ?<Link to={"/login"} className='text-pink-700 hover:underline hover:text-pink-900'>Log In</Link></p>
            </div>
          </div>
          </div>
    </section>

  )
}
