"use server"
import { signIn , signOut } from "auth"
import { InsertDay, InsertExercice, InsertUser, InsertWorkout, fetchAllWorkouts, getUserByEmail, updateDay, updateExercice, updateWorkout } from "./data"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { user } from "./zodValidation"
import { ZodError, any } from "zod"
import { revalidatePath } from "next/cache"
import { DrizzleError } from "drizzle-orm"
export async function editWorkout (formData : FormData){
  console.log(formData)
  
  const user = await getUserByEmail(formData.get('email') as string)
  if(!user){
    return {message:"user not found"}
  }
  try{
  const updatedWorkoutID = await updateWorkout({numberOfDays:parseInt(formData.get('NoD') as string),name:formData.get('workoutName') as string,description:''},Number(formData.get('workoutID')))
  if(!updatedWorkoutID){
    throw new DrizzleError({message:"failed to update workout"})
  }
  let days = formData.getAll('day')  
  let ParsedDays : {name:string,index:number,dayID?:number}[] = days.map(day =>{
    return JSON.parse(day as string)
  })
  ParsedDays =ParsedDays.filter(day => day.name !== 'rest')
  console.log(ParsedDays)
  ParsedDays.map(async day=>{
    let dayID : number | {message:string} ;
    
    if(day.hasOwnProperty('dayID')){
        dayID = await updateDay({name:day.name,dayIndex:day.index},(day.dayID || -1)) || {message:"failed"}
      }else{
        dayID = await InsertDay(day,updatedWorkoutID) || {message:"failed"}
      }
    if(typeof dayID !== "number") throw new Error("updating day failed!")
  const exercices  = formData.getAll(day.index.toString())
  const parsedExercices : {name:string,sets:number,reps:number,id:number}[] = exercices.map(exercice => JSON.parse(exercice as string))
  parsedExercices.map(async ex =>{
    if(ex.hasOwnProperty('id')){
      updateExercice({name:ex.name,sets:ex.sets,reps:ex.reps},ex.id)
    }else{
      await InsertExercice({name:ex.name,sets:ex.sets,reps:ex.reps},dayID)
  }})
  }
  )
  return {message:"success"}
}catch(err){
  if(err instanceof DrizzleError)
    throw new DrizzleError({message:"error in updationitification"})  
    else console.log("error is : " , err)
  }
}
export default async function addWorkout(formData : FormData) {
  console.log(formData)
  const user = await getUserByEmail(formData.get('email') as string)
  if(!user){
    return {message:"user not found"}
  }
  // for now workouts don't have descroption
  // const description = formData.get('description') as string || '';  
   const workoutID =  await  InsertWorkout({name:formData.get('workoutName') as string,userId:user,description: 'new description',numberOfDays:parseInt(formData.get('NoD') as string),published:formData.get('published') === 'true'})
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
      const parsed : {exName:string,sets:number,reps:number} = JSON.parse(exercice as string)
      await InsertExercice({name:parsed.exName,sets:parsed.sets,reps:parsed.reps},dayID)
    }
  }
}
export const login = async (previous : any , formData : FormData)=>{
  // console.log(formData)
  try {
    const returned = await signIn('credentials',formData );
    if(returned){
    }
    revalidatePath("/login")
    
  } catch (error) {
    if(error instanceof AuthError){
      if(error.cause?.err instanceof ZodError) return {message: "invalid credentials"}
      return {message:error.cause?.err?.message || "error"}
    } 
    
  }
    // Otherwise if a redirects happens NextJS can handle it
    // so you can just re-thrown the error and let NextJS handle it.
    // Docs:
    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
    
  
}
export const signup = async (prev : any ,formData : FormData)=>{
  try{
    console.log(formData)
   const parsed = user.safeParse({username:formData.get('username') as string,email:formData.get('email') as string,password:formData.get('password') as string})
  if(parsed.success){
    const response = await InsertUser(parsed.data)
    return {message:"success"}
    
  }
  }catch(err){
    if(err instanceof DrizzleError){
      console.log(err)
    return {message:err.cause?.constraint }
  }
  }
}
export const signout = async ()=>{
  await signOut()
  revalidatePath('/')
}

export const postWorkouts = async (prev : any , formData : FormData) =>{
  try{
    const data = await fetchAllWorkouts()
    return data
  }catch(err){
    return {}
  }

}
export const githubSignIn = async ()=> {
  
        await signIn("github")
     
}