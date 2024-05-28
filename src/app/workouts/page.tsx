import React, { Suspense } from 'react'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import WorkoutsPage from '~/components/ui/workouts/WorkoutsPage'

export default async function page() {
  
  return (
    <div className='h-full'>
      <CreateWorkout />
    </div>
  )
}