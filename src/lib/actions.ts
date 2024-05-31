"use server"

import { InsertDay, InsertExercice, InsertWorkout, fetchAllWorkouts } from "./data"

export default async function addWorkout(formData : FormData) {
  console.log(formData)
  const workoutID =  await  InsertWorkout({name:formData.get('workoutName') as string })
  if(typeof workoutID !== 'number'){
    return workoutID
  }
  const days = formData.getAll('dayName')
  for(const day of days){
    const dayID = await InsertDay({name:day as string},workoutID)
    if(typeof dayID !== 'number'){
      return dayID
    }
    const exercices = formData.getAll(day as string)
    console.log(exercices)
    for(let exercice of exercices){
      let parsed = JSON.parse(exercice as string)
      await InsertExercice({name:parsed.exName,sets:parsed.sets,reps:parsed.reps},dayID)

    }
  }
}