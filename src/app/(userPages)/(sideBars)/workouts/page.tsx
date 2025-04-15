import React from 'react'
import WorkoutCards from '~/components/ui/neoworkout/workouts-cards'
import { getWorkoutList } from '~/lib/actions'

type Props = {}

export default async function page({}: Props) {
    const workoutSummaryList = await getWorkoutList()
    const workouts = await Promise.all(workoutSummaryList) 
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Workout Library</h1>
      <p className="text-muted-foreground mb-8">
        Browse workouts shared by the community. Find the perfect routine for your fitness goals.
      </p>
      <WorkoutCards workouts={workouts} />
    </div>
  )
}