import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { Button } from '~/components/ui/button'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import WorkoutBox from '~/components/ui/workouts/WorkoutBox'
import WorkoutsPage from '~/components/ui/workouts/WorkoutsPage'
import { fetchAllWorkouts, getExerciceNames } from '~/lib/data'

export default async function page() {
  
  const workoutSummaryList = await fetchAllWorkouts()
  // console.log(workoutSummaryList)
  
  return (
    <div className='h-full w-3/4 mx-auto space-y-5'>
        <form action={async ()=>{
          "use server"
          redirect('/workouts/create')
        }} className='grid px-20 '>
          
        <Button  className='text-lg place-self-end w-fit' size={'lg'}
        >Create</Button>
        </form>
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