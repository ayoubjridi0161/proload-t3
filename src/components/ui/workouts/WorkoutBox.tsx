import React from 'react'
import { Button } from '../button'
import Link from 'next/link'
type workoutSummary ={
    id:number;
    name: string;
    users: {
        username: string;
    } | null;
    days: {
        name: string;
        exercices: {
            name: string;
        }[];
    }[];
}
const WorkoutBox = ({workoutSummary}:{workoutSummary : workoutSummary }) => {
    
  return (
    <Link href={`/workouts/${workoutSummary.id}`} className='bg-slate-200 min-h-64 w-72 cursor-pointer border-border  p-4 rounded-md shadow-md'>
        <h1 className='text-black font-semibold text-xl'>{workoutSummary.users?.username}</h1>
        <div className='flex gap-1 items-center'>

      <h2 className='text-lg font-semibold text-slate-700'>{workoutSummary.name}</h2>
      <Button className='text-primary '  variant={'link'}>{'>>'}</Button>
      </div>
      <div className=''>
        {workoutSummary.days.map((day, index) => (
            <div key={index} className='p-2 flex items-center '>
                <h3 className='text-lg font-semibold text-slate-600'>{day.name} :</h3>
                <p className='text-black text-md font-medium'>
                    {day.exercices.splice(0,3).map((exercice,i) => (
                        <span key={i} className='text-sm font-extralight px-1' >{exercice.name} 
                </span> 
            ))}
                    {
                    }</p>
            </div>
            )
    )    
        }
      </div>

    </Link>

  )
}
export default WorkoutBox