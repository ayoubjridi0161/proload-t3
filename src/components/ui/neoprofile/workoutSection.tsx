import React from 'react'
import { getUserWorkouts, getWorkoutList } from '~/lib/actions/workout'
import WorkoutCards from '../neoworkout/header'
import { WorkoutCard } from '../neoworkout/workout-card'

type Props = {
    userID:string
    privacy:boolean
}
const emptyWorkout = {
  exercices: [{
    mg: "back",
    exerciseCount: 0
  }],
  id: 0,
  name: "random",
  username: null,
  description: "",
  numberOfDays: null,
  dayNames: [],
  upvotes: 0,
  userId: null
}


export default async function WorkoutSection({userID,privacy}: Props) {
  const workoutSummaryList = await getUserWorkouts(privacy,userID)
  const workouts = await Promise.all(workoutSummaryList) 
  return (
    <div className="w-full py-8">
      <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.length > 0 ? workouts.map(workout => <WorkoutCard key={workout.id} workout={workout} />) : <div className='w-full text-center'>No Workouts</div>}
      </div>
    </div>
  )
}