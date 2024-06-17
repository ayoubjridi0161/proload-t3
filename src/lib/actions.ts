"use server"

import { signIn } from "auth"
import { InsertDay, InsertExercice, InsertUser, InsertWorkout, fetchAllWorkouts, getUserByEmail } from "./data"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { user } from "./zodValidation"

export default async function addWorkout(formData : FormData) {
  console.log(formData)
  const user = await getUserByEmail(formData.get('email') as string)
  if(!user){
    return {message:"user not found"}
  }
  const workoutID =  await  InsertWorkout({name:formData.get('workoutName') as string,userId:user })
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
    // console.log(exercices)
    for(let exercice of exercices){
      let parsed = JSON.parse(exercice as string)
      await InsertExercice({name:parsed.exName,sets:parsed.sets,reps:parsed.reps},dayID)

    }
  }
}
export const login = async (formData : FormData)=>{
  // console.log(formData)
  try {
    await signIn('credentials',formData as FormData);
  } catch (error) {
    if (error instanceof AuthError) {
      // return redirect(`/workouts`)//later redirect to error page
      return {message:"error in login"}
    }
    // Otherwise if a redirects happens NextJS can handle it
    // so you can just re-thrown the error and let NextJS handle it.
    // Docs:
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    throw error
  }
  

}
export const signup = async (formData : FormData)=>{
  try{
   const parsed = user.safeParse({username:formData.get('username') as string,email:formData.get('email') as string,password:formData.get('password') as string})
  if(parsed.success){
    InsertUser(parsed.data)
  }
  redirect('/login');
  }catch(err){
    return {message:"error"}
  }
}
  