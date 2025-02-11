import React from 'react'
import { FaImage } from "react-icons/fa6";
import { MdOutlineAttachment } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import Image from 'next/image'
const page = () => {
  return (
    <div className='m-3'>
      <div className='w-1/3 space-y-3 p-5 mx-auto' style={{boxShadow: "3px -2px 10px 0px rgba(0,0,0,0.13)"}}>
      <div className='flex gap-1'>
      <Image className='my-1 border-1 rounded-sm border-black' src={'/serena.jpg'} alt={'serena'} width={35} height={35} />

      <div className=" bg-[rgba(230,230,230,0.6)] border-1 w-full border-black/80 flex gap-6 items-center   h-10 px-3  ">
        <Input className="border-y-1 border-x-0 rounded-none  placeholder:text-[14px] placeholder:text-[#000]" placeholder=" What's on your mind, Athlete ?" />
      </div>
      </div>
      <div className='flex justify-between items-center'>
      <div className='flex gap-2'>
        <FaImage color='gray' size={'1.5em'}/>
        <MdOutlineAttachment color='gray' size={'1.5em'}/>
        <FaLocationDot color='gray' size={'1.5em'}/>
        <FaRegSmile color='gray' size={'1.5em'}/>
      </div>  
      <Button variant={'ghost'} className=" border-2 border-black rounded-none px-6 py-0 text-[14px]" style={{boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.81)"}}>Post</Button>
      </div>
        

      </div>
    </div>
  )
}

export default page