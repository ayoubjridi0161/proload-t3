"use server"
import { auth } from "auth"
import { revalidatePath } from "next/cache"
import { getProfileByID, updateUserProfile, editUserBio, editUserDetails, getFullUser, getFollows, getSideConnects, getUsersByName, getFriendList } from "../data"
import { uploadToS3 } from "./s3Actions"

  // export const getUserProfile = async (id:string)=>{
  //   const user = await getProfileByID(id)
  //   return user
  // }

  export const addBio = async (content:string) =>{
    const session = await auth();
    const userID = session?.user?.id;
    const userName = session?.user?.name;
    if (!userID || !userName) return "failure";
    try{
      const res = await editUserBio(userID,content)
      revalidatePath('/')
      return res ? "success" : "failure";
    } catch (err) {
      throw err
    }
  }

  export const addProfileDetails = async (data:{
    bmi: string,
    age: string,
    gender: string,
    height: string,
    weight: string,
    experience: string,
    fitnessLevel: string,
    fitnessGoal: string,
  })=>
  {
    const session = await auth();
    const userID = session?.user?.id;
    if (!userID) return false;
    try{
    const res = await editUserDetails(userID,data)
    revalidatePath("/dashboard/recommendations")
  }catch(err) {console.error(err)}
  }

  export const fetchFullUser = async ()=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const res = await getFullUser(userID)
    return res
    
  }

  export const getConnects= async ()=>{
    const session = await auth();
    const userID = session?.user?.id
    if(!userID) return null
    const follows = await getFollows(userID)
    const connects = await getSideConnects(follows)
    return connects
  }

  export const isFollowed = async (followed:string)=>{
    const session = await auth();
    const userID = session?.user?.id;
    if (!userID) return false;
    const res = await getFollows(userID)
    if(res) return res.includes(followed)
      else return false
  
  }

  export const searchUsers = async (keyword:string)=>{
    try{
      const res = await getUsersByName(keyword)
      return res 
    }catch(err){
      console.error(err)
    }
  }

  export const updateGeneralSettings = async (formData: FormData )=>{
    const session = await auth();
    let profilePicURL= "";
    const userID = session?.user?.id;
    if (!userID) return "failure";
    const file = formData.get("profilePic") as File;
    if(file){
    const newFormData = new FormData();
    newFormData.append("file", file);
    console.log(newFormData);
    profilePicURL = await uploadToS3(newFormData);
    }
    try{
      const res= await updateUserProfile({username:formData.get("userName") as string,profilePic:profilePicURL},userID)
      revalidatePath('/')
      return res? "success" : "failure";
    }catch(err){
      console.error(err)
      return "failure"
    }
  }

  // Modified function to accept params and return only requested fields
  export const getUserProfile = async (params: string[])=>{
    const session = await auth()
    const userID = session?.user?.id
    const email = session?.user?.email
    if(!userID) return null // Return null if no user ID

    try {
      const fullProfile = await getProfileByID(userID)
      
      // console.log(profile);
      

      if (!fullProfile) return null // Return null if profile not found

      // Create a new object to store the requested settings
      const requestedSettings: Record<string, unknown> = {};
      if(params.length == 0) return fullProfile
      // Iterate over the requested parameter names
      params.forEach(param => {
        // Check if the parameter exists as a key in the fetched profile
        if (Object.prototype.hasOwnProperty.call(fullProfile, param)) {
          // Add the key-value pair to the result object
          requestedSettings[param] = fullProfile[param as keyof typeof fullProfile];
        }
      });

      return requestedSettings; // Return the object with only requested attributes
    } catch (err) {
      console.error("Error fetching user general settings:", err);
      return null; // Return null in case of an error during fetch
    }
  }

  export const getFriendListAction = async ()=>{
    const session = await auth()
    const userID = session?.user?.id
    if(!userID) return null
    const res = await getFriendList(userID)
    return res
  }