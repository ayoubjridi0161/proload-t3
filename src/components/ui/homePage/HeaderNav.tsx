import Link from 'next/link'
import React from 'react'
import DropDown from '../DropDown';
import { auth } from 'auth';


const HeaderNav = async () => {
  const session = await auth()
  const userName= session?.user?.name
  const image = session?.user?.image
  const UUID = session?.user?.id

  return (
    <nav className='flex items-center justify-between text-white px-[10%] py-3'>
      <h1 className='text-2xl'>Proload</h1>
      
      {UUID ? (
        <>
          <div className='flex gap-20 items-center'>
            <Link className='hover:underline active:text-red-500 text-lg font-semibold' href={'/home'}>Home</Link>
            <Link className='hover:underline text-lg font-semibold active:text-red-500' href={'/workouts'}>Workouts</Link>
            <Link className='hover:underline text-lg font-semibold active:text-red-500' href={'/exercices'}>Exercices</Link>
          </div>
          <div className='cursor-pointer'>
          {image && <DropDown image={image} UUID={UUID ?? ""} userName={userName ?? "Lifter"}/>}
          </div>
        </>
      ) : (
        <>
          <Link className='hover:underline text-lg font-semibold active:text-red-500' href={'/workouts'}>Workouts</Link>
          <Link href={'/login'} className='hover:scale-105 ease-in transition-all border-red-500 border-2 rounded-[30px] px-4 p-2'>
            <div>Join Us</div>
          </Link>
        </>
      )}
    </nav>
  )
}

export default HeaderNav