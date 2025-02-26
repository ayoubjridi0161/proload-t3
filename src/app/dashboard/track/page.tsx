import Image from 'next/image'
import React from 'react'
import Container from '~/components/ui/userDashboard/Container'

const page = async () => {
  return (
    <section className='p-5 w-full '>
        <h1 className='text-lg font-semibold'>Track my workout</h1>
        <p className='opacity-70 text-sm mb-3'>Today, august 24</p>
        <Container className='bg-[#1b512d] bg-opacity-85 w-full grid gap-5 grid-cols-1 md:grid-cols-6 text-[#fcfcfc] content-around justify-center'>
            <Image src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach4.jpg'} className='w-full md:w-1/2 aspect-square' alt={'ach'} width={7} height={1} />
            <div className=''>
                <h1 className='text-xl font-semibold'>Workout:</h1>
                <p className='text-lg opacity-85'>Upper Body</p>
            </div>
            <div className='md:col-start-4'>
                <h1 className='text-lg'>Days: 5</h1>
                <h1 className='text-lg'>Sets: 55</h1>
                <h1 className='text-lg'>Weights: 555kg</h1>
            </div>
            <div>
                <h1 className='text-lg'>Reps: 1200</h1>
                <h1 className='text-lg'>Rest: 2mn</h1>
                <h1 className='text-lg'>Workout ID: </h1>
            </div>
        </Container>
        <Container className='px-7'>
            Choose a workout
            <div className='grid grid-cols-3 justify-stretch  gap-5 '>
            <div  className='bg-white border-1 border-green-900 space-y-2 p-5 text-[#03152d] '>
                <h2 className='text-md font-semibold'>Push Day</h2>
                <p className='text-sm'>Chest,shoulders,triceps</p>
            </div>
            <div  className='bg-white border-1 border-green-900 space-y-2 p-5 text-[#03152d] '>
                <h2 className='text-md font-semibold'>Push Day</h2>
                <p className='text-sm'>Chest,shoulders,triceps</p>
            </div>
            <div  className='bg-white border-1 border-green-900 space-y-2 p-5 text-[#03152d] '>
                <h2 className='text-md font-semibold'>Push Day</h2>
                <p className='text-sm'>Chest,shoulders,triceps</p>
            </div>
            </div>
        </Container>
    </section>
  )
}

export default page