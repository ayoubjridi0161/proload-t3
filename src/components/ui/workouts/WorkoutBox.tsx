import React from 'react'
import { Button } from '../button'
import Link from 'next/link'

const WorkoutBox = () => {
    const workoutSummary = {
    title: 'Workout Title',
    days:[{
        day: 'push',
        MusclesTargeted: 'chest, shoulder, triceps'
    },
    {
        day: 'pull',
        MusclesTargeted: 'back, biceps, traps',
    },
    {
        day: 'legs',
        MusclesTargeted: 'quads, hamstrings, calves',
    },
    {
        day: 'core',
        MusclesTargeted: 'abs, obliques, lower back',
    }
]

    }
  return (
    <Link href={"/"} className='bg-white cursor-pointer  p-4 rounded-md shadow-md'>
        <div className='flex gap-1 items-center'>
      <h2 className='text-lg font-semibold text-gray-800'>{workoutSummary.title}</h2>
      <Button size={'sm'} variant={'secondary'}>{'>>'}</Button>
      </div>
      <div className='flex flex-wrap'>
        {workoutSummary.days.map((day, index) => (
            <div key={index} className='p-2     '>
                <h3 className='text-lg font-semibold text-gray-700'>{day.day}</h3>
                <p className='text-slate-500 text-md '>Muscles Targeted: <span className='text-sm font-extralight px-1' >
                    {day.MusclesTargeted}
                </span> </p>
            </div>
            )
    )    
        }
      </div>

    </Link>

  )
}
export default WorkoutBox