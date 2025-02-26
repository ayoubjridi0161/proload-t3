import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MapPin, Paperclip, Smile } from 'lucide-react'
import React from 'react'
import Avatar from '~/components/component/Avatar'
import { Button } from '../button'

type Props = {
  image:string
}

export default function AddPost({image}: Props) {
  console.log(image)
  return (
    <div className='w-full p-3 shadow-md '>
        <div className='flex gap-2 w-full p-2'>
          <Avatar image={image} />
        <input
          className="bg-zinc-200 text-zinc-600 font-mono ring-1 
          ring-zinc-800 focus:ring-2 focus:ring-rose-400 outline-none 
          duration-300 placeholder:text-zinc-600 placeholder:opacity-50 px-4 py-1 
          shadow-md focus:shadow-lg focus:shadow-rose-400 w-full"
          autoComplete="off"
          placeholder="What's on your mind athlete"
          name="text"
          type="text"
        />
        </div>
        <div className='flex justify-between items-center p-2'>
          <div className='flex gap-2 items-center'>
          <FontAwesomeIcon icon={faImage} width={24} className='text-[#b4b4b4]' />
          <Paperclip size={24} className='text-[#b4b4b4]' />
          <MapPin size={24} className='text-[#b4b4b4]' />
          <Smile size={24} className='text-[#b4b4b4]'/>
          </div>
          <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none border-black border-1 px-6 py-0 text-lg text-[#353434] font-light">
            SHARE
          </Button>
        </div>
    </div>
  )
}