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
    <Link href={`/workouts/${workoutSummary.id}`} className='bg-primary-foreground cursor-pointer border-border  p-4 rounded-md shadow-md'>
        <h1 className='text-card-foreground font-bold'>{workoutSummary.users?.username}</h1>
        <div className='flex gap-1 items-center'>

      <h2 className='text-lg font-semibold text-primary'>{workoutSummary.name}</h2>
      <Button className='text-primary '  variant={'link'}>{'>>'}</Button>
      </div>
      <div className=''>
        {workoutSummary.days.map((day, index) => (
            <div key={index} className='p-2 flex items-center '>
                <h3 className='text-lg font-semibold text-foreground'>{day.name} :</h3>
                <p className='text-muted-foreground text-md '>
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