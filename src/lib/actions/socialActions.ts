"use server"
import { auth } from "auth";
import { revalidatePath } from "next/cache";
import { createPost, createComment, sharePost, getSharedPostByID, createReply, createWorkoutComment } from "../data";
import { sendNotification } from "./notifications";
import { uploadToS3 } from "./s3Actions";

export const addPostAction = async (formData:FormData) => {
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) throw new Error("no user found")
  
    try {
      const files = formData.getAll("files");
      const urls = [];
      
      for (const file of files) {
        const newFormData = new FormData();
        newFormData.append("file", file);
        const url = await uploadToS3(newFormData);
        urls.push(url);
      }
  
      const content = formData.get("text") as string

      const res = await createPost({
        content: content,
        resources: urls,
        userId: userID,
        title: ""
      })
      return res
    } catch (err) {
      throw err
    }
  };

  export const addComment = async (postID: number, content: string , postUserID:string) => {
    const session = await auth();
    const userID = session?.user?.id;
    const userName = session?.user?.name;
    if (!userID || !userName) return "failure";
    try {
      const res = await createComment(userName,content, userID,postID);
      if(res ){
        await sendNotification(postUserID,"new Comment",`${session.user?.name} just commented on your post`)
      }
      return res ? "success" : "failure";
    } catch (err) {
      console.error(err)
      return "failure"
    }finally{
    }
  }

  export const sharePostAction = async (postID:number,shareText:string,proprietairy:string)=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const res = await sharePost({post:postID},userID,shareText) 
    await sendNotification(proprietairy,"new Share",`${session.user?.name} just shared your post`)
    revalidatePath("/")
    return res 
   }

   export const shareWorkoutAction = async (workoutId:number,shareText:string,proprietairy:string)=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const res = await sharePost({workout:workoutId},userID,shareText) 
    await sendNotification(proprietairy,"new Share",`${session.user?.name} just shared your workout`)
    return res 
   }

   export const getSharedPost = async (postID:number)=>{
    const res = await getSharedPostByID(postID)
    return res
  }

  export const addReply = async(parentID:number,content:string)=>{
    const session = await auth();
    const userID = session?.user?.id;
    const userName = session?.user?.name;
    if (!userID || !userName) return "failure";
    try{
      const res = await createReply(userName,content,userID,parentID)
      return res ? "success" : "failure";
    } catch (err) {
      console.error(err)
    }
  }

  export const addWorkoutComment= async (workoutID:number,content:string)=>{
    const session = await auth()
    const userID = session?.user?.id
    const userName = session?.user?.name
    if(!userID) return null
    try{
      const res = await createWorkoutComment(userName ?? "",content,userID,workoutID)
      return res
    }catch(err){
      console.error(err);
      return null
    }
  }