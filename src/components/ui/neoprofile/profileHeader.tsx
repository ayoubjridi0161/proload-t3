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
    userCover:string|null
}

export default function ProfileHeader({userImage,userName,numberOfConnects,userID,isfollowed,userCover}: Props) {
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
    <header className='relative h-auto min-h-[180px] md:min-h-[250px] lg:min-h-[300px] mb-6'>
        {/* Background cover photo */}
        <div className='absolute inset-0 h-3/4 bg-slate-200 bg-center bg-cover'
        style={{backgroundImage:`url(${userCover ?? "//s3.eu-north-1.amazonaws.com/proload.me/widegym.png"})`}}></div>
        
        {/* Profile info - positioned for overlap */}
        <div className='relative pt-[15%] md:pt-[12%] px-4 pb-4 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 z-10'>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 items-center sm:items-end'>
          <Image 
            src={userImage ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} 
            alt={userName ?? "Profile"} 
            width={180} 
            height={180} 
            className='w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover border-4 border-white shadow-md' 
          />
          <div className='text-center sm:text-left'>
            <h1 className='font-bold text-lg sm:text-xl md:text-2xl'>{userName ?? "Proload User"}</h1>
            <p className='text-sm md:text-base'>{numberOfConnects} followers</p>
          </div>
          </div>
           
          <Button disabled={isLoading} onClick={() => { void handleFollow(); }} variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="mt-2 sm:mt-0 rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-5 sm:px-7 py-0">{followed ? 'FOLLOWED' : 'FOLLOW'}</Button>
          
        </div>
      </header>
  )
}