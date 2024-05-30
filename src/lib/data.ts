import { days, exercices, t3Users, workouts } from '~/server/db/schema'
import {db} from '../server/db/index'
import { sql } from '@vercel/postgres'
import * as types from './types'
import { and, eq } from 'drizzle-orm'
type user = {
    email:string
    password:string
    uuid:string
    userName:string
}
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
export const fetchUserByEmail = async(email:string)=>{
    const user = await db.query.t3Users.findFirst({where : eq(t3Users.email,email)})
    return user
}
export async function getUserFromDb(email:string,password:string){
    const user = await db.select().from(t3Users).where(and(eq(t3Users.email,email),eq(t3Users.password,password)))
    return user[0]
}
export async function fetchWorkoutById(id:number){
    const result = await db.query.workouts.findFirst({
        where : eq(workouts.id,19),
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
