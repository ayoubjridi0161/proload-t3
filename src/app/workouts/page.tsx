import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import WorkoutsPage from '~/components/ui/workouts/WorkoutsPage'

export default async function page() {
  const session = await auth()
  if(session){
  const { user } = session
  
  
  return (
    <div className='h-full'>
      <CreateWorkout user ={user?.email} />
    </div>
  )
}
else redirect('/login')

}