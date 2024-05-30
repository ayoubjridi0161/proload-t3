"use server"

import { signIn } from "auth"
import { InsertDay, InsertExercice, InsertWorkout, fetchAllWorkouts , fetchUserByEmail } from "./data"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function getUser(){
  const user  = await fetchUserByEmail('jridiayoub700@gmail.com');
  return user
}
export async function addWorkout(formData : FormData) {
  console.log(formData)
  const workoutID =  await  InsertWorkout({name:formData.get('workoutName') as string ,})
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
export const authenticate = async (prevState: string | undefined,
  formData: FormData,) =>{
    try{
    await signIn("credentials",formData)
    // redirect(prevState || '/workouts')
    redirect('/workouts')
    }catch(err){
      if(err instanceof AuthError){
    switch (err.type) {
      case 'CredentialsSignin':
        return 'Invalid credentials. Please try again.';
      default:
        return 'Something went wrong.';
    }}
    throw err 
}
}
export async function signInWithGithub(){
  await signIn('github')
}