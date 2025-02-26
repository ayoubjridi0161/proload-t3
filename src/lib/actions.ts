"use server"
import { auth, signIn , signOut } from "auth"
import { InsertDay, InsertExercice,  InsertWorkout, addNewReaction, deleteDay, deleteRemovedExercices, fetchAllWorkouts, getDaysByWorkout, getNumberOfWorkoutsPerUser, getProfileByID, getUserByEmail, getWorkoutsByUser, updateDay, updateExercice,  updateReactions,  updateUserProfile,  updateWorkout } from "./data"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { user } from "./zodValidation"
import { ZodError, any } from "zod"
import { revalidatePath } from "next/cache"
import { DrizzleError } from "drizzle-orm"
import { seedDatabase } from "~/server/db/seed"
import {S3Client,PutObjectCommand } from "@aws-sdk/client-s3"
import { nanoid} from "nanoid"
import {createPresignedPost} from "@aws-sdk/s3-presigned-post"
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
    await signIn('credentials',formData );
    console.log("logged")
     
     
    return {message:"success"}
    
    
  } catch (error) {
    if(error instanceof AuthError){
      if(error.cause?.err instanceof ZodError) return {message: "invalid credentials"}
      return {message:error.cause?.err?.message || "error"}
    } 
    
  }
}
// export const signup = async (prev : any ,formData : FormData)=>{
//   try{
//     console.log(formData)
//    const parsed = user.safeParse({username:formData.get('username') as string,email:formData.get('email') as string,password:formData.get('password') as string})
//   if(parsed.success){
//     const response = await InsertUser(parsed.data)
//     return {message:"success"}
    
//   }
//   }catch(err){
//     if(err instanceof DrizzleError){
//       console.log(err)
//     return {message:err.cause?.constraint }
//   }
//   }
// }
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
  
        await signIn("github", { redirectTo: process.env.REDIRECT_URL })
     
}

export const googleSignIn = async ()=> {
  
  await signIn("google", { redirectTo: process.env.REDIRECT_URL })

}
export const newsLetter = async ()=>{
  console.log("hello")
}
export const addUserReaction = async (workoutID:number,EUR:boolean,action:{type:"upvote"|"downvote"|"clone",payload:boolean})=>{
  const session = await auth();
  const id = session?.user?.id;
  if(!id) {throw new Error ("no user authenticated")}
  if(action.type==="clone"){
    const res = await getNumberOfWorkoutsPerUser(id)
    console.log(res)
    if(res.NumberOfWorkouts !== undefined && res.NumberOfWorkouts<3){
      const res = await updateReactions(id,workoutID,action)
      revalidatePath(`workouts/${workoutID}`)
      return res
    }else return("workout limit exeeded")
  }
    if(!EUR) {const res = await addNewReaction(id,workoutID);
      if(res.message !== "success" ) throw new Error(res.message)
    }
  const res = await updateReactions(id,workoutID,action)
  revalidatePath(`workouts/${workoutID}`)
  return res
}

export const getWorkoutByUser = async (email:string)=>{
  try{
    const session = await auth()
    const UUID = session?.user?.id
    if(!UUID) throw new Error ("not authed")
  const workoutIDs = await getWorkoutsByUser(UUID)
  return {res:workoutIDs,err:null}
}catch(err){
  return {res:null,err:err}
}
}
export const seed = async ()=>{
  await seedDatabase()
}
export async function signInWithResend(formData
  :FormData) {
    console.log(formData)
    await signIn('resend',formData)
  
}
export const getUserProfile = async (id:string)=>{
  const user = getProfileByID(id)
  return user
}

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION ,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NEXT_AWS_S3_ACCESS_KEY || ''
  }
})

export const uploadFiles = async (prevState : {message:string,status?:string} | null  , formData: FormData)=>{
  try{
    const file = formData.get("file")
     
    if((file as File).size === 0) return {status:"failure" , message : "please add an image"}
      console.log("sendingFile")
      const {url,fields} = await createPresignedPost(
        s3Client,
        {
        Bucket : process.env.NEXT_AWS_S3_BUCKER_NAME || '' ,
        Key : nanoid()
      })
      const formDataS3 = new FormData()
      Object.entries(fields).forEach(([Key,value])=>{
        formDataS3.append(Key,value)
      })
      formDataS3.append('file',file as string)
      const response = await fetch(url,{
        method:'POST',
        body:formDataS3
      }) 
      const text = await response.text()
       console.log(text)
      if(response.ok){console.log("file uploaded")}else{console.log("file error not uplaoded")}

    revalidatePath("/")
    return {status:"success", message:"file has been uploaded"}
  }catch(error){

    return {status:"failure", message:"file has not been uploaded"}

  }
}
// export const sendFileToS3 = async (fileName : string ,file : Buffer |string |File)=>{
//   const fileBuffer = file
//   const params = {
//     Bucket : process.env.NEXT_AWS_S3_BUCKER_NAME,
//     Key : `${fileName}`,
//     body:fileBuffer,
//     contentType : "image/jpg"
//   }
//   const command = new PutObjectCommand(params)
//   try {
//     const res = await s3Client.send(command)
//     console.log("res:=>",res)
//     return fileName
//   }catch(err){
//     console.error("Upload error:", err);
//     throw err
//   }
// }

export const updateUserProfileAction = async (prev:any , formdata:FormData)=>{
  try{
  const res = await updateUserProfile({username:formdata.get("username") as string},formdata.get("userID") as string)
  revalidatePath('/profile/edit/details')
  return {message:res ? "success" : "failure"}
  }catch(err){
    console.log(err)
    return "failure"
  }
}