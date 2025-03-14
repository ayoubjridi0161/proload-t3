"use server"
import { auth, signIn , signOut } from "auth"
import { InsertDay, InsertExercice,  InsertWorkout, addLike, addLogs, addNewReaction, createPost, deleteDay, deleteRemovedExercices, fetchAllWorkouts, getDaysByWorkout, getExerciceByName, getMuscleGroups, getNumberOfWorkoutsPerUser, getProfileByID, getUserByEmail, getUserByID, getWorkoutsByUser, isLiked, removeLike, updateDay, updateExercice,  updateReactions,  updateUserProfile,  updateWorkout } from "./data"
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
      // return {message:"user not found"}
      throw new Error("user not found")
    }
    try{
    const updatedWorkoutID = await updateWorkout({numberOfDays:parseInt(formData.get('NoD') as string),name:formData.get('workoutName') as string,description:''},Number(formData.get('workoutID')))
    if(!updatedWorkoutID){
      throw new DrizzleError({message:"failed to update workout"})
    }
  
  
  const days = formData.getAll('day') 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let ParsedDays : {name:string,index:number,dayID:number}[] = days.map(day =>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  ParsedDays.map(async day=>{
    let dayID : number | {message:string} ;
    
    if(day.dayID!==-1){
        dayID = await updateDay({name:day.name,dayIndex:day.index},day.dayID ) ?? {message:"failed"}
      }else{
        dayID = await InsertDay(day,updatedWorkoutID) ?? {message:"failed"}
      }
    if(typeof dayID !== "number") throw new Error("updating day failed!")
  const exercices  = formData.getAll(day.index.toString())

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
  const parsedExercices : {name:string,sets:number,reps:number,id:number}[] = exercices.map(exercice => JSON.parse(exercice as string))
  //get rid of removed exercices
  await deleteRemovedExercices(parsedExercices.map(ex => ex.id),dayID)  
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  parsedExercices.map(async ex =>{
    if(ex.id!==-1){
      void updateExercice({name:ex.name,sets:ex.sets,reps:ex.reps},ex.id)
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
    // return {message:"user not found"}
    throw new Error("user not found") 
  }
  // for now workouts don't have descroption
  // const description = formData.get('description') as string || '';  
   const workoutID =  await  InsertWorkout({name:formData.get('workoutName') as string,userId:user,description: 'new description',numberOfDays:parseInt(formData.get('NoD') as string),published:formData.get('published') === 'true'})
  if(typeof workoutID !== 'number'){
    // return  {message:"failed to insert workout"}
    throw new Error("failed to insert workout") 
  }

  const days = formData.getAll('day')
  console.log(days)
  

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
  const parsedDays : {name:string,index:number,dayID:number}[]= days.map((day)=>JSON.parse(day as string))
  //cast the indexes to integers
  
  const sortedDays = parsedDays.sort((a, b) => (a.index - b.index)).filter(day => day.name !== "rest")
  

  for(const eachDay of sortedDays){
    const dayID = await InsertDay({name:eachDay.name,index:eachDay.index},workoutID)
    if(typeof dayID !== 'number'){
      // return {message:"failed to insert day"}
      throw new Error("failed to insert day")
    }
    
    const exercices = formData.getAll(eachDay.index.toString())
    // console.log(exercices)
    for(const exercice of exercices){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      return {message:error.cause?.err?.message ?? "error"}
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
export const newsLetter = ()=>{
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
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.NEXT_AWS_S3_ACCESS_KEY ?? ''
  }
})

export const uploadFiles = async (prevState : {message:string,status?:string, url? : string| null} , formData: FormData)=>{
  try{
    const file = formData.get("file")
    const textData = formData.get("text") as string
     console.log(file,textData);
     return {status:"failure" , message : "please add an image"}
     
    if((file as File).size === 0) return {status:"failure" , message : "please add an image"}
      console.log("sendingFile")
      const {url,fields} = await createPresignedPost(
        s3Client,
        {
        Bucket : process.env.NEXT_AWS_S3_BUCKER_NAME ?? '' ,
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
      if(response.ok){
        console.log(fields.key)
        revalidatePath("/")
        return {status:"success", message:`${url}/${fields.key}`, url: `${url}/${fields.key}`, text: textData}
      }else{
        console.log("file error not uploaded")
        return {status:"failure", message:"file has not been uploaded"}
      }
  }catch(error){
    console.log(error)
    return {status:"failure", message:"file has not been uploaded"}
  }
}

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

export const logWorkoutAction = async (prev:any , formdata:FormData)=> {
  try {
    const session = await auth();
    const userID = session?.user?.id;
    if (!userID) throw new Error("no user found");
    const workoutID = user?.currentWorkout
    const dayName = formdata.get("dayName") as string;
    const exercises: any[] = [];
    const parsedExercises: { name: string; sets: { setIndex: string; weight: string }[] }[] = [];

    formdata.forEach((value, key) => {
      if (key.startsWith("ex.")) {
        exercises.push(key);
      }
    });
    exercises.forEach((key: string) => {
      const [_, name, __, setIndex] = key.split(".");
      const weight = formdata.get(key) as string;
      if (weight) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let exercise = parsedExercises.find(ex => ex.name === name) as { name: string; sets: { setIndex: string; weight: string }[] } | undefined;
        if (!exercise) {
          exercise = { name: name ?? '', sets: [] };
          if (exercise) {
            parsedExercises.push(exercise);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (setIndex) {
          if (exercise) {
            exercise.sets.push({ setIndex, weight });
          }
        }
      }
    });
    try{
      const res = await addLogs(workoutID as number,userID,dayName,parsedExercises)
      return {message:res ? "success" : "failure"}
    }catch(err){
      console.log(err)
    }
    

    return { message: "success" };
  } catch (err) {
    return { message: "failure" };
  }
};

export const addPostAction = async (formData:FormData) => {
  const session = await auth()
    const url = await uploadToS3(formData)
    const content = formData.get("text") as string
    const userID = session?.user?.id
    if(!userID) throw new Error("no user found")        
    try{
      const res = await createPost({content:content,resources:[url],userId:userID,title:""})
      return res
    }catch(err){
      throw err
    }
};


export async function uploadToS3(formData: FormData) {
  const file = formData.get("file") as Blob | null;
  if (!file) throw new Error("No file provided");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // const fileName = `uploads/${Date.now()}-${(file as File).name}`;
  // const params = {
  //   Bucket: process.env.NEXT_AWS_S3_BUCKER_NAME!,
  //   Key: fileName,
  //   Body: buffer,
  //   ContentType: file.type,
  // };


  const {url,fields} = await createPresignedPost(
    s3Client,
    {
    Bucket : process.env.NEXT_AWS_S3_BUCKER_NAME ?? '' ,
    Key : nanoid()
  })

  const formDataS3 = new FormData()
      Object.entries(fields).forEach(([Key,value])=>{
        formDataS3.append(Key,value)
      })
  const blob = new Blob([buffer]);
  formDataS3.append('file', blob);
  const response = await fetch(url,{
        method:'POST',
        body:formDataS3
      }) 
  revalidatePath("/"); 
  return `https://s3.eu-north-1.amazonaws.com/${process.env.NEXT_AWS_S3_BUCKER_NAME}/${fields.key}`;
}

export const getWorkoutList = async()=>{
  try{
    const res = await fetchAllWorkouts()
    const muscleGroup = await getMuscleGroups() as string[];
    
  const workouts = res.map(workout =>{
    return (
    { id:workout.id,
      name:workout.name,
    exercices:workout.days.map(day => day.exercices).flat().map(ex =>{return {name:ex.name,times:ex.sets*ex.reps}})}
  )
  })
  const parsedWorkouts = workouts.map(w=>{
        const res = w.exercices.map(async exercices =>{
          if(exercices.name.length > 0){
            const result = await getExerciceByName(exercices.name)
            return {name:exercices.name,times:exercices.times,muscleGroup:result?.muscleGroup ?? "unknown"}
          }
          return null
        })
        return {name:w.name,id:w.id,exercices:res}
      })
      const validParsedWorkouts = parsedWorkouts.map(w => {return {id:w.id,name:w.name,exercices:w.exercices.filter(ex => ex !== null)}})
  const data = validParsedWorkouts.map(w=>{
    return{ name:w.name,id:w.id,
    exercices:muscleGroup.map(async mg => {
      const muscleExercices = (await Promise.all(w.exercices)).filter(ex => ex?.muscleGroup === mg)
      return {
        mg,
        exerciseCount: muscleExercices.reduce((acc, ex) => acc + (ex?.times ?? 0), 0)
      }
    })
  }
  })
  
  return data.map(async w=>{ return{
    name:w.name,
    id:w.id,
    exercices: (await Promise.all(w.exercices)).filter(ex => ex.exerciseCount > 0)
  }
})

  // }w.exercices.filter(async ex => (await ex).exerciseCount > 0))

  }catch(err){
    throw err
  }
}

export const likePost = async (postID: number) => {
  const session = await auth();
  const userID = session?.user?.id;
  if (!userID) return "failure";
  
  try {
    const Liked = await isLiked(postID, userID);
    if (Liked) {
      await removeLike(postID, userID);
    } else {
      await addLike(postID, userID);
    }
    return "success"
  } catch (err) {
    return "failure"
  }
};
