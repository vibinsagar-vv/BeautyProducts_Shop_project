import React, { useEffect, useRef, useState } from 'react'
import { MdMarkEmailRead } from "react-icons/md";
import AXIOS from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'

export default function OtpInput({length=4}) {
    const [otp,setOtp]=useState(new Array (length).fill(""))
    const [error,setError]=useState(false)
    const [errormsg,setErrormsg]=useState("")
    // console.log(otp);
   const inputRefs= useRef([])
   const [currentTime, setCurrentTime] = useState(new Date());
  const [targetTime, setTargetTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState('');

   const nav = useNavigate()
   const ResendFun = async() =>{
    try{
        const decode = jwtDecode(localStorage.getItem('token'))
        const {email,name}= decode
        console.log(email,name);
        const resultdata=await AXIOS.post('http://localhost:7800/user/resend-otp',{email:email,name:name})
        localStorage.setItem('verifiction',resultdata.data.Otp)
        sessionStorage.setItem('targetTime',resultdata.data.time)
        const targetString = sessionStorage.getItem('targetTime')
        const target = new Date(targetString)
        setTargetTime(target)
        if(resultdata.data.success){
            toast.success(resultdata.data.message)
            nav(0)
          }
    
          if(resultdata.data.error){
            toast.error(resultdata.data.message)
          }

    }catch(error){

    }
    
   }

   
   useEffect(()=>{
    if(inputRefs.current[0]){
        inputRefs.current[0].focus()
    }
   },[])
   useEffect(() => {
    // Set the target time by adding 2 minutes to the current time
    
    const targetString = sessionStorage.getItem('targetTime')
    const target = new Date(targetString)
    
    setTargetTime(target);

    // Update the time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const timeDiff = target - now;

      if (timeDiff <= 0) {
        clearInterval(interval);
        setTimeRemaining('00:00');
        localStorage.removeItem('verifiction')
      } else {
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining(
          `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);


   const handlechnage=(index,e)=>{
    const value=e.target.value
    if(isNaN(value)) return;
    const newotp =[...otp]
    newotp[index]=value.substring(value.length - 1)
    setOtp(newotp)
    

     //move to next  filed

     if(value && index<length-1 && inputRefs.current[index+1]){
        inputRefs.current[index+1].focus()
     }
     if(error){
        setError(false)
        setErrormsg('')
    }}

    const handleClick=(index)=>{

        inputRefs.current[index].setSelectionRange(1,1)
        if(error){
            setError(false)
            setErrormsg('')
        }
    }


    const handleKeyDown=(index,e)=>{
        
        if(e.key === "Backspace"  && !otp[index] && index>0 && inputRefs.current[index-1]){
            inputRefs.current[index-1].focus()
        }
        if (e.key === ' ') {
            e.preventDefault();
        }
        const newotp =otp.join('')
        
    }
      
    const handlesubmit=async(e)=>{
            try{
                e.preventDefault()
                const newotp=otp.join("")
                const resData =await AXIOS.post('http://localhost:7800/user/sign-up',{userotp:newotp,token:localStorage.getItem('token'),VerifyOtp:localStorage.getItem('verifiction')})
                if(resData.data.success){
                    toast.success(resData.data.message)
                    nav("/login")
                    localStorage.clear()
                }
                if(resData.data.error){
                    toast.error(resData.data.message)
                }
                
            }catch(error){
                console.log(error);
                
            }
        
    
      }


/*   setError(true)
            setErrormsg(err.response.data.msg) */

  return (
    <div className='pt-16 bg-pink-300 min-h-screen'>
      <section id='signup' className='bg-blur py-7'>
          <div className='mx-auto container p-4'>
            <div className='bg-white rounded-md shadow-md shadow-accent-dark p-5 w-full max-w-sm mx-auto'>
            <h1 className='text-center text-3xl font-bold'>OTP Verification</h1>
                <div className='flex justify-center'>
                <span className='text-center text-7xl text-pink-700 bg-slate-100 p-2 my-3 rounded-full'><MdMarkEmailRead/></span>
                </div>
                <p className='text-green-500'>* please check your Email otp Sent to Email id</p>
                <p>Otp expires in : <span>{timeRemaining}</span></p>
            <form onSubmit={handlesubmit} className='pt-8 flext flex-col gap-2'>
                    <div className='mx-auto flex items-center justify-center'>
                    {
                otp.map((value,index)=>{
                    return <input key={index} value={value} type='text' 
                    ref={(input)=>inputRefs.current[index]=input}
                    onChange={(e)=>handlechnage(index,e)}
                    onClick={()=>handleClick(index)}
                    onKeyDown={(e)=>handleKeyDown(index,e)}
                    className={error ? '':'w-12 h-14 m-1 text-center text-base bg-pink-50 border-pink-400 rounded-md border-solid border-[1px]'}
                    />
                    
                })
                
              }
                    </div>
                      <button type='submit' className='bg-pink-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-pink-800' >Verify</button>
                  </form>
                  <div><span className={timeRemaining!='00:00'?'text-slate-300 cursor-pointer':'text underline text-pink-500 cursor-pointer'} onClick={()=>{
                    timeRemaining=='00:00'&& ResendFun()
                  }}>Resend Otp</span></div>
            </div>
          </div>
    </section>
    </div>
  )
}
