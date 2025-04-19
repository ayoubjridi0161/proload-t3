import React from 'react'
import { getUserWorkouts, getWorkoutList } from '~/lib/actions/workout'
import WorkoutCards from '../neoworkout/workouts-cards'
import { WorkoutCard } from '../neoworkout/workout-card'

type Props = {
    userID:string
    privacy:boolean
}

export default async function WorkoutSection({userID,privacy}: Props) {
  const workoutSummaryList = await getUserWorkouts(privacy,userID)
  const workouts = await Promise.all(workoutSummaryList) 
  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.length > 0 ? workouts.map(workout => <WorkoutCard key={workout.id} workout={workout} />) : <div className='w-[100vw] overflow-x-hidden max-w-full'>No Workouts</div>}
      </div>
    </div>
  )
}