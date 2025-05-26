import { Posts, Reactions,    days, exercices, userLogs, users, workouts,comments ,replys,notifications, exerciseLibrary, userAchievements} from '~/server/db/schema'
import {db} from '../server/db/index'
import type * as types from './types'
import { DrizzleEntityClass, DrizzleError, and, arrayContains, asc, count, desc, eq, inArray, name, sql } from 'drizzle-orm'
import { unstable_noStore as noStore , unstable_cache as cached } from 'next/cache'
import { removeRedundancy } from './utils'
import { PgSelect } from 'drizzle-orm/pg-core'
import {type ExtraDetails} from "~/lib/types"
/*Read Data*/

export const fetchAllWorkouts = async(filters:{query?:string,currentPage?:number,sortFiled?:"name"|"days"|"upvotes"|"time",order?:"asc"|"desc"})=>{
    // Map filter keys to actual database columns
    const ColumnMap = {
        'name': workouts.name, // Added name mapping
        'time': workouts.createdAt,
        'days': workouts.numberOfDays, // Renamed from 'numberOfDays' for consistency with filter type
        'upvotes': workouts.upvotes,
    } as const;

    // Map order strings to Drizzle functions
    const DirectionMap = {
       'asc': asc,
       'desc': desc,
    } as const;

    const itemsPerPage = 9; // Define how many items per page
    const offset = filters.currentPage ? (filters.currentPage - 1) * itemsPerPage : 0;

    // Determine sorting column and direction, with defaults
    const sortField = filters.sortFiled ?? 'time'; // Default sort field
    const sortDirection = filters.order ?? 'desc'; // Default sort direction
    const orderByColumn = ColumnMap[sortField] ?? workouts.createdAt; // Fallback to createdAt if sortField is invalid
    const orderByDirection = DirectionMap[sortDirection];

    const result = await db.query.workouts.findMany({
        columns: {published:false}, // Exclude columns as before
        where: and(filters.query ? sql`LOWER(${workouts.name}) LIKE LOWER(${`%${filters.query}%`})` : undefined,eq(workouts.published,true)),
        with:{ // Keep the 'with' clause for related data
            users :{
                columns : {name:true}
            },
            days : {
                with : {exercices : {                   
                }}
            }
        },
        limit: itemsPerPage, 
        offset: offset, 
        orderBy: orderByDirection(orderByColumn),
    });

    return result
}
 
export const fetchUserWorkouts = async(privacy:boolean,user:string)=>{
        const result = await db.query.workouts.findMany({
        where:and(eq(workouts.userId,user),eq(workouts.published,privacy)),
        columns:{published:false},
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
export const getWorkoutShortVersion = async (id:number)=>{
    try{
        const result = await db.query.workouts.findFirst({
            columns: {published:false}, // Exclude columns as before
            where: eq(workouts.id,id), // Apply search filter
            with:{ // Keep the 'with' clause for related data
                users :{
                    columns : {name:true}
                },
                days : {
                    with : {exercices : {                   
                    }}
                }
            },
        });
        return result
    }catch(err){
        throw err
    }
}   
export const getProcessedWorkoutById = async (id: number) => {
    try {
      const workout = await getWorkoutShortVersion(id); // Fetch the single workout
      if (!workout) {
        return null; // Or throw an error if preferred
      }

      const muscleGroup = await getMuscleGroups()
      // Process the single workout
      const maxIndex = workout.numberOfDays ?? 7;
      const dayNamesSorted = Array.from({ length: maxIndex }, (_, index) => {
        const day = workout.days.find(day => day.dayIndex === index + 1);
        return day ? day.name : 'rest';
      });

      const processedWorkout = {
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

      // Fetch muscle groups for exercises
      const exercisesWithMuscleGroups = await Promise.all(
        processedWorkout.exercices.map(async exercice => {
          if (exercice.name.length > 0) {
            const result = await getExerciceByName(exercice.name);
            return { name: exercice.name, times: exercice.times, muscleGroup: result?.muscleGroup ?? "unknown" };
          }
          return null;
        })
      );

      const validExercises = exercisesWithMuscleGroups.filter(ex => ex !== null);

      // Aggregate exercises by muscle group
      const exercisesByMuscleGroup = await Promise.all(
        muscleGroup.map( mg => {
          const muscleExercices = validExercises.filter(ex => ex?.muscleGroup === mg);
          return {
            mg,
            exerciseCount: muscleExercices.reduce((acc, ex) => acc + (ex?.times ?? 0), 0)
          };
        })
      );

      // Return the final processed workout object
      return {
        ...processedWorkout,
        exercices: exercisesByMuscleGroup.filter(ex => ex.exerciseCount > 0)
      };

    } catch (err) {
      console.error("Error processing workout by ID:", err); // Log the error
      throw err; // Re-throw the error or handle it as needed
    }
  };


export const getMuscleGroups = async()=>{
    const result = await db.query.exerciseLibrary.findMany({
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
            with : {exercices : {
                with:{
                    exerciseLibrary : {columns:{images:true}}
                }
            }}
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
        const workoutId  = await db.insert(workouts).values({
            name:workout.name,
            userId:workout.userId,
            description:workout.description,
            numberOfDays:workout.numberOfDays,
            published:workout.published}).returning({id : workouts.id})
        return workoutId[0]?.id
    }catch(err){
        // console.log(err)

        return{message:"failed"}
    }
}

export const getWorkoutDaysById = async (id:number) => {
    try{
        const Days = await db.query.workouts.findFirst({
            where: eq(workouts.id, id),
            columns: {numberOfDays:true},
            with:{
                days:{
                    columns:{name:true,dayIndex:true}
                }
            }
        });
        if(!Days) return null
        const maxIndex = Days?.numberOfDays ?? 7;
      const dayNamesSorted = Array.from({ length: maxIndex }, (_, index) => {
        const day = Days.days.find(day => day.dayIndex === index + 1);
        return day ? day.name : 'rest';
      });
        return dayNamesSorted
    }catch(error){
        throw error
    }
}
export const updateWorkout = async (data:{numberOfDays:number,name:string,description:string},workoutId:number)=>{
    const parsedData = data.description ? data : {
        numberOfDays: data.numberOfDays,
        name: data.name
    }
    try{
    const updatedID = await db.update(workouts)
    .set(parsedData).where(eq(workouts.id,workoutId))
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
export const deleteWorkout = async (workoutId:number) =>{
    try{
        const workoutDays = await db.query.days.findMany({
            where: eq(days.workoutId, workoutId),
            columns: {id: true}
        });
        for (const day of workoutDays) {
            await db.delete(exercices).where(eq(exercices.dayId, day.id));
        }
        await db.delete(days).where(eq(days.workoutId, workoutId));
        await db.delete(Reactions).where(eq(Reactions.workoutId, workoutId));
        await db.delete(workouts).where(eq(workouts.id, workoutId));
        return 'success'
    } catch (err){
        throw new Error("failed to delete workout")
    }
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
export const updateReactions =async (
    userId:string,
    workoutId:number,
    action:{
    type:"upvote"|"downvote"|"clone",
    payload:{
    upvote: boolean;
    downvote: boolean;
    } | undefined}
)=>{
    try{
    if(action.type === "clone"){
        const res = await cloneWorkout(workoutId,userId)
        if(res && res == "failed"){
            return "failed"
        }else {return "success"}
    }else{
        await db.transaction(async (tx) => {
            const existingReactions = await tx
              .query
              .Reactions
              .findFirst({
                 where: and(eq(Reactions.userId, userId), eq(Reactions.workoutId, workoutId)),
                })
                
            if(existingReactions){
                await tx
                  .update(Reactions)
                  .set({
                        upvote:action.payload?.upvote,
                        downvote:action.payload?.downvote
                    })
                  .where(and(eq(Reactions.userId, userId), eq(Reactions.workoutId, workoutId)));
            }else{
                await tx
                    .insert(Reactions)
                    .values({
                        userId: userId,
                        workoutId: workoutId,
                        upvote: action.payload?.upvote ?? false,
                        downvote: action.payload?.downvote ?? false,
                    });
            }
            await tx.update(workouts).set({ 
                upvotes: sql`upvotes + ${action.type === "upvote" ? 1 : 0 }` ,
                }).where(eq(workouts.id, workoutId));
        }
    )

    }
    return "success"
    }catch(err) {
        return "failure"
    }
}

export const cloneWorkout = async (workoutID:number,userID:string)=>{
    const clonedWorkout = await fetchWorkoutById(workoutID)
                if(clonedWorkout){
                   const workoutIdResponse= await InsertWorkout({description:clonedWorkout.description,name:clonedWorkout.name,numberOfDays:clonedWorkout.numberOfDays ?? 0,published:false,userId:userID})
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
                    await db.update(workouts).set({clones:sql`clones + 1 `}).where(eq(workouts.id,workoutID))
                }else return "failed"
}
export const addNewReaction = async (userID:string,workoutID:number,action:"upvote"|"downvote") =>{
    try{
        if(action == "downvote")
        await db.insert(Reactions).values({userId:userID,workoutId:workoutID,downvote:true})
        else await db.insert(Reactions).values({userId:userID,workoutId:workoutID,upvote:true})
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
export const createPost = async (post:{title:string,content:string,userId:string,resources?:string[],workoutId?:number}) =>{
    
        try{
            await db.insert(Posts).values({title:post.title,content:post.content,userId:post.userId,resources:post.resources ??[],sharedWorkoutId:post.workoutId})
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
export const getPosts = async ( page: number = 1, limit: number = 10,userId?: string,connects?: string[]) => {
    try{
        const posts = await db.query.Posts.findMany({
            where: userId ? eq(Posts.userId, userId) : undefined,
            columns:{id:true,title:true,content:true,userId:true,resources:true,likes:true,createdAt:true,sharedPostId:true,shares:true,sharedWorkoutId:true},
            with:{
                users:{columns:{name:true,image:true}},
                comments:{columns:{content:true,id:true},
                          with:{replys:{columns:{content:true,id:true},with:{users:{columns:{name:true}}}},users:{columns:{name:true
                          }}}},
            },
            orderBy:(Posts,{desc, sql})=>[
                // First sort by whether the post is from a connected user
                sql`CASE WHEN ${Posts.userId} IN (${sql.raw(connects?.map(id => `'${id}'`).join(',') ?? 'NULL')}) THEN 0 ELSE 1 END`,                // Then sort by post date
                desc(Posts.createdAt)
            ],
            offset: (page - 1) * limit,
        })
        
        // Use Promise.all to wait for all async map operations to complete
        const postsWithShared = await Promise.all(posts.map(async (post) => {
            if (post.sharedPostId) {
                // Fetch the shared post details, including the user who originally posted it
                const sharedPost = await db.query.Posts.findFirst({
                    where: eq(Posts.id, post.sharedPostId),
                    columns: { id: true, content: true, userId: true, resources: true, title: true, createdAt: true }, // Added title and createdAt for context
                    with: {
                        users: { columns: { name: true, image: true } } // Fetch user details for the shared post
                    }
                });
                // Return the original post merged with the fetched shared post data
                return { ...post, sharedPost,sharedWorkout:undefined };
            } else if (post.sharedWorkoutId){
                // If there's no sharedPostId, return the post as is, ensuring consistent structure
                const sharedWorkout = await getProcessedWorkoutById(post.sharedWorkoutId)
                // Return the original post merged with the fetched shared post data
                return { ...post, sharedPost:undefined,sharedWorkout };
            } else {
                return { ...post, sharedPost:undefined,sharedWorkout:undefined };
            }
        }));
        
        // Return the array of posts with resolved shared post data
        return {
            posts : postsWithShared,
            nextPage: posts.length> 0 ? page +1 : null
        }
    }catch(err){
        throw err;
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
        const res =await db.query.exerciseLibrary.findFirst(
            {where:
                eq(exerciseLibrary.name,name),
            columns:
                {name:true,muscleGroup:true,musclesTargeted:true,equipment:true}
            }) 
        return res
    }catch(e){
        throw e
    }
}
export const getProfileByID = async (id:string)=>{
    const res = await db.query.users.findFirst({where:eq(users.id,id),with:{workouts:{
        columns:{numberOfDays:true,name:true,id:true,published:true,description:true,downvotes:true,upvotes:true,createdAt:true},
    },posts:{
        columns:{userId:false}
    }
} })
    return res
}

export const updateUserProfile = async (data:{name:string,profilePic?:string,bio?:string,details?:ExtraDetails,cover?:string},userId:string)=>{
    console.log(data)
    console.log(userId)
    let updatedFields :{name:string,image?:string,bio?:string,details?:ExtraDetails,cover?:string} = {name:data.name}
    if(data.profilePic) updatedFields = {...updatedFields,image:data.profilePic}
    if(data.bio) updatedFields = {...updatedFields,bio:data.bio}
    if(data.details) updatedFields = {...updatedFields,details:data.details} 
    if(data.cover) updatedFields = {...updatedFields,cover:data.cover}
    try{
        const res = await db.update(users).set({...updatedFields,onboarded:true}).where(eq(users.id,userId)).returning()
        return res ? "success" : "failure"
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
        const res = await db.insert(userLogs).values({userId:userID,logs:logs,workoutId:workoutID,dayName:dayName}).returning()
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
       
         const res = await db.insert(comments).values({ userName:userName,content: content, userId: userID, postId: postID}).returning({ id: comments.id });
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
    fitnessLevel: string,
    fitnessGoal: string,
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
export const getFriendList = async (userID:string)=>{
    try {
        const res = await db.query.users.findFirst({columns:{connects:true},where:eq(users.id,userID)})
if(res?.connects){
    const profiles = await db.query.users.findMany({
        where: inArray(users.id, res.connects),
        columns: {
            id: true,
            name: true, 
            image: true,
            numberOfConnects: true
        }
    })
    return profiles
} else {
    return null
}
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
       
         const res = await db.insert(comments).values({ content: content, userId: userID, workoutId: WorkoutID,userName:userName }).returning({ id: comments.id });
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
        const res = await db.query.userLogs.findMany({where:eq(userLogs.userId,userID),columns:{date:true,dayName:true}})
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

export async function sharePost(itemShared:{post?:number,workout?:number},userID:string,sharedText:string){
    try {if(itemShared.post){
        const res = await db.insert(Posts).values({
            userId: userID,
            sharedPostId: itemShared.post,
            content: sharedText,
            title: `Shared Post ${itemShared.post}`, // Adding required title field,
            
        }).returning({id: Posts.id})
        await db.update(Posts).set({shares:sql`shares + 1`}).where(eq(Posts.id,itemShared.post))
        return res[0]?.id
    }else if(itemShared.workout){
        const res = await db.insert(Posts).values({
            userId: userID,
            sharedWorkoutId: itemShared.workout,
            content: sharedText,
            title: `Shared Workout ${itemShared.workout}` // Adding required title field
        }).returning({id: workouts.id})
        await db.update(workouts).set({shares:sql`shares + 1`}).where(eq(workouts.id,itemShared.workout))
    }
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


export const updateNotificationStatus = async (notificationId: number) => {
    try {
      const res =await db.update(notifications)
      .set({ read: true })
      .where(eq(notifications.id, notificationId)).returning();
      return res
    } catch (err) {
      throw err
    }
  }

export const updateUserTotalWeight = async (userID:string,weight:number)=>{
    try {
        const res = await db.transaction(async (tx) => {
            const user = await tx.query.users.findFirst({
                where: eq(users.id, userID),
                columns: { personalRecords: true }
            });
            const updatedRecords : Array<{exercise: string, records: number[]}>  = user?.personalRecords as Array<{exercise: string, records: number[]}> ?? [];
            
            const existingExerciseIndex = updatedRecords.findIndex(item => item.exercise === "totalWeight");
            if (existingExerciseIndex === -1) {
                updatedRecords.push({ exercise: "totalWeight", records: [weight] });
            } else {
                const lastRecord = updatedRecords[existingExerciseIndex]?.records?.[updatedRecords[existingExerciseIndex]?.records?.length - 1];
                lastRecord ? updatedRecords[existingExerciseIndex]?.records?.push(weight+lastRecord) : updatedRecords[existingExerciseIndex]?.records?.push(weight)
            }
            return await tx.update(users)
                .set({ personalRecords: updatedRecords })
                .where(eq(users.id, userID))
                .returning({ id: users.id });
        });
        return res[0]?.id
    } catch (error) {
        throw error
    }
}

export async function getUserWorkoutsShortVersion(uuid:string){
    const res = db.query.workouts.findMany({where:eq(workouts.userId,uuid),columns:{id:true,name:true,numberOfDays:true,description:true},with:{days:{columns:{dayIndex:true,name:true}}},orderBy:(workouts,{desc})=>[desc(workouts.createdAt)]})
    return res
}

export async function getWorkoutsForAdmin (){
    const res = db.query.workouts.findMany({columns:{userId:false},with:{users:{columns:{name:true}}},orderBy:(workouts,{desc})=>[desc(workouts.createdAt)]})
    return res
}

export async function getAllUsersForAdmin ( ){
    const res = db.query.users.findMany({
        columns:{
            email:true,id:true,name:true,image:true,numberOfConnects:true
        }
    ,
    orderBy:(users,{desc})=>[desc(users.name)]})
    return res
}

export async function makeCurrentWorkout(userId:string,workoutId:number){
    try{const res = await db.update(users).set({currentWorkout:workoutId}).where(eq(users.id,userId)).returning({id:users.id})
        return res[0]?.id ? "success" : "failed"
}catch(err){console.error(err);return "failed"}
}

// Add achievement to user
export const addAchievement = async (userId: string, achievement: {
  type: string;
  value: number;
  tier?: number;
}) => {
  try {
    const result = await db.insert(userAchievements).values({
      userId,
      achievement: achievement.type,
      description: `Achieved ${achievement.type} with value ${achievement.value}`,
      tier: calculateTier(achievement.value), // You can implement tier logic
    }).returning();
    return result[0];
  } catch (err) {
    console.error('Error adding achievement:', err);
    throw err;
  }
};

// Fetch user achievements
export const fetchUserAchievements = async (userId: string) => {
  try {
    const result = await db.query.userAchievements.findMany({
      where: eq(userAchievements.userId, userId),
      orderBy: desc(userAchievements.date),
    });
    return result;
  } catch (err) {
    console.error('Error fetching achievements:', err);
    throw err;
  }
};

// Helper function to calculate achievement tier
const calculateTier = (value: number): number => {
  if (value >= 1000) return 3; // Gold
  if (value >= 500) return 2;  // Silver
  return 1; // Bronze
};

// Complete the checkForAchievements function
export async function checkForAchievements(userId: string) {
  try {
const achievements: string[] = [];
    await db.transaction(async (tx) => {
      // Check for weight milestones
      const userPRs = await tx.query.users.findFirst({
        where: eq(users.id, userId),
        columns: { personalRecords:true}
      });
      const userTotalWeight = userPRs?.personalRecords?.find((pr: unknown): pr is {exercise: string, records: number[]} => {
        return (pr as { exercise: string }).exercise === "totalWeight"
      })
      const userlogs = await tx.query.userLogs.findMany({
        where: eq(userLogs.userId, userId),
        columns: { date: true }
      });
      const session = userlogs.length
        const totalWeight = userTotalWeight?.records[userTotalWeight.records.length-1] ?? 0
        const weightMilestones = [1000, 5000, 10000, 25000, 50000];
        for (const milestone of weightMilestones) {
          if (totalWeight >= milestone) {
            // Check if achievement already exists
            const existing = await tx.query.userAchievements.findFirst({
              where: and(
                eq(userAchievements.userId, userId),
                eq(userAchievements.achievement, `totalWeight_${milestone}`)
              )
            });
            
            if (!existing) {
              await tx.insert(userAchievements).values({
                userId,
                achievement: `totalWeight_${milestone}`,
                description: `Achieved Total Weight: ${milestone}kg`,
                tier: weightMilestones.indexOf(milestone) + 1
              })
              achievements.push(`Total Weight: ${milestone}kg`);
            }
          }
        }
      // Check for workout count milestones
        const workoutMilestones = [10, 25, 50, 100, 250];
        for (const milestone of workoutMilestones) {
          if (session >= milestone) {
            const existing = await tx.query.userAchievements.findFirst({
              where: and(
                eq(userAchievements.userId, userId),
                eq(userAchievements.achievement, `workoutCount_${milestone}`)
              )
            });
            
            if (!existing) {
              await tx.insert(userAchievements).values({
                userId,
                achievement: `workoutCount_${milestone}`,
                description: `Achieved Workouts Completed: ${milestone}`,
                tier: workoutMilestones.indexOf(milestone) + 1
              })
              achievements.push(`Workouts Completed: ${milestone}`);
            }
          }
        }
        const targetExercises = [
            "Bench Press - Powerlifting",
            "Barbell Squat",
            "Barbell Deadlift"
        ];
        const PowerliftingPrs : {exercise:string,PR:number}[] =[]
        for (const pr of (userPRs?.personalRecords ?? []) as Array<{exercise:string,records:number[]}>) {

            if (targetExercises.includes(pr.exercise))
                // Assuming records are sorted or the last one is the latest
                // If not sorted, you might need to sort them by date if a date is available
                // or assume the last entry in the array is the latest.
                if (pr.records.length > 0) {
                    PowerliftingPrs.push({exercise:pr.exercise,PR:pr.records[pr.records.length - 1] ?? 0})
                }
        }
        const maxWeightMilestones = [
            {exercise:"Bench Press - Powerlifting",milestone:[
                50,75,100,120,150,200
            ]},
            {exercise:"Barbell Squat",milestone:[
                70,100,140,180,220,280
            ]},
            {exercise:"Barbell Deadlift",milestone:[
                100,150,200,250,300,350
            ]}]
        for (const exercise of maxWeightMilestones) {
            const pr = PowerliftingPrs.find(pr => pr.exercise === exercise.exercise);
            if (pr) {
                for (const milestone of exercise.milestone) {
                    if (pr.PR >= milestone) {
                        const existing = await tx.query.userAchievements.findFirst({
                            where: and(
                                eq(userAchievements.userId, userId),
                                eq(userAchievements.achievement, `${exercise.exercise}_${milestone}`)
                            )
                        })
                        if (!existing) {
                            await tx.insert(userAchievements).values({
                                userId,
                                achievement: `${exercise.exercise}_${milestone}`,
                                description: `Achieved ${exercise.exercise}: ${milestone}kg`,
                                tier: exercise.milestone.indexOf(milestone) + 1
                            })
                            achievements.push(`${exercise.exercise}: ${milestone}kg`);
                        }
                    }
                }
            }
        }
    })
     
    return achievements;
  } catch (err) {
    console.error('Error checking achievements:', err);
    return [];
  }
}
export async function getAchievements(userID:string){
    try {
      const res = await db.query.userAchievements.findMany({
        columns:{
          achievement:true,
          description:true,
          tier:true,

        },
        where:eq(userAchievements.userId,userID),
      })
      return res
    }catch(err){
        console.error(err)
    }
}

