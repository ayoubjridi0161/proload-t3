import Link from 'next/link'
import React from 'react'
import { useAuth } from '~/lib/hooks/useAuth'
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
  const UUID = session?.user?.id
   
  
  
  return (
    <nav className=' flex items-center justify-between text-white  px-[10%] py-3'>
            <h1 className=' text-2xl'>Proload</h1>
            <div className=' flex gap-20 items-center'>
                <Link className='hover:underline active:text-red-500 text-lg font-semibold' href={'/'} >Home</Link>
                <Link className='hover:underline text-lg font-semibold active:text-red-500' href={'/workouts'} >Community</Link >
                <Link className='hover:underline text-lg font-semibold active:text-red-500' href={'/'} >Shop</Link>
                <form action={signout}>
                  <Button variant={'outline'} className='text-black hover:text-red-600 focus:bg-slate-500' type='submit'>log out</Button>
                </form>
            </div> 
            <div className='space-x-8 flex items-center'>
            { userName ?
              <DropDown UUID={UUID || ""} userName={userName}/> 
              
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