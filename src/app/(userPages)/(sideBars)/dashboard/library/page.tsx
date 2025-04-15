import React, { Suspense } from 'react'
import { Button } from '~/components/ui/button'
import { andika } from '~/components/ui/font'
import Container from '~/components/ui/userDashboard/Container'
import Image from 'next/image'
import { Chip } from '@nextui-org/react'
import WorkoutSkeleton from '~/components/ui/workoutShowCase/skeleton/workoutSkeleton'
import Workout from '~/components/ui/workoutShowCase/Workout'
import { getUserCurrentWorkout } from '~/lib/actions'


type Props = {}

export default async function page({}: Props) {
    const workout = await getUserCurrentWorkout()
  return (
    <section className={`${andika.className} w-full space-y-5 p-5 text-[#707877]`} >
          <div>
            <h1 className="text-lg font-semibold">workout library</h1>
            <p className="mb-3 text-sm opacity-70">Today, august 24</p>
          </div>
          <div className='grid grid-cols-2 w-9/12 mx-auto gap-7'>
            <Container className='shadow-md space-y-3'>
                    <div className='p-2 rounded-full bg-slate-200 w-fit'><DumbbellIcon/></div>
                    <h1 className='font-bold text-lg'>Next Wrokout</h1>
                    <p className='text-xs'>Achieved today - 15kg increase</p>
                    <Button className='bg-xtraGreen'>Share</Button>
            </Container>
            <Container className='shadow-md space-y-3'>
                    <div className='p-2 rounded-full bg-slate-200 w-fit'><DumbbellIcon/></div>
                    <h1 className='font-bold text-lg'>Next Wrokout</h1>
                    <p className='text-xs'>Achieved today - 15kg increase</p>
                    <Button className='bg-xtraGreen'>Share</Button>
            </Container>
          </div>
          <div className='grid grid-cols-3 '>
            {workout &&
          <Container className="col-span-2 text-xtraGray bg-xtraDark h-fit">
            <Suspense fallback={<WorkoutSkeleton/>}>
                <Workout fetchedWorkout={workout} />
            </Suspense>
          </Container>
          }
            <div className='p-6 space-y-3'>
                {Array.from({length:3}).map((item,index)=>(
                    <Container className='space-y-3' key={index}>
                    <div className='flex'>
                        <div>
                        <Image src="https://s3.eu-north-1.amazonaws.com/proload.me/ach3.jpg" width={180} height={180} alt='hello'/>
                        </div>
                        <div className='px-5 space-y-1'>
                            <h1 className='text-md font-bold'>Full body Strength</h1>
                            <p className='text-xs'>A comprehensive workout targeting all major muscle groups for overall strength and conditioning</p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                    <Chip className='bg-xtraDark text-xtraBG'>Mon</Chip>
                    <Chip className='bg-xtraDark text-xtraBG'>Wed</Chip>
                    <Chip className='bg-xtraDark text-xtraBG'>Fri</Chip>
                    </div>
                    <div className='flex items-center  justify-between'>
                        <p className='text-xs'>Duration: <span className='font-bold'>60 min</span></p>
                        <Button size="sm" className='bg-xtraGreen text-xtraText'>Start workout</Button>
                    </div>
                </Container>
                ))}
            </div>
          </div>

    </section>
  )
}
const DumbbellIcon = ()=>{
    return(<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
        <path fill="#00c846" d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22l1.43-1.43L16.29 22l2.14-2.14l1.43 1.43l1.43-1.43l-1.43-1.43L22 16.29z" strokeWidth={0.7} stroke="#00c846"></path>
    </svg>)
}