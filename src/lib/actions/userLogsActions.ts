"use server"

import { auth } from "auth"
import { revalidatePath } from "next/cache"
import { getUserLogs, getWorkoutDates, updateUserPrs, getUserPrs, addLogs, updateUserTotalWeight } from "../data"
import { type WorkoutLog } from "../types"
import { redirect } from "next/navigation"

export const fetchUserLogs = async ()=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const res = await getUserLogs(userID)
    return res
  }
  
  export const fetchWorkoutDates = async ()=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const res = await getWorkoutDates(userID)
    return res
  } 
  
  export const refreshPRs = async (previousState:any,formData:FormData)=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const userLogs = await getUserLogs(userID);
    if (!userLogs) return null
    const logs  = userLogs.map(log => log.logs as WorkoutLog[]);
    let totalWeight = 0
  // Create a map to track max weight for each exercise
    const exerciseRecords: { exercise: string, record: number }[] = [];
  
  // Iterate through each workout log
    logs.forEach(log => {
      log.forEach(exercise => {
        const weight = Math.max(...exercise.sets.map(set => parseFloat(set.weight) || 0));
        totalWeight += exercise.sets.reduce((acc, set) => acc + (parseFloat(set.weight) || 0), 0);
  
        // Check if the exercise is already in the map
        const existingRecord = exerciseRecords.find(record => record.exercise === exercise.name);
  
        if (existingRecord) {
          // If the weight is higher than the existing record, update the record
          if (weight > existingRecord.record) {
            existingRecord.record = weight;
          }  
        }else{
          // If the exercise is not in the map, add it with the current weight as the record
          if(weight >  50)
          exerciseRecords.push({ exercise: exercise.name, record: weight });
        }
      }) 
    })
    const res = await updateUserPrs(userID,exerciseRecords)
    await updateUserTotalWeight(userID,totalWeight)
    revalidatePath("/")
    return res
  }
  
  export const fetchPersonalRecords = async ()=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const res = await getUserPrs(userID)
    return res
  }

  export const logWorkoutAction = async (prev:any , formdata:FormData)=> {
    try {
      const session = await auth();
      const userID = session?.user?.id;
      if (!userID) throw new Error("no user found");
      const workoutID = formdata.get("workoutID") as unknown as number
      const dayName = formdata.get("dayName") as string;
      const exercises: any[] = [];
      const parsedExercises: { name: string; sets: { setIndex: string; weight: string }[] }[] = [];
      let totalWeight = 0;
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
              totalWeight += parseFloat(weight) || 0;
            }
          }
        }
      });
      
      // Create array with max weight for each exercise
      const maxWeight = parsedExercises.map(exercise => {
        const max = Math.max(...exercise.sets.map(set => parseFloat(set.weight) || 0));
        return { exercise: exercise.name, record: max };
      });
      
      try{
        await updateUserPrs(userID,maxWeight)
        const res = await addLogs(workoutID,userID,dayName,parsedExercises)
        await updateUserTotalWeight(userID,totalWeight)
        // await addAchievement(userID,{type:"totalWeight",value:totalWeight})
        revalidatePath("/")
        return {message:res ? "success" : "failure"}
      }catch(err){
        console.log(err)
      }
      
  
      return { message: "success" };
    } catch (err) {
      return { message: "failure" };
    }
  };

// export const addAchievementAction = async (formdata:FormData)=> {
//   const type = formdata.get("type") as string
//   try {
//     const res = await addAchievement(formdata.get("userID") as string,{type:type,value:parseInt(formdata.get("value") as string)})
//     revalidatePath("/")
//   } catch (err) {
//     console.log(err)  
//     return { message: "failure" };
//    }
// }