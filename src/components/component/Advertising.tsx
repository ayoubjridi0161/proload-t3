import React from 'react'
import Image from 'next/image'
type Props = {}

export default function Advertising({}: Props) {
  return (
    <div className={ `p-5 shadow-bottom mt-4 space-y-1 w-full ` }>
    <h1 className='font-extrabold'>Advertising</h1>
    <Image src='/creatina.jpg' width={20} height={20} className='w-full pt-1 pb-3  ' alt={"ayoub"}  />
    
    <p className='font-bold'>best creatine !</p>
    <p className='text-[#a4a4a4] text-md'>get your creatine today. Limited batch</p>
    </div>    
  )
}