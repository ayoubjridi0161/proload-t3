"use server"
import { signIn, signOut, auth } from "auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { getCurrentWorkoutID, fetchWorkoutById } from "../data";

export const login = async (previous : any , formData : FormData)=>{
    // console.log(formData)
    try {
      await signIn('credentials',formData );
      console.log("logged")
       
       
      return {message:"success"}
      
      
    } catch (error) {
      if(error instanceof AuthError){
        if(error.cause?.err instanceof ZodError) return {message: "invalid credentials"}
        return {message:error.cause?.err?.message ?? "error"}
      } 
      
    }
  }

  export const signout = async ()=>{
    await signOut()
    revalidatePath('/')
  }

  export const githubSignIn = async ()=> {
  
    await signIn("github", { redirectTo: process.env.REDIRECT_URL })
 
}

export const googleSignIn = async ()=> {
await signIn("google", { redirectTo: process.env.REDIRECT_URL })
}

export async function signInWithResend(formData
    :FormData) {
      console.log(formData)
      await signIn('resend',formData)
  }

