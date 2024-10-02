import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback } from '../avatar';
import { redirect } from 'next/navigation'
import { getUserByEmail } from '~/lib/data';
import DropDown from '../DropDown';
import { signout } from '~/lib/actions';
import { Button } from '../button';
import { auth } from 'auth';


const HeaderNav = async () => {
  const session = await auth()
  const userName= session?.user?.name
  const image = session?.user?.image
  const UUID = session?.user?.id
  // console.log("uuid is:",UUID)
  
  
  
  return (
    <nav className=' flex items-center justify-between text-white  px-[10%] py-3'>
            <h1 className=' text-2xl'>Proload</h1>
            <div className=' flex gap-20 items-center'>
                <Link className='hover:underline active:text-red-500 text-lg font-semibold' href={'/'} >Home</Link>
                <Link className='hover:underline text-lg font-semibold active:text-red-500' href={'/workouts'} >Workouts</Link >
                <Link className='hover:underline text-lg font-semibold active:text-red-500' href={'/posts'} >Posts</Link>
                <Link className='hover:underline text-lg font-semibold active:text-red-500' href={'/exercices'} >Exercices</Link>
                
            </div> 
            <div className='space-x-8 flex items-center'>
            { userName  ?
             image &&
              <DropDown image = {image} UUID={UUID || ""} userName={userName}/> 
             
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