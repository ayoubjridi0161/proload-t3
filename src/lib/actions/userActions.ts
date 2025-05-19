"use server"
import { auth } from "auth"
import { revalidatePath } from "next/cache"
import { getProfileByID, updateUserProfile, editUserBio, editUserDetails, getFullUser, getFollows, getSideConnects, getUsersByName, getFriendList } from "../data"
import { uploadToS3 } from "./s3Actions"
import {type OnboardingData } from "~/lib/types"


  // export const getUserProfile = async (id:string)=>{
  //   const user = await getProfileByID(id)
  //   return user
  // }
  const getAuthenticatedUser = async () => {
    
    const session = await auth();
    if (!session?.user?.id || !session?.user?.name) return {id:null,email:null,name:null};
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email
    };
  };

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
    const session = await getAuthenticatedUser();
    if (!session.id) return false;
    try{
    const res = await editUserDetails(session.id,data)
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
      const res= await updateUserProfile({name:formData.get("userName") as string,profilePic:profilePicURL},userID)
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

  export const finishProfileAction = async (data:FormData)=>{

    const details = {
      age: data.get("age") as string,
      fitnessLevel: "",
      fitnessGoal: data.get("fitnessGoal") as string,
      height: data.get("height") as string,
      weight: data.get("weight") as string,
      gender: data.get("gender") as string,
      experience: "",
      bmi: "",
    }
    let profilePicURL = ""
    let coverPicURL = ""
    const profilePic = data.get("profilePic") as File
    if(profilePic){
      const newFormData = new FormData();
      newFormData.append("file", profilePic);
      profilePicURL = await uploadToS3(newFormData);
    }
    const cover = data.get("cover") as File
    if(cover){
      const newFormData = new FormData();
      newFormData.append("file", cover);
      coverPicURL = await uploadToS3(newFormData);
    }
    const bio = data.get("bio") as string
    const name = data.get("name") as string

    const session = await auth()
    const id = session?.user?.id
    if(!id) {
      console.log("could not get user")
      return "failure"
    }
    try{
      const res = await updateUserProfile({name,bio,details,profilePic:profilePicURL,cover:coverPicURL},id)
      if(res == "success") {
        console.log(res)
        revalidatePath('/dashboard')}
    }catch(err){
      console.error(err)
      return "failure"
    }
  }