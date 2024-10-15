import { Posts, Reactions,    comments,    days, exerciceNames, exercices, sessions, users, workouts } from '~/server/db/schema'
import {db} from '../server/db/index'
import * as types from './types'
import { DrizzleEntityClass, DrizzleError, and, asc, count, eq, sql } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'
/*Read Data*/
export const getUserFromSession = async (sessionToken:string)=>{
    const response = await db.query.sessions.findFirst({where: eq(sessions.sessionToken,sessionToken),columns:{userId:true}})
    return response?.userId || null
}
export const fetchAllWorkouts = async()=>{
    const result = await db.query.workouts.findMany({
        columns: {name : true,id:true},
        with:{
            users :{
                columns : {name:true}
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
export const getUserByEmail = async (email:string)=>{
    const user = await db.query.users.findFirst({where : eq(users.email,email)})
    return user?.id
}
export const getUserByID = async (id:string) =>{
    const user = await db.query.users.findFirst({where : eq(users.id,id) , columns : {name:true,image:true}})
    return user
}
export const getWorkoutsByUser = async (uuid : string)=>{
    // const workoutID = await db.query.workouts.findMany({where : eq(workouts.userId, userId) , columns : {id:true}})
    // const workoutIDs = await db.select().from(workouts).innerJoin(users,eq(workouts.userId,users.id)).where(eq(users.email,email))

        // const workoutsByUser = await db.select({workouts}).from(users).where(eq(users.id,uuid)).innerJoin(workouts,eq(workouts.userId,users.id))
        const workoutsByUser = await db.query.workouts.findMany({
            where:eq(workouts.userId,uuid),

            columns: {name : true,id:true},
            with:{
                users :{
                    columns : {name:true}
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
        return workoutsByUser
    
    
}
export const getDaysByWorkout = async (workoutId:number) =>{
    const daysFetched = await db.query.days.findMany({where: eq(days.workoutId,workoutId),columns:{id:true}})
    return daysFetched.map(day => day.id)
}
export const getUserReactions = async (workoutID:number,userID:string) =>{
    try{
    let response = await db.query.Reactions.findFirst({where:and(eq(Reactions.userId,userID),eq(Reactions.workoutId,workoutID)),columns:{workoutId:false,userId:false}})
    
    return response
}catch(err) {
    console.log(err)
    throw err}
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
        return{message:"failed"}
    }
}
// export const InsertUser = async (user:{username:string,password:string,email:string})=>{
//     try{
//         await db.insert(users).values({name:user.username,password:user.password,email:user.email})
//         return true
        
//     }catch(err){
        
//         console.log(err)
//         throw new DrizzleError({message:"failed to insert user",cause:err})
//     }
// }
export const updateWorkout = async (data:{numberOfDays:number,name:string,description:string},workoutId:number)=>{
    try{
    const updatedID = await db.update(workouts)
    .set(data).where(eq(workouts.id,workoutId))
    .returning({id:workouts.id})
    return updatedID[0]?.id
}catch(err){
    console.log(err)
    throw err
}
}
export const deleteDay = async (dayId : number) =>{
    try{
    await db.delete(exercices).where(eq(exercices.dayId,dayId));
    await db.delete(days).where(eq(days.id,dayId))
}catch(err){
    throw new Error("failed to delete Day")
}
}
export const deleteRemovedExercices = async (Ids : number[],dayId:number) =>{
    const existingExercises = await db.query.exercices.findMany({where:eq(exercices.dayId,dayId),columns:{id:true}})
    existingExercises.map(async  ex => {
        if(!Ids.includes(ex.id)){
            try {await db.delete(exercices).where(eq(exercices.id,ex.id))}catch(err){throw new Error("failed to delete exercice")}
        }})
}
export const updateDay = async (data:{name:string,dayIndex:number},dayId:number)=>{
    if(dayId === -1) throw new Error("no dayID provided!")
    try{
    const updatedID = await db.update(days)
    .set(data).where(eq(days.id,dayId)).returning({id:days.id})
    
    return updatedID[0]?.id
    }catch(err){
        return {message:"failed to update day"}
    }
}
export const updateExercice = async (data:{name:string,sets:number,reps:number},exerciceId:number)=>{
    if(exerciceId === -1) throw new Error("no dayID provided!")
        try{  
        const updatedID = await db.update(exercices).set(data).where(eq(exercices.id,exerciceId)).returning({id:exercices.id})
        return updatedID[0]?.id
    }catch(err){
        console.log("error in updateing exercice \n",err)
        throw err
    }
}
export const updateReactions =async (userId:string,workoutId:number,action:{type:"upvote"|"downvote"|"clone",payload:boolean})=>{
    try{
        switch (action.type){
            case "upvote" : 
            await db
                .update(Reactions)
                .set({upvote:action.payload})
                .where(and(eq(Reactions.userId,userId),eq(Reactions.workoutId,workoutId)))
                
            if (action.payload) {
                await db
                  .update(workouts)
                  .set({ upvotes: sql`upvotes + 1` })
                  .where(eq(workouts.id, workoutId))
              } else {
                await db
                  .update(workouts)
                  .set({ upvotes: sql`upvotes - 1` })
                  .where(eq(workouts.id, workoutId))
              }
              break
            case "downvote":
              await db
                .update(Reactions)
                .set({ downvote: action.payload })
                .where(and(eq(Reactions.userId, userId), eq(Reactions.workoutId, workoutId)))
              if (action.payload) {
                await db
                  .update(workouts)
                  .set({ downvotes: sql`downvotes + 1` })
                  .where(eq(workouts.id, workoutId))
              } else {
                await db
                  .update(workouts)
                  .set({ downvotes: sql`downvotes - 1` })
                  .where(eq(workouts.id, workoutId))
              }
              break
              case "clone":
                //handle clone later
                const clonedWorkout = await fetchWorkoutById(workoutId)
                if(clonedWorkout){
                   const workoutIdResponse= await InsertWorkout({description:clonedWorkout.description,name:clonedWorkout.name,numberOfDays:clonedWorkout.numberOfDays || 0,published:false,userId:userId})
                    if(workoutIdResponse && typeof workoutIdResponse === "number"){
                        for(const day of clonedWorkout.days){
                            const dayId = await InsertDay({index:day.dayIndex,name:day.name},workoutIdResponse)
                            if(dayId && typeof dayId === "number"){
                                for(const exercice of day.exercices){
                                    const exerciceResponse = await InsertExercice({name:exercice.name,reps:exercice.reps,sets:exercice.sets},dayId)
                                    if(exerciceResponse?.message === "database insert failed") return 'failed'
                                }
                            }else return "failed"
                        }
                    }else return "failed"
                    await db.update(workouts).set({clones:sql`clones + 1 `}).where(eq(workouts.id,workoutId))
                }else return "failed"
                break
              default:
                throw new Error ("Invalid action type")
        }
        return "success"
    }catch(err) {return "failure"}
}
export const addNewReaction = async (userID:string,workoutID:number) =>{
    try{
        console.log(userID,workoutID)
        await db.insert(Reactions).values({userId:userID,workoutId:workoutID})
        return {message:"success"}
    }catch(err) {
        if(err instanceof DrizzleError){
            return {message:JSON.stringify(err)}
        }else{return {message:JSON.stringify(err)}}
    }
}
export const animals = [
  {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
  {label: "Dog", value: "dog", description: "The most popular pet in the world"},
  {label: "Elephant", value: "elephant", description: "The largest land animal"},
  {label: "Lion", value: "lion", description: "The king of the jungle"},
  {label: "Tiger", value: "tiger", description: "The largest cat species"},
  {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
  {label: "Zebra", value: "zebra", description: "A several species of African equids"},
  {
    label: "Shark",
    value: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
  {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
];
export const getNumberOfWorkoutsPerUser = async (userId:string) =>{
    try{
    const res = await db.select({value: count(workouts.id)}).from(workouts).where(eq(workouts.userId,userId))
    return {NumberOfWorkouts:res[0]?.value}
    }catch(err){
        return {message:"failure"}
    }
}
export const createPost = async (post:{title:string,content:string,userId:string,resources?:string[]}) =>{
    
        try{
            await db.insert(Posts).values({title:post.title,content:post.content,userId:post.userId,resources:post.resources ||[]})
            return {message:"success"}
        }
        catch(err){
            throw err
        }
}
export const deletePost = async (postId:number) =>{
    try{
        await db.delete(Posts).where(eq(Posts.id,postId))
        return "success"
    }catch(err){   
        throw err
    }
}
export const getPosts = async ()=>{
    try{
        const posts = await db.query.Posts.findMany({
            columns:{id:true,title:true,content:true,userId:true,resources:true},
            with:{
                users:{columns:{name:true,image:true}},
                comments:{columns:{content:true,id:true},
                          with:{replys:{columns:{content:true,id:true},with:{users:{columns:{name:true}}}},users:{columns:{name:true
                          }}}}},
            orderBy:(Posts,{desc})=>[desc(Posts.id)]
        })
        return posts
    }catch(err){
        throw err
    }
}
export const getExerciceNames = async ()=>{
    try{
        const exercices = await db.query.exerciceNames.findMany({columns:{name:true,muscleGroup:true,musclesTargeted:true,equipment:true}})
        return exercices
    }catch(err){
        throw err
    }
}
export const getExerciceByName = async (name:string)=>{
    try{
        const res =await db.query.exerciceNames.findFirst({where:eq(exerciceNames.name,name),columns:{name:true,muscleGroup:true,musclesTargeted:true,equipment:true}}) 
        return res
    }catch(e){
        throw new Error("failed to fetch exercice")
    }
}
export const getProfileByID = async (id:string)=>{
    const res = await db.query.users.findFirst({where:eq(users.id,id),columns:{name:true,image:true},with:{workouts:{
        columns:{numberOfDays:true,name:true,id:true,published:true,description:true,downvotes:true,upvotes:true,createdAt:true},
    },posts:{
        columns:{userId:false}
    }
} })
    return res
}
export const updateProfile = async (data:{name?:string,image?:string,description?:string},id:string)=>{
    try{
        await db.update(users).set({image:data.image}).where(eq(users.id,id))
        return "success"
    }catch(err){
        return "failure"
    }

}
export const insertComment = async (comment:{content:string,postID?:number,workoutID?:number},type:"comment"|"reply",sessionToken:string)=>{
    try{
        const userID = await getUserFromSession(sessionToken)
        if(!userID) throw new Error("user not found")
        if(type === "comment"){
            await db.insert(comments).values({content:comment.content,userId:userID,postId:comment.postID,workoutId:comment.workoutID})
            return "success"
    }
    }catch(err){
            return "failure"
    }

}
