import React from 'react'
import { Button } from '../button'
import { roboto, inter } from "~/components/ui/font";
import { Input } from '../input';
import HeaderNav from './HeaderNav';
import { TextGenerateEffectDemo } from './Generate-hero-Text';
import Container from '../userDashboard/Container';

export const Home = () => {
    return (
        <main className='bg-white dark:bg-xtraDarkPrimary pb-10'>
            <header style={{ backgroundImage: "url('./gym2.jpeg')" }} className='text-card-foreground bg-no-repeat bg-center bg-cover bg-muted-foreground'>
                <HeaderNav />
                <section className='w-[50%] mx-auto pt-36'>
                    {/* <h1 className='text-5xl text-center font-semibold'></h1> */}
                    <TextGenerateEffectDemo text='Upgrade your fitness program for a better future' />
                    <p className='pt-3 text-center text-xl text-[#f6f8d4] '>
                        Our mission is to unite the gym community by offering a platform where lifters can share their workouts and exchange ideas with one another.
                    </p>
                    <div className='flex gap-8 mx-auto justify-center mt-5 pb-20'>
                        <Button variant="outline" className='hover:bg-slate-50/80 rounded-[30px] text-black'>get started</Button>
                    </div>
                </section>
                <Container className="w-2/3 mt-5 bg-transparent dark:bg-transparent mx-auto text-center p-8 text-[#fff]">
                <h1 className="text-xl font-bold mb-4">Getting Started Guide</h1>
                <div className="space-y-4 text-left">
                    <div className="p-4 bg-transparent dark:border-xtraDark border-1 rounded-lg shadow-sm">
                        <h2 className="font-semibold text-lg mb-2">1. Create Your Profile</h2>
                        <p className="text-sm opacity-70">Set up your profile with your fitness goals and preferences</p>
                    </div>
                    <div className="p-4 bg-transparent dark:border-xtraDark border-1 rounded-lg  shadow-sm">
                        <h2 className="font-semibold text-lg mb-2">2. Choose a Program</h2>
                        <p className="text-sm opacity-70">Select a workout program that matches your goals</p>
                    </div>
                    <div className="p-4 bg-transparent dark:border-xtraDark border-1 rounded-lg  shadow-sm">
                        <h2 className="font-semibold text-lg mb-2">3. Track Your Progress</h2>
                        <p className="text-sm opacity-70">Log your workouts and monitor your improvements</p>
                    </div>
                </div>
            </Container>
            </header>
            
            <section className='w-9/12 my-7 flex items-center justify-between mx-auto'>
                <div className='w-[48%]'>
                    <h1 className='text-3xl font-bold mb-6'>Subscribe to Our Newsletter</h1>
                    <p className={`${inter.className} text-sm text-slate-800 dark:text-xtraContainer `}>Stay updated with the latest fitness tips</p>
                </div>
                <div className='w-[48%] my-16'>
                    <h1 className='mb-2 text-sm'>Enter your email</h1>
                    <Input className='dark:bg-white' type="email" placeholder='exemple@mail.com' />
                    <Button className='mt-4'>Subscribe</Button>
                </div>
                {/*start journey modal */}





            </section>
            <div style={{ background: "url('./actor.jfif')" }} className='grid place-items-center w-9/12 mx-auto mb-10  h-[300px] shadow-sm'>
                <p className={`${inter.className} text-white text-[16px]`}>Join Name Today and Start Your Fitness Journey!</p>

            </div>
        </main>
    )
}
