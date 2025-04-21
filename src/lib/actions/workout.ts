"use server"
import { auth } from "auth"
import { DrizzleError } from "drizzle-orm"
import { deleteDay, 
    deleteRemovedExercices, 
    fetchAllWorkouts, 
    fetchUserWorkouts, 
    fetchWorkoutById, 
    getCurrentWorkoutID, 
    getDaysByWorkout, 
    getExerciceByName, 
    getMuscleGroups, 
    getUserByEmail, 
    getWorkoutsByUser, 
    InsertDay, 
    InsertExercice, 
    InsertWorkout, 
    updateDay, 
    updateExercice, 
    updateWorkout } from "../data"
import { redirect } from "next/navigation"

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
    console.log(formData);
    const session = await auth()
    if(!session?.user?.id) throw new Error("no user found")
    const userID = session?.user?.id
    const description = formData.get("description") as string
     const workoutID =  await  InsertWorkout({name:formData.get('workoutName') as string,userId:userID,description: description ?? 'new description',numberOfDays:parseInt(formData.get('NoD') as string),published:formData.get('published') === 'true'})
    if(typeof workoutID !== 'number'){
      throw new Error("failed to insert workout") 
    }
    const days = formData.getAll('day')
    console.log(days)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
    const parsedDays : {name:string,index:number,dayID:number}[]= days.map((day)=>JSON.parse(day as string))
    //cast the indexes to integers
    
    const sortedDays = parsedDays.map((day,index)=>({name:day.name,index:index+1})).filter(day => day.name !== "rest")
    
  
    for(const eachDay of sortedDays){
      const dayID = await InsertDay({name:eachDay.name,index:eachDay.index},workoutID)
      if(typeof dayID !== 'number'){
        throw new Error("failed to insert day")
      }
      
      const exercices = formData.getAll(eachDay.index.toString())
      for(const exercice of exercices){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parsed : {name:string,sets:number,reps:number,id:number} = JSON.parse(exercice as string)
        await InsertExercice({name:parsed.name,sets:parsed.sets,reps:parsed.reps},dayID)
      }
    }
    redirect('/workouts')
  }

  export const postWorkouts = async (prev : any , formData : FormData) =>{
    try{
      const data = await fetchAllWorkouts()
      return data
    }catch(err){
      return {}
    }
  
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
  
  export const getWorkoutList = async (user?:string) => {
    try {
      const res = await fetchAllWorkouts() 
      const muscleGroup = await getMuscleGroups();
  
      const workouts = res.map(workout => {
        const maxIndex = workout.numberOfDays ?? 7;
        const dayNamesSorted = Array.from({ length: maxIndex  }, (_, index) => {
          const day = workout.days.find(day => day.dayIndex === index+1);
          return day ? day.name : 'rest';
        });
  
        return {
          id: workout.id,
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

  export const getUserCurrentWorkout=async()=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const current = await getCurrentWorkoutID(userID)
    if(!current) return null
    const res = await fetchWorkoutById(current)
    return res
  }

  