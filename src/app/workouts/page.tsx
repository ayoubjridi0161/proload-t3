import React, { Suspense } from 'react'
import Container from '~/components/ui/Container'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'
import WorkoutsPage from '~/components/ui/workouts/WorkoutsPage'

export default async function page() {
  
  return (
    <Container className='h-full'>
      <CreateWorkout />
    </Container>
  )
}