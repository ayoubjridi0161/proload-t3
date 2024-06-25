"use server"
import { signIn } from "auth"
import { InsertDay, InsertExercice, InsertUser, InsertWorkout, fetchAllWorkouts, getUserByEmail } from "./data"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { user } from "./zodValidation"
export default async function addWorkout(formData : FormData) {
  const user = await getUserByEmail(formData.get('email') as string)
  if(!user){
    return {message:"user not found"}
  }
  // for now workouts don't have descroption
  // const description = formData.get('description') as string || '';  
  const workoutID =  await  InsertWorkout({name:formData.get('workoutName') as string,userId:user,description: '' })
  if(typeof workoutID !== 'number'){
    return workoutID
  }

  const days = formData.getAll('day')

  const parsedDays = days.map((day)=>JSON.parse(day as string))
  //cast the indexes to integers
  for(let day of parsedDays){
    day.index = parseInt(day.index)
  }
  const sortedDaysIndexes = parsedDays.map(day=>day.index).sort((a,b)=>a-b)
  const sortedDays = []
  for(let index of sortedDaysIndexes){
    sortedDays.push(parsedDays.filter((day)=>day.index===index)[0].name) 
  }

  for(let i =0 ; i<sortedDays.length ; i++){
    if(sortedDays[i] === 'rest') continue;
    const dayID = await InsertDay({name:sortedDays[i] as string,index:i+1},workoutID)
    if(typeof dayID !== 'number'){
      return dayID
    }
    
    const exercices = formData.getAll(sortedDays[i] as string)
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
    await signIn('credentials',formData );
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
  