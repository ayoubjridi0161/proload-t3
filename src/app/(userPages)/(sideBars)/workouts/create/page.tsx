import React from 'react'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import { getExerciceNames } from '~/lib/data'

export default async function page() {
  const exerciceNames = await getExerciceNames()
  
  
  return (
    <div className='h-full w-full p-5 '>
      <CreateWorkout exerciseNames={exerciceNames} />
    </div>
  )


}