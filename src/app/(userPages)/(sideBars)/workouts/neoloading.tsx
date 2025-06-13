import React from 'react'
import './loading.css'
import { NeoWorkoutHeader } from '~/components/ui/neoworkout/header'
import { WorkoutCardSkeleton } from '~/components/skeletons/workout-cardSkeleton'
import Container from '~/components/ui/userDashboard/Container'
const loading = () => {
  return (
    <Container className='py-8 space-y-4 w-full'>
        <NeoWorkoutHeader/>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 p-4">
            {
                Array.from({length: 9}, (_, index) => (
                    <WorkoutCardSkeleton key={index}/>
                ))
            }
        </div>
    </Container>
  )
}

export default loading