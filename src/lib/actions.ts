"use server"
import { auth, signIn , signOut } from "auth"
import { InsertDay, InsertExercice, InsertUser, InsertWorkout, addNewReaction, deleteDay, deleteRemovedExercices, fetchAllWorkouts, getDaysByWorkout, getUserByEmail, updateDay, updateExercice,  updateReactions,  updateWorkout } from "./data"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { user } from "./zodValidation"
import { ZodError, any } from "zod"
import { revalidatePath } from "next/cache"
import { DrizzleError } from "drizzle-orm"
export async function editWorkout (formData : FormData){
  
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
  let ParsedDays : {name:string,index:number,dayID:number}[] = days.map(day =>{
    return JSON.parse(day as string)
  })
  ParsedDays =ParsedDays.filter(day => day.name !== 'rest')
  console.log(ParsedDays)
  //get rid of removed days
  const existingDays = await getDaysByWorkout(updatedWorkoutID);
  const daysIds = ParsedDays.map(day => day.dayID)
  for(const id of existingDays){
    if(!daysIds.includes(id))

      await deleteDay(id);
  }
  //end of block
  ParsedDays.map(async day=>{
    let dayID : number | {message:string} ;
    
    if(day.dayID!==-1){
        dayID = await updateDay({name:day.name,dayIndex:day.index},day.dayID ) || {message:"failed"}
      }else{
        dayID = await InsertDay(day,updatedWorkoutID) || {message:"failed"}
      }
    if(typeof dayID !== "number") throw new Error("updating day failed!")
  const exercices  = formData.getAll(day.index.toString())

  const parsedExercices : {name:string,sets:number,reps:number,id:number}[] = exercices.map(exercice => JSON.parse(exercice as string))
  //get rid of removed exercices
  await deleteRemovedExercices(parsedExercices.map(ex => ex.id),dayID)  
  parsedExercices.map(async ex =>{
    if(ex.id!==-1){
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
  console.log(days)
  

  const parsedDays : {name:string,index:number,dayID:number}[]= days.map((day)=>JSON.parse(day as string))
  //cast the indexes to integers
  
  const sortedDays = parsedDays.sort((a, b) => (a.index - b.index)).filter(day => day.name !== "rest")
  

  for(const eachDay of sortedDays){
    const dayID = await InsertDay({name:eachDay.name,index:eachDay.index},workoutID)
    if(typeof dayID !== 'number'){
      return dayID
    }
    
    const exercices = formData.getAll(eachDay.index.toString())
    // console.log(exercices)
    for(let exercice of exercices){
      const parsed : {name:string,sets:number,reps:number,id:number} = JSON.parse(exercice as string)
      await InsertExercice({name:parsed.name,sets:parsed.sets,reps:parsed.reps},dayID)
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
export const newsLetter = async ()=>{
  console.log("hello")
}
export const addUserReaction = async (workoutID:number,EUR:boolean,action:{type:"upvote"|"downvote"|"clone",payload:boolean})=>{
  const session = await auth();
  const id = session?.user?.id;
  if(!id) {throw new Error ("no user authenticated")}
    if(!EUR) {const res = await addNewReaction(id,workoutID);
      if(res.message !== "success" ) throw new Error(res.message)
    }
  const res = await updateReactions(id,workoutID,action)
  revalidatePath(`workouts/${workoutID}`)
  return res
}
