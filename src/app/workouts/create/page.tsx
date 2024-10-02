import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { Button } from '~/components/ui/button'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import WorkoutsPage from '~/components/ui/workouts/WorkoutsPage'
import { getExerciceNames } from '~/lib/data'

export default async function page() {
  const session = await auth()
  if (!session) {
throw new Error("Not authenticated") }
  const { user } = session
  console.log("user:",user)
  const exerciceNames = await getExerciceNames()
  
  
  return (
    <div className='h-full'>
      <CreateWorkout exerciceNames = {exerciceNames} user ={user?.email} />
    </div>
  )


}