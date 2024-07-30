import { Reactions, days, exercices, users, workouts } from '~/server/db/schema'
import {db} from '../server/db/index'
import * as types from './types'
import { DrizzleError, asc, eq } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'
export const fetchAllWorkouts = async()=>{
    const result = await db.query.workouts.findMany({
        columns: {name : true,id:true},
        with:{
            users :{
                columns : {username : true}
            },
            days : {
                columns : {name : true},
                with : {exercices : {
                    columns: {name : true}
                }}
            }
        },
        orderBy: (workouts, { desc }) => [desc(workouts.id)],
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
        const dayID = await db.insert(days).values({name:day.name,workoutId:idOfWorkout,dayIndex:day.index}).returning({id:days.id})
        return dayID[0]?.id
    }catch(err){
        return{message:"failed to insert Day"}
    }
}
export const InsertWorkout = async (workout:types.workout)  =>{
    try{
        const workoutId  = await db.insert(workouts).values({name:workout.name,userId:workout.userId,description:workout.description,numberOfDays:workout.numberOfDays,published:workout.published}).returning({id : workouts.id})
        return workoutId[0]?.id
    }catch(err){
        return{message:"failed to insert Workout"}
    }
}

export const InsertUser = async (user:{username:string,password:string,email:string})=>{
    try{
        await db.insert(users).values({username:user.username,password:user.password,email:user.email})
        return true
        
    }catch(err){
        
        console.log(err)
        throw new DrizzleError({message:"failed to insert user",cause:err})
    }
}
export const getUserByEmail = async (email:string)=>{
    const user = await db.query.users.findFirst({where : eq(users.email,email)})
    return user?.id
}

export const updateUpvotes = async (userName:string,workoutId:number,formData:FormData)=>{
    "use server"    
    console.log(userName,workoutId,formData.get("pressed"))

    
    const userID = db.query.users.findFirst({where:eq(users.username,userName),columns:{id:true}})
    
    const pressed = formData.get("pressed") === "true"
        const reaction = await db.query.Reactions.findFirst({where : eq(Reactions.userId,userId)})
        if(reaction){
            await db.update(Reactions)
            .set({upvote:pressed})
            .where(eq(Reactions.userId,userId))
        }else{
            await db.insert(Reactions).values({userId:userId,workoutId:workoutId,upvote:pressed})
        
        
    }
        console.log("error")
        return {message:"success"}
}

