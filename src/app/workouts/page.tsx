import React from 'react'
import CreateWorkout from '~/components/ui/workouts/CreateWorkout'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='h-full'>
      <CreateWorkout />
    </div>
  )
}