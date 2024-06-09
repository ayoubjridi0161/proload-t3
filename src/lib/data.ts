import { days, exercices, workouts } from '~/server/db/schema'
import {db} from '../server/db/index'
import * as types from './types'
import { eq } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'
export const fetchAllWorkouts = async()=>{
    const result = await db.query.workouts.findMany({
        with:{
            days : {
                with : {exercices : true}
            }
        }
    })
    return result
}
export async function fetchWorkoutById(id:number){
    noStore();
    const result = await db.query.workouts.findFirst({
        where : eq(workouts.id,id),
        with : {days : {
            with : {exercices : true}
        }}
    })
    return result
}

/*Insert Data*/
export const InsertExercice = async (exercice : types.exercice , idOfDay : number )=>{
    try{
    await db.insert(exercices).values({name:exercice.name,sets:exercice.sets,reps:exercice.reps,dayId:idOfDay})
}
catch(err){
    return {message:"database insert failed"}
}
}
export const InsertDay = async (day:types.day,idOfWorkout:number)=>{
    try{
        const dayID = await db.insert(days).values({name:day.name,workoutId:idOfWorkout}).returning({id:days.id})
        return dayID[0]?.id
    }catch(err){
        return{message:"failed to insert Day"}
    }
}
export const InsertWorkout = async (workout:types.workout)  =>{
    try{
        const workoutId  = await db.insert(workouts).values({name:workout.name}).returning({id : workouts.id})
        return workoutId[0]?.id
    }catch(err){
        return{message:"failed to insert Workout"}
    }
}
