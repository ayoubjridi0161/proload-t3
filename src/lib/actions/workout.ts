"use server"
import { auth } from "auth"
import { DrizzleError } from "drizzle-orm"
import { cloneWorkout, deleteDay, 
    deleteRemovedExercices, 
    deleteWorkout, 
    fetchAllWorkouts, 
    fetchUserWorkouts, 
    fetchWorkoutById, 
    getCurrentWorkoutID, 
    getDaysByWorkout, 
    getExerciceByName, 
    getMuscleGroups, 
    getUserByEmail, 
    getWorkoutsByUser, 
    getWorkoutShortVersion, 
    InsertDay, 
    InsertExercice, 
    InsertWorkout, 
    makeCurrentWorkout, 
    updateDay, 
    updateExercice, 
    updateWorkout } from "../data"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { sendNotification } from "./notifications"
import { generateFullWorkout, generateWorkoutDay } from "../ai-copilot"
import { revalidatePath } from "next/cache"
import { mainMuscleGroups, mapToMainMuscleGroup } from "~/lib/utils"
type WorkoutDay = {
  id: number;
  type: 'workout' | 'rest';
  name: string;
  exercises?: Array<{
    id: number;
    name: string;
    sets: number;
    reps: number;
  }>;
};

  export async function editWorkout (state:any, formData : FormData){
  
    const session = await auth()
    const userID = session?.user?.id
    const name = session?.user?.name
    const ownerId = formData.get('ownerId') 
    if(ownerId === "userId"){
      try{
      const updatedWorkoutID = await updateWorkout({numberOfDays:parseInt(formData.get('NoD') as string),name:formData.get('workoutName') as string,description:formData.get('description') as string },Number(formData.get('workoutID')))
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
    return (
      "successfully updated workout"
    )
    
    
  }catch(err){
    if(err instanceof DrizzleError)
      throw new DrizzleError({message:"error in updationitification"})  
      else console.log("error is : " , err)
    }
  }else{
    await sendNotification(ownerId as string ,"edit request",`${name} wants to edit your workout ${formData.get('workoutName') as string}`)
  }
  }

  export default async function addWorkout(formData : FormData) {
    const session = await auth()
    const days = JSON.parse(formData.get('days') as string) as WorkoutDay[]
    if(!session?.user?.id) throw new Error("no user found")
    const userID = session?.user?.id
    const description = formData.get("description") as string
     const workoutID =  await  InsertWorkout({name:formData.get('workoutName') as string,userId:userID,description: description ?? 'new description',numberOfDays:days.length ?? 0,published:formData.get('isPublished') === 'true'})
    if(typeof workoutID !== 'number'){
      return {code:402, message:"failed to insert workout"}
    }
    const sortedDays = days.map((day,index)=>({...day,index:index+1})).filter(day => day.type !== "rest")
    
  
    for(const eachDay of sortedDays){
      const dayID = await InsertDay({name:eachDay.name,index:eachDay.index},workoutID)
      if(typeof dayID !== 'number'){
        return {code:402, message:"failed to insert day"}
      }
      
      // const exercices = formData.getAll(eachDay.index.toString())
      if(!eachDay.exercises) break;
      for(const exercice of eachDay?.exercises){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        
        await InsertExercice({name:exercice.name,sets:exercice.sets,reps:exercice.reps},dayID)
      }
    }
    
  }

  export const postWorkouts = async (prev : any , formData : FormData) =>{
    try{
      const data = await fetchAllWorkouts({})
      return data
    }catch(err){
      return {}
    }
  
  }

  export const getWorkout = async (id:number)=>{
    try{
      const session = await auth()
      const UUID = session?.user?.id
    const workout = await fetchWorkoutById(id)
    const isOwned = workout?.userId === UUID
    return {res:workout,owned:isOwned,err:null}
  }catch(err){
    return {res:null,err:err}
  }
  }
  export const getWorkoutById = async (id:number)=>{
    try{
      const res = await fetchWorkoutById(id)
      return res
    }catch(err){
      return null
    }
  }

  export const getUserWorkouts =async  (privacy:boolean,user:string) =>{
    try {
      const res = await fetchUserWorkouts(privacy,user)
      const muscleGroup = await getMuscleGroups();
  
      const workouts = res.map(workout => {
        const maxIndex = workout.numberOfDays ?? 7;
        const dayNamesSorted = Array.from({ length: maxIndex  }, (_, index) => {
          const day = workout.days.find(day => day.dayIndex === index+1);
          return day ? day.name : 'rest';
        });
  
        return {
          id: workout.id,
          userId: workout.userId,
          name: workout.name,
          username: workout.users?.name,
          description: workout.description,
          numberOfDays: workout.numberOfDays,
          dayNames: dayNamesSorted,
          upvotes: workout.upvotes,
          exercices: workout.days.map(day => day.exercices).flat().map(ex => {
            return { name: ex.name, times: ex.sets * ex.reps };
          })
        };
      });
  
      const parsedWorkouts = workouts.map(w => {
        const res = w.exercices.map(async exercices => {
          if (exercices.name.length > 0) {
            const result = await getExerciceByName(exercices.name);
            return { name: exercices.name, times: exercices.times, muscleGroup: result?.muscleGroup ?? "unknown" };
          }
          return null;
        });
        return { ...w, exercices: res };
      });
  
      const validParsedWorkouts = parsedWorkouts.map(w => {
        return { ...w, exercices: w.exercices.filter(ex => ex !== null) };
      });
  
      const data = validParsedWorkouts.map(w => {
        return {
          ...w,
          exercices: muscleGroup.map(async mg => {
            const muscleExercices = (await Promise.all(w.exercices)).filter(ex => ex?.muscleGroup === mg);
            return {
              mg,
              exerciseCount: muscleExercices.reduce((acc, ex) => acc + (ex?.times ?? 0), 0)
            };
          })
        };
      });
  
      return data.map(async w => {
        return {
          ...w,
          exercices: (await Promise.all(w.exercices)).filter(ex => ex.exerciseCount > 0)
        };
      });
  
    } catch (err) {
      throw err;
    }
  };
  
  export const getWorkoutList = async (filters:{query?:string,currentPage?:number,sortFiled?:"name"|"days"|"upvotes",order?:"asc"|"desc"}) => {
    try {
      const res = await fetchAllWorkouts(filters)
      // Define the main muscle groups
      

      const workouts = res.map(workout => {
        const maxIndex = workout.numberOfDays ?? 7;
        const dayNamesSorted = Array.from({ length: maxIndex  }, (_, index) => {
          const day = workout.days.find(day => day.dayIndex === index+1);
          return day ? day.name : 'rest';
        });
  
        return {
          id: workout.id,
          name: workout.name,
          userId: workout.userId,
          username: workout.users?.name,
          description: workout.description,
          numberOfDays: workout.numberOfDays,
          dayNames: dayNamesSorted,
          upvotes: workout.upvotes,
          exercices: workout.days.map(day => day.exercices).flat().map(ex => {
            return { name: ex.name, times: ex.sets * ex.reps };
          })
        };
      });
  
      const parsedWorkouts = workouts.map(w => {
        const res = w.exercices.map(async exercices => {
          if (exercices.name.length > 0) {
            const result = await getExerciceByName(exercices.name);
            // Map the specific muscle group to a main group
            const mainMuscleGroup = mapToMainMuscleGroup(result?.muscleGroup);
            return { name: exercices.name, times: exercices.times, mainMuscleGroup: mainMuscleGroup };
          }
          return null;
        });
        return { ...w, exercices: res };
      });
  
      const validParsedWorkouts = parsedWorkouts.map(w => {
        return { ...w, exercices: w.exercices.filter(ex => ex !== null) };
      });
  
      const data = validParsedWorkouts.map(w => {
        return {
          ...w,
          // Group by the main muscle groups instead of all specific groups
          exercices: mainMuscleGroups.map(async mg => {
            // Filter exercises based on the main muscle group
            const muscleExercices = (await Promise.all(w.exercices)).filter(ex => ex?.mainMuscleGroup === mg);
            return {
              mg,
              exerciseCount: muscleExercices.reduce((acc, ex) => acc + (ex?.times ?? 0), 0)
            };
          })
        };
      });
  
      return data.map(async w => {
        return {
          ...w,
          exercices: (await Promise.all(w.exercices)).filter(ex => ex.exerciseCount > 0)
        };
      });
  
    } catch (err) {
      throw err;
    }
  };

  
  export const getUserCurrentWorkout=async()=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const current = await getCurrentWorkoutID(userID)
    if(!current) return null
    const res = await fetchWorkoutById(current)
    return res
  }
  export const deleteWorkoutById = async (id:number)=>{
    try{
      const session = await auth()
      const userID = session?.user?.id
      const workout = await fetchWorkoutById(id)
      const isAdmin = session?.user?.email == "proofyouba@gmail.com"
      if(workout?.userId !== userID && !isAdmin) return ("error: not authorised")
      await deleteWorkout(id)
      if(!isAdmin) redirect('/workouts')
      else {
          revalidatePath("/")
          return ("success")         
      }
    }catch(err){
      return "failure"
    }
  }
  export const generationAction = async (
    exerciseLibrary:string[],
    type: "workout" | "day" | "exercise",
    payload: {
      workout?: { name?: string; description?: string; days?: WorkoutDay[] };
      day?: { name?: string;};
    }
  ) => {
    switch (type) {
      case "workout": {
        const prompt = `You are an expert fitness trainer AI that creates optimized workout plans. 
        Your responses must:
        1. Use only exercises from the provided library
        2. Include balanced muscle group targeting
        3. Specify sets (3-5) and reps (8-15) for each exercise
        4. Format as valid JSON matching the required schema
        5. Include rest days where appropriate
        6. Provide clear workout names and descriptions
        Generate a workout plan for ${payload.workout?.name?? "a new workout"}
        follow up on this workout : ${JSON.stringify(payload.workout)}
        `;
        try{
        const response =await generateFullWorkout(exerciseLibrary,prompt)
        return {status:200,message:response}
      }catch(err){
        console.error(err)
        return {status:503,message:"failed to generate workout , try again later"}
      }}
      case "day": {
        const dayPrompt = `You are an expert fitness trainer AI that creates optimized workout days. 
        Your responses must:
        1. Use only exercises from the provided library
        2. Target appropriate muscle groups for the day's focus
        3. Specify sets (3-5) and reps (8-15) for each exercise
        4. Format as valid JSON matching the required schema
        
        Generate exercises for ${payload.day?.name ?? "a workout day"}
        don't include these 
        existing exercises: ${JSON.stringify(payload.workout?.days?.flatMap(day => day.exercises?.map(ex => ex.name) ?? []))}`
          try{
        const response = await generateWorkoutDay(exerciseLibrary,dayPrompt)
        return {status:200,message:response}
      }catch(err){
        console.error(err)
        return {status:503,message:"failed to generate day, try again later"}
      }
      }
      default:{
        return {status:404,message:"not found"}
    }
  }
}

export const cloneAndUseWorkoutAction = async (workoutId:number)=>{
  const session = await auth()
  if(!session?.user?.id) return "failed"
  try{
    const response = await cloneWorkout(workoutId,session?.user?.id)
    await makeCurrentWorkout(session?.user?.id,workoutId)
    if(response && response == "failed"){
      return response
    }else return "success"
  }catch(err){
    console.error(err)
    return "failed"
  }
  
}

export const makeCurrentWorkoutAction = async (userId:string,workoutId:number)=>{
    const res = await makeCurrentWorkout(userId,workoutId)
    return res
}