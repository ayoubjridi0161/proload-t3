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
    <header className='h-[40dvh] grid grid-rows-10 pb-3 grid-cols-1  '>
        <div className='bg-slate-200 row-start-1 row-end-7 col-start-1 bg-s3gym bg-bottom bg-cover'></div>
        <div className='flex justify-between row-start-5 row-span-6  col-start-1 z-20 p-4 pt-6 '>
            <div className='flex items-center gap-5 w-full h-full flex-col md:flex-row'>
              <Image src={userImage ??"https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} alt='omarsy' width={180} className='h-1/2 md:h-full w-[15%]' height={120} />
              <div className='mt-3 text-center md:text-left'>
              <h1 className='font-bold text-xl'>{userName ?? "Proload User"}</h1>
              <p>{numberOfConnects} followers</p>
              </div>
            </div>
            <div className='flex gap-2 items-center self-center place-self-end'> 
              <Button disabled={isLoading} onClick={() => { void handleFollow(); }} variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0">{followed ? 'FOLLOWED' : 'FOLLOW'}</Button>
              <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0">MESSAGE</Button>
            </div>
        </div>
        
      </header >
  )
}