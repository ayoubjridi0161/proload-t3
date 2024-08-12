import Link from 'next/link'
import React from 'react'
import { useAuth } from '~/lib/hooks/useAuth'
import { Avatar, AvatarFallback } from '../avatar';
import { redirect } from 'next/navigation'
import { getUserByEmail } from '~/lib/data';


const HeaderNav = async () => {
  const [error,email,userName] = await useAuth();
  if(!email) throw new Error ("error in finding email")
  const UUID = await getUserByEmail(email);
  return (
    <nav className=' flex items-center justify-between text-white  px-[10%] py-3'>
            <h1 className=' text-2xl'>Proload</h1>
            <div className=' flex gap-20'>
                <Link className='hover:underline text-lg font-semibold' href={'/'} >Home</Link>
                <Link className='hover:underline text-lg font-semibold' href={'/workouts'} >Community</Link >
                <Link className='hover:underline text-lg font-semibold' href={'/'} >Shop</Link>
            </div> 
            <div className='space-x-8 flex items-center'>
            { userName ? 
              <Link href={`/profile/${UUID}`}>
              <Avatar >
                <AvatarFallback >{ `${userName[0]?.toUpperCase()}${userName[1]}` }</AvatarFallback>
              </Avatar>
              </Link>
              :
          
              <>
                <Link className='' href={'/login'}>Sign in</Link>
                <Link href={'/signup'} className='hover:scale-105 ease-in transition-all hover:bg-white/50 hover:text-black rounded-[30px] px-4 p-2 border-transparent bg-white/60 '>
                <div  >Sign up</div>
                </Link>
            
                </>
            }
            </div>
        </nav>
  )
}

export default HeaderNav