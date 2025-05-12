"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../button'
import { ConnectAction, unfollow } from '~/lib/actions/userInteractions'

type Props = {
    userImage:string|undefined,
    userName:string|null,
    numberOfConnects:number
    userID:string
    isfollowed:boolean
}

export default function ProfileHeader({userImage,userName,numberOfConnects,userID,isfollowed}: Props) {
    const [followed,setFollowed ] = useState(isfollowed)
    const [isLoading,setIsLoading] = useState(false)
    async function handleFollow(): Promise<void>{
      setIsLoading(true)
      if(!followed){
        const res = await ConnectAction(userID)
        if(res=='success') setFollowed(true)
        }else{
      const res = await unfollow(userID)
      if(res=='success') setFollowed(false)
      }
      setIsLoading(false)

    }
  return (
    <header className='relative h-auto min-h-[200px] md:min-h-[300px] mb-6'>
        {/* Background cover photo */}
        <div className='absolute inset-0 h-3/4 bg-slate-200 bg-s3gym bg-bottom bg-cover'></div>
        
        {/* Profile info - positioned for overlap */}
        <div className='relative pt-[15%] md:pt-[12%] px-4 pb-4 flex flex-col sm:flex-row items-end justify-between sm:items-end gap-4 z-10'>
          <div className='flex gap-5 items-end'>
          <Image 
            src={userImage ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} 
            alt={userName ?? "Profile"} 
            width={180} 
            height={180} 
            className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover border-4 border-white shadow-md' 
          />
          <div className='mt-2 sm:mt-0 sm:mb-2'>
            <h1 className='font-bold text-lg sm:text-xl md:text-2xl'>{userName ?? "Proload User"}</h1>
            <p className='text-sm md:text-base'>{numberOfConnects} followers</p>
          </div>
          </div>
           
          <Button disabled={isLoading} onClick={() => { void handleFollow(); }} variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0">{followed ? 'FOLLOWED' : 'FOLLOW'}</Button>
          
        </div>
      </header>
  )
}