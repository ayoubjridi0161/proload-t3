"use server"

import { auth } from "auth";
import { getUserNotifs, addNotification, updateNotificationStatus } from "../data";

export const fetchNotifs = async ()=>{
    const session = await auth();
    const userID = session?.user?.id;
    if (!userID) return "failure";
    try{
      const res = await getUserNotifs(userID)
      return res
    }catch(err){
      console.log("error")
      return "failure"
    }
  } 

export const updateNotificationStatusAction = async (id:number) => {
  // const session = await auth();
  // const userID = session?.user?.id;
  // if (!userID) return "failure";
  try{
    const res = await updateNotificationStatus(id)
    return res ? "success" : "failure"; 
  }catch(err){
    console.log("error")
    return "failure"
  }
}

export const sendNotification = async (userID:string,title:string,content:string)=>{
    try{
      const res = await addNotification(userID,title,content)
      return res[0]?.time
    }catch(err){
      console.log(err)
      return "failure"
    }
}