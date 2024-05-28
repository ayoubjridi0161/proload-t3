import React, { Suspense } from 'react'
import { fetchWorkoutById } from '~/lib/data'

export default async function WorkoutsPage() {
    const workout = await fetchWorkoutById(19);
  return (
        <div>{JSON.stringify(workout)}</div>

)
}