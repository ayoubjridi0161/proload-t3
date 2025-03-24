import React from 'react'
import { getUserWorkouts, getWorkoutList } from '~/lib/actions'
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
      <div className="container py-8">
        {/* <h1 className="text-3xl font-bold mb-6">Workout Library</h1>
        <p className="text-muted-foreground mb-8">
          Browse workouts shared by the community. Find the perfect routine for your fitness goals.
        </p> */}
        {/* <WorkoutCards workouts={workouts} /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map(workout => <WorkoutCard key={workout.id} workout={workout} />)}
        </div>
      </div>
    )
}