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
    <section id='login'className='mt-16'>
        <div className='mx-auto container p-4'>
           <div className='bg-white p-5 w-full max-w-sm mx-auto'>
           <h1 className='text-center text-5xl font-bold text-pink-700'>LogIn</h1>
                <form onSubmit={handleSubmit} className='pt-8 flext flex-col gap-2'>
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
                      className='w-full h-full outline-none bg-transparent' />
                        <div className='cursor-pointer text-xl' onClick={()=>Setshowpassword((preve)=>!preve)}>
                          <span className='hover:text-pink-700'>
                            {showpassword?
                            <FaEyeSlash/>:<FaEye/>
                            }
                            
                          </span>
                        </div>
                    </div>
                    <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-pink-700 '>
                            Forgot password
                    </Link>
                  </div>
                  <button className='bg-pink-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-pink-800' >Log in</button>
                </form>
                <p className='py-6'>Don't have account ?<Link to={"/sign-up"} className='text-pink-700 hover:underline hover:text-pink-900'>Sign Up</Link></p>
           </div>
        </div>
    </section>
  )
}
