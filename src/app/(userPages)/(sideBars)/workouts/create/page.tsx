import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { Button } from '~/components/ui/button'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import WorkoutsPage from '~/components/ui/workouts/WorkoutsPage'
import { getExerciceNames } from '~/lib/data'

export default async function page() {
  const exerciceNames = await getExerciceNames()
  
  
  return (
    <div className='h-full w-full p-5 '>
      <CreateWorkout exerciseNames={exerciceNames} />
    </div>
  )


}