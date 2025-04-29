import React from 'react'
// import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import CreateWorkout from '~/components/ui/workouts/neoCreateWorkout'
import { WorkoutProvider } from '~/components/ui/workouts/WorkoutContext'

import { getExerciceNames } from '~/lib/data'

export default async function page() {
  const exerciseNames = await getExerciceNames()
  
  
  return (
    <div className='h-full w-full p-5 '>
      {/* <CreateWorkout exerciseNames={exerciceNames} />
       */}
        <WorkoutProvider exerciseNames={exerciseNames} >
       <CreateWorkout/>
       </WorkoutProvider>
    </div>
  )


}