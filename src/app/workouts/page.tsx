import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import WorkoutBox from '~/components/ui/workouts/WorkoutBox'
import WorkoutsPage from '~/components/ui/workouts/WorkoutsPage'
import { fetchAllWorkouts } from '~/lib/data'

export default async function page() {
  
  const workoutSummaryList = await fetchAllWorkouts()
  
  
  return (
    <div className='h-full w-full grid'>
      <div className="flex flex-wrap gap-5 justify-center ">
            {
                workoutSummaryList.map((workoutSummary, index) => (
                    <WorkoutBox key={index} workoutSummary={workoutSummary} />
                ))
            }
            </div>
    </div>
  )


}