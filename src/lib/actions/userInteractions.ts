"use server"
import { auth } from "auth";
import { revalidatePath } from "next/cache";
import { getNumberOfWorkoutsPerUser, updateReactions, addNewReaction, addConnect, removeConnect, isLiked, removeLike, addLike } from "../data";
import { sendNotification } from "./notifications";

  export const addUserReaction = async (workoutID:number,action:{type:"upvote"|"downvote"|"clone",payload:{
    upvote: boolean;
    downvote: boolean;
} | undefined})=>{
    const session = await auth();
    console.log(action)
    const id = session?.user?.id;
    if(!id) {throw new Error ("no user authenticated")}
    // if(action.type==="clone"){
    //   const res = await getNumberOfWorkoutsPerUser(id)
    //   if(res.NumberOfWorkouts !== undefined && res.NumberOfWorkouts<330){
    //     const res = await updateReactions(id,workoutID,action)
    //     revalidatePath(`workouts/${workoutID}`)
    //     return res
    //   }else return("workout limit exeeded")
    // }
    // if(!action.payload) {const res = await addNewReaction(id,workoutID,action.type);
    //   if(res.message !== "success" ) throw new Error(res.message)
    // }
    // const res = await updateReactions(id,workoutID,action)
    return "success"
  }
  
  export const ConnectAction = async (followed:string)=>{
    const session = await auth();
    const userID = session?.user?.id;
    const user = session?.user?.name
    if (!userID) return "failure";
    const res =await addConnect(userID,followed)
    await sendNotification(followed,"new Follow",`${user} just followed you`)
    return res ?? 'failure'
  }
  
  export const unfollow = async (followed:string)=>{
    const session = await auth();
    const userID = session?.user?.id;
    const user = session?.user?.name
    if (!userID) return "failure";
    const res =await removeConnect(userID,followed)
    revalidatePath('/profile/friends')
    return res ?? 'failure'
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