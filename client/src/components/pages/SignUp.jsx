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
    <section id='signup' className='py-7'>
          <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
              <h1 className='text-center text-5xl font-bold text-pink-700'>Sign-UP</h1>
            <form onSubmit={handleSubmit} className='pt-8 flext flex-col gap-2'>
                      <div className='grid'>
                          <label htmlFor='name'>Name :</label>
                          <div className='bg-slate-200 p-2'>
                          <input 
                          type="name" 
                          name="name" 
                          id="name" 
                          value={data.name}
                          placeholder='Enter name'
                          onChange={handleChange}
                          required
                          className='w-full h-full outline-none  bg-transparent'/>
                          </div>
                      </div>

                      <div className='grid'>
                          <label htmlFor='email'>Email :</label>
                          <div className='bg-slate-200 p-2'>
                          <input 
                          type="email" 
                          name="email" 
                          id="email" 
                          value={data.email}
                          placeholder='Enter email'
                          onChange={handleChange}
                          required
                          className='w-full h-full outline-none  bg-transparent'/>
                          </div>
                      </div>
                      <div>
                          <label htmlFor='password'>Password :</label>
                          <div className='bg-slate-200 p-2 flex items-center'>
                          <input 
                          type={showpassword?"text":"password"} 
                          name="password" 
                          id="password"
                          value={data.password}
                          placeholder='Enter password' 
                          onChange={handleChange}
                          required
                          className='w-full h-full outline-none bg-transparent' />
                              <div className='cursor-pointer text-xl' onClick={()=>Setshowpassword((preve)=>!preve)}>
                              <span className='hover:text-pink-700'>
                                  {showpassword?
                                  <FaEyeSlash/>:<FaEye/>
                                  }
                                  
                              </span>
                              </div>
                          </div>
                      </div>
                      <div>
                          <label htmlFor='password'>Confirm Password :</label>
                          <div className='bg-slate-200 p-2 flex items-center'>
                          <input 
                          type={showConfirmPassword?"text":"password"} 
                          name="confirmPassword" 
                          id="confirmPassword"
                          value={data.confirmPassword}
                          placeholder='Enter confirmPassword' 
                          onChange={handleChange}
                          required
                          className='w-full h-full outline-none bg-transparent' />
                              <div className='cursor-pointer text-xl' onClick={()=>SetshowConfirmPassword((preve)=>!preve)}>
                              <span className='hover:text-pink-700'>
                                  {showConfirmPassword?
                                  <FaEyeSlash/>:<FaEye/>
                                  }
                                  
                              </span>
                              </div>
                          </div>
                      </div>

                      <button type='submit' className='bg-pink-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-pink-800' >Sign Up</button>
                  </form>
                  <p className='py-6'>Already have account ?<Link to={"/login"} className='text-pink-700 hover:underline hover:text-pink-900'>Log In</Link></p>
            </div>
          </div>
    </section>

  )
}
