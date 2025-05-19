
import React from 'react'
import { Button } from '../button'
import Link from 'next/link'
import { getExerciceByName, getExerciceNames } from '~/lib/data';
import MuscleGroupRadarChart from '~/components/component/MuscleChart';
import FlippingCard from '../UIverse/FlippingCard';
type workoutSummary =Promise<{
  name: string;
  id: number;
  exercices: {
      mg: string;
      exerciseCount: number;
  }[];
}>
const  WorkoutBox = async ({workoutSummary}:{workoutSummary : workoutSummary }) => {
  // const exercices = await Promise.all(workoutSummary.exercices)
  const workout = await workoutSummary
  // console.log(data);
  return (
    <Link href={`/workouts/${workout.id}`} className='bg-slate-200 min-h-64 w-72 cursor-pointer border-border  p-4 rounded-md shadow-md'>
        <div className='flex gap-1 items-center'>
      <h2 className='text-xl font-bold text-slate-700'>{workout.name}</h2>
      <Button className='text-primary '  variant={'link'}>{'>>'}</Button>
      </div>
      {/* <h1 className='text-black font-light text-sm opacity-35 '>by {workout.users?.name}</h1> */}

      <div className=''>
        
          <div className='opacity-50 hover:opacity-90'>
          <MuscleGroupRadarChart data={workout.exercices} />
          {/* {JSON.stringify(workout.exercices)} */}
          </div>
        
        
      </div>

    </Link>

  )
}
export default WorkoutBox