import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { Button } from '~/components/ui/button'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import WorkoutBox from '~/components/ui/workouts/WorkoutBox'
import WorkoutList from '~/components/ui/workouts/workoutList'
import WorkoutsPage from '~/components/ui/workouts/WorkoutsPage'
import { getWorkoutList } from '~/lib/actions'

export default async function page() {
  
  const workoutSummaryList  = await getWorkoutList()
  
  // console.log(JSON.stringify(workoutSummaryList))
  
  return (
    <div className='h-full w-3/4 mx-auto space-y-5'>          
        <WorkoutList workoutSummaryList={workoutSummaryList}/>
      
    </div>
  )


}