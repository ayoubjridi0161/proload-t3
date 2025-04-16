import { Posts, Reactions,    days, exerciceNames, exercices, userLogs, users, workouts,comments ,replys,notifications, exerciseLibrary} from '~/server/db/schema'
import {db} from '../server/db/index'
import type * as types from './types'
import { DrizzleEntityClass, DrizzleError, and, arrayContains, asc, count, eq, inArray, name, sql } from 'drizzle-orm'
import { unstable_noStore as noStore , unstable_cache as cached } from 'next/cache'
import { removeRedundancy } from './utils'
import { String } from 'aws-sdk/clients/acm'
/*Read Data*/
export const fetchAllWorkouts = async()=>{
    const result = await db.query.workouts.findMany({
        columns: {published:false,userId:false},
        with:{
            users :{
                columns : {name:true}
            },
            days : {
                with : {exercices : {
                }}
            }
        },
        orderBy: (workouts, { desc }) => [desc(workouts.id)],
    })
    return result
}
 
export const fetchUserWorkouts = async(privacy:boolean,user:string)=>{
    if(privacy){
        const result = await db.query.workouts.findMany({
        where:and(eq(workouts.userId,user),eq(workouts.published,true)),
        columns:{published:false,userId:false},
        with:{
            users :{
                columns : {name:true}
            },
            days : {
                with : {exercices : {
                }}
            }
        },
        orderBy: (workouts, { desc }) => [desc(workouts.id)],
        })
        return result
    }else{
        const result = await db.query.workouts.findMany({
            where:eq(workouts.userId,user),
            columns:{published:false,userId:false},
            with:{
                users :{
                    columns : {name:true}
                },
                days : {
                    with : {exercices : {
                    }}
                }
            },
            orderBy: (workouts, { desc }) => [desc(workouts.id)],
        })
        return result
    }
}
    


export const getMuscleGroups = async()=>{
    const result = await db.query.exerciceNames.findMany({
        columns: { muscleGroup: true },
    })
    const flatted = result.map (exercice => exercice.muscleGroup)

    return removeRedundancy(flatted)
}
export async function fetchWorkoutById(id:number){
    noStore();
    const result = await db.query.workouts.findFirst({
        where : eq(workouts.id,id),
        with : {days : {
            with : {exercices : true}
        },comments:{
            columns:{content:true,createdAt:true,id:true},
            with:{
                replys:{
                    with:{users:{columns:{name:true}}},
                    columns:{content:true,createdAt:true,id:true}
                },
                users:{columns:{name:true}}
            }
        }
    }
    })
    return result
}
export const getUserByEmail = async (email:string)=>{
    const user = await db.query.users.findFirst({where : eq(users.email,email)})
    return user?.id
}

export const getUsersByName = async (name: string) => {
    try {
        const usersByName = await db.query.users.findMany({
            where: sql`LOWER(${users.name}) LIKE LOWER(${`%${name}%`})`,
            columns: { id: true, name: true, image: true },
            limit: 6
        });
        return usersByName;
    } catch (err) {
        throw err;
    }
};
export const getUserByID = async (id:string) =>{
    const user = await db.query.users.findFirst({where : eq(users.id,id) })
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
    const response = await db.query.Reactions.findFirst({where:and(eq(Reactions.userId,userID),eq(Reactions.workoutId,workoutID)),columns:{workoutId:false,userId:false}})
    
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
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
                   const workoutIdResponse= await InsertWorkout({description:clonedWorkout.description,name:clonedWorkout.name,numberOfDays:clonedWorkout.numberOfDays ?? 0,published:false,userId:userId})
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
            await db.insert(Posts).values({title:post.title,content:post.content,userId:post.userId,resources:post.resources ??[]})
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
            columns:{id:true,title:true,content:true,userId:true,resources:true,likes:true,createdAt:true,sharedPostId:true,shares:true},
            with:{
                users:{columns:{name:true,image:true}},
                comments:{columns:{content:true,id:true},
                          with:{replys:{columns:{content:true,id:true},with:{users:{columns:{name:true}}}},users:{columns:{name:true
                          }}}},
            },
            orderBy:(Posts,{desc})=>[desc(Posts.id)]
        })
        return posts
    }catch(err){
        throw err
    }
}

export const getUserPosts = async (id:string)=>{
    try{
        const posts = await db.query.Posts.findMany({
            where:eq(Posts.userId,id),
            columns:{id:true,title:true,content:true,userId:true,resources:true,likes:true,createdAt:true,shares:true,sharedPostId:true},
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
        const exercices = await db.query.exerciseLibrary.findMany()
        return exercices
    }catch(err){
        throw err
    }
}
export const getExerciceByName = async (name:string)=>{
    try{
        const res =await db.query.exerciceNames.findFirst(
            {where:
                eq(exerciceNames.name,name),
            columns:
                {name:true,muscleGroup:true,musclesTargeted:true,equipment:true}
            }) 
        return res
    }catch(e){
        throw e
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

export const updateUserProfile = async (data:{username:string},id:string)=>{
    try{
        const res = await db.update(users).set({name:data.username}).where(eq(users.id,id)).returning()
        return {message : res }
    }catch(err){
        throw err
    }
}

export const getUsers = async ()=>{
    try{
        const res = await db.query.users.findMany({columns:{name:true,image:true,id:true}})
        return res
    }catch(err){
        throw err
    }
}

export const addLogs= async (workoutID:number,userID:string,dayName:string,logs:{ name: string; sets: { setIndex: string; weight: string }[] }[])=>{
    try{
        const res = await db.insert(userLogs).values({userId:userID,logs:logs,workoutId:workoutID}).returning()
        return res
    }catch(err){
        throw err
    }
}
export const addLogsWithDate= async (Wdate:Date,workoutID:number,userID:string,dayName:string,logs:{ name: string; sets: { setIndex: string; weight: string }[] }[])=>{
    try{
        const res = await db.insert(userLogs).values({userId:userID,logs:logs,workoutId:workoutID,date:Wdate}).returning()
        return res
    }catch(err){
        throw err
    }
}

export const addLike = async (PostID:number,userID:string)=>{
    try{
        await db.update(Posts).set({likes:sql`likes + 1`}).where(eq(Posts.id,PostID))
        await db.update(users).set({likes:sql`array_append(likes,${PostID})`}).where(eq(users.id,userID))
    }catch(err){
        throw err
    }
}
export const removeLike = async (PostID:number,userID:string)=>{
    try{
        await db.update(Posts).set({likes:sql`likes - 1`}).where(eq(Posts.id,PostID))
        await db.update(users).set({likes:sql`array_remove(likes,${PostID})`}).where(eq(users.id,userID))
    }catch(err){
        throw err
    }
}
export const isLiked = async (PostID:number,userID:string)=>{
    const contains = await db.query.users.findFirst({where:and(eq(users.id,userID),arrayContains(users.likes,[PostID])),columns:{id:true}})
    return contains
}
export const getUserLikes = async (userID:string)=>{
    const likes = await db.query.users.findFirst({where:eq(users.id,userID),columns:{likes:true}})
    return likes?.likes
}

export const createComment = async (userName: string, content: string, userID: string, postID: number) => {
    try {
       
         const res = await db.insert(comments).values({ content: content, userId: userID, postId: postID, userName: userName }).returning({ id: comments.id });
         return res[0]?.id;
        

    } catch (err) {
        throw err;
    }
};

export const createReply = async (userName:string,content:string,userID:string,parentID:number)=>{
    try{
        const res = await db.insert(replys).values({content:content,userName:userName,userId:userID,commentId:parentID}).returning({time:replys.createdAt})
        return res[0]?.time
    }catch(err){
        throw err
    }
}

export const editUserBio= async (userID:string,content:string)=>{
    try{
        const res = await db.update(users).set({bio : content}).where(eq(users.id,userID)).returning({id:users.id})
        return res[0]?.id
    }catch(err){
        throw err
    }
}

export const editUserDetails = async (userID:string,data:{
    bmi: string,
    age: string,
    gender: string,
    height: string,
    weight: string,
    experience: string,
  })=>{
    try{
        const res = await db.update(users).set({details:data}).where(eq(users.id,userID)).returning({id:users.id})
        return res[0]?.id
    }catch(err){
        throw err
    }
  }

export const getUserBioAndDetails = async (userID:string)=>{
    try{
        const res = await db.query.users.findFirst(
        {
        where:eq(users.id,userID),
        columns:{bio:true,details:true}
        }
        )
        return res
    }catch(err){
        throw err
    }
}

export const getUserNotifs = async (userID:string)=>{
    try {
        const res = await db.query.notifications.findMany(
            {
            where: eq(notifications.userId, userID),
            orderBy: (notifications, { desc }) => [desc(notifications.time)],
            }
        )
        return res
    } catch (error) {
        throw error
    }

}

export const addConnect = async (userID:string,followed:string)=>{
    try {
        const res = await db.update(users)
        .set({connects:sql`array_append(connects,${followed})`})
        .where(eq(users.id,userID))
        const res2 = await db.update(users)
        .set({numberOfConnects:sql`number_of_connects + 1`})
        .where(eq(users.id,followed))
        if (res && res2) return 'success'
    } catch (error) {
        console.error(error)
    }
}

export const removeConnect= async (userID:string,followed:string)=>{
    try {
        const res = await db.update(users)
        .set({connects:sql`array_remove(connects,${followed})`})
        .where(eq(users.id,userID))
        const res2 = await db.update(users)
        .set({numberOfConnects:sql`number_of_connects - 1`})
        .where(eq(users.id,followed))
        if (res && res2) return 'success'
    } catch (error) {
        console.error(error)
    }
}

export const getFollows = async (userID:string)=>{
    try {
        const res = await db.query.users.findFirst({columns:{connects:true},where:eq(users.id,userID)})
        return res?.connects 
    } catch (error) {
        console.error(error)
    }
}
export const getSideConnects = async(userIDs:string[]|null|undefined)=>{
    try{
        if(userIDs){
        const res = await db.query.users.findMany({
            where: inArray(users.id, userIDs),
            columns: { id: true, name: true, image: true },
        });
        return res;
    }else{return null}
    }catch(err){
        console.error(err)
        throw err
    }
}

export const addNotification = async (userID:string,title:string,content:string)=>{
    try {
        const res = await db.insert(notifications).values({userId:userID,title:title,content:content}).returning({time:notifications.time})
        return res
    } catch (error) {
        throw error
    }
}

export const getCurrentWorkoutID = async (userID:string)=>{
    try {
        const res = await db.query.users.findFirst({columns:{currentWorkout:true},where:eq(users.id,userID)})
        return res?.currentWorkout
    } catch (error) {
        console.error(error);
        
    }
}
export const getWorkoutCycle = async (workoutID:number)=>{
    try {
        const res = await db.query.workouts.findFirst({columns:{numberOfDays:true},with:{days:{
            columns:{dayIndex:true,name:true}
        }},where:eq(workouts.id,workoutID)})
        return res
    } catch (error) {
        console.error(error);

    }
}
export const createWorkoutComment = async (userName: string, content: string, userID: string, WorkoutID: number) => {
    try {
       
         const res = await db.insert(comments).values({ content: content, userId: userID, workoutId: WorkoutID, userName: userName }).returning({ id: comments.id });
         return res[0]?.id;
        

    } catch (err) {
        throw err;
    }
};
export const getUserLogs = async (userID:string)=>{
    try {
        const res = await db.query.userLogs.findMany({where:eq(userLogs.userId,userID)})
        return res
    } catch (error) {
        console.error(error);

    }
}
export const getWorkoutDates = async (userID:string)=>{
    try {
        const res = await db.query.userLogs.findMany({where:eq(userLogs.userId,userID),columns:{date:true}})
        return res
    } catch (error) {
        console.error(error);

    }
}
export const getLastUserLog = async (userID:string)=>{
    try {
        const res = await db.query.userLogs.findFirst({where:eq(userLogs.userId,userID),orderBy:(userLogs,{desc})=>[desc(userLogs.date)]})
        return res
    } catch (error) {
        console.error(error);

    }
}

export const getFullUser = async (userID:string)=>{
    try {
        const res = await db.query.users.findFirst({where:eq(users.id,userID)})
        return res
    } catch (error) {
        console.error(error);

    }
}
export const updateUserPrs = async (userID: string, records: { exercise: string, record: number }[]) => {
    try {
        const res = await db.transaction(async (tx) => {
            const user = await tx.query.users.findFirst({
                where: eq(users.id, userID),
                columns: { personalRecords: true }
            });

            let updatedRecords : Array<{exercise: string, records: number[]}>  = user?.personalRecords as Array<{exercise: string, records: number[]}> ?? [];
            
            for (const { exercise, record } of records) {
                if (!updatedRecords || !Array.isArray(updatedRecords)) {
                    updatedRecords = [{ exercise: exercise, records: [record] }];
                    continue;
                }
                
                const existingExerciseIndex = updatedRecords.findIndex(item => item.exercise === exercise);
                
                if (existingExerciseIndex === -1) {
                    updatedRecords.push({ exercise: exercise, records: [record] });
                } else {
const lastRecord = updatedRecords[existingExerciseIndex]?.records?.[updatedRecords[existingExerciseIndex]?.records?.length - 1];
if (!lastRecord || record > lastRecord) {
    updatedRecords[existingExerciseIndex]?.records?.push(record) ?? (updatedRecords[existingExerciseIndex] = { exercise: exercise, records: [record] });
}
                }
            }

            return await tx.update(users)
                .set({ personalRecords: updatedRecords })
                .where(eq(users.id, userID))
                .returning({ id: users.id });
        });
        return res[0]?.id
    } catch (error) {
        console.error(error);
        return "error in updating"
    }
}

export const getUserPrs = async (userID:string)=>{
    try {
        const res = await db.query.users.findFirst({where:eq(users.id,userID),columns:{personalRecords:true}})
        return res?.personalRecords as Array<{exercise: string, records: number[]}>?? []
    } catch (error) {
        console.error(error);

    }
}

export async function sharePost(postID:number,userID:string,sharedText:String){
    try {
        const res = await db.insert(Posts).values({
            userId: userID,
            sharedPostId: postID,
            content: sharedText,
            title: `Shared Post ${postID}` // Adding required title field
        }).returning({id: Posts.id})
        await db.update(Posts).set({shares:sql`shares + 1`}).where(eq(Posts.id,postID))
        return res[0]?.id
    }
    catch(err){
        throw err
    }
}

export async function getSharedPostByID(postID:number){
    try {
        const res = await db.query.Posts.findFirst({where:eq(Posts.id,postID),columns:{id:true,content:true,userId:true,resources:true},with:{
            users:{columns:{name:true,image:true}}, 
        }}) 
        return res

    }catch(err){
        throw err
    }
}
