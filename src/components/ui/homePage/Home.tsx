import Link from 'next/link'
import React from 'react'
import { Button } from '../button'
import { roboto } from "~/components/ui/font";
import { Input } from '../input';
import HeaderNav from './HeaderNav';
import { TextGenerateEffectDemo } from './Generate-hero-Text';
import { newsLetter } from '~/lib/actions';

export const Home = () => {
  return (
    <main className='bg-white pb-10'>
    <header style={{ backgroundImage: "url('./gym2.jpeg')" }} className='text-card-foreground bg-no-repeat bg-center bg-cover bg-muted-foreground'>
        <HeaderNav />
        <section className='w-[50%] mx-auto pt-36'>
            <h1 className='text-5xl text-center font-semibold'></h1>
            <TextGenerateEffectDemo text='Upgrade your fitness program for a better future' />
            <p className='pt-3 text-center text-xl font-light'>
                Our mission is to unite the gym community by offering a platform where lifters can share their workouts and exchange ideas with one another.
            </p>
            <div className='flex gap-8 mx-auto justify-center mt-5 pb-20'>
                <Button variant="outline" className='hover:bg-slate-50/80 rounded-[30px] text-black'>get started</Button>
                <Button className='rounded-[30px] border-white border-2 bg-transparent hover:bg-slate-50/80 hover:border-transparent hover:text-black'>Learn more</Button>
            </div>
        </section>
    </header>
    <section className='w-9/12 my-7 flex items-center justify-between  bg-white mx-auto'>
    <div className='w-[48%]'>
        <h1 className='text-3xl font-bold mb-6'>Subscribe to Our Newsletter</h1>
        <p className={`${roboto.className} text-sm text-slate-800 `}>Stay updated with the latest fitness tips</p>
    </div>
    <div className='w-[48%] my-16'>
        <h1 className='mb-2 text-sm'>Enter your email</h1>
        <Input type="email" placeholder='exemple@mail.com' />
        <Button formAction={async ()=>{
            "use server"
            console.log("hello")
        }} className='mt-16'>Subscribe</Button>
    </div>
    {/*start journey modal */}
    


        

    </section>
    <div style={{background:"url('./actor.jfif')"}} className='grid place-items-center w-9/12 mx-auto mb-10  h-[300px] shadow-sm'>
        <p className={`${roboto.className} text-white text-[16px]`}>Join Name Today and Start Your Fitness Journey!</p>

    </div>
    </main>
)
}
