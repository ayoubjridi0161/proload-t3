import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { Button } from '~/components/ui/button'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import WorkoutsPage from '~/components/ui/workouts/WorkoutsPage'
import { getExerciceNames } from '~/lib/data'
import { useAuth } from '~/lib/hooks/useAuth'

export default async function page() {
  const {sessionToken}= await useAuth()
  if (!sessionToken) {
    throw new Error("Not authenticated") }
  const exerciceNames = await getExerciceNames()
  
  
  return (
    <div className='h-full'>
      <CreateWorkout exerciceNames = {exerciceNames} token ={sessionToken} />
    </div>
  )


}