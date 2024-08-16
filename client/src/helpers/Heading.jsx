import horizontal from '../assest/logo/horizontalLine.png'


import React from 'react'

export default function Heading({text}) {
  return (
    <div className='pb-10'>
        <h2 className='text-5xl capitalize text-center Marck font-semibold pt-4 pb-3'>{text}</h2>
        <div className='flex justify-center items-center'><img className='w-36' src={horizontal} alt="" /></div>
        </div>
  )
}
