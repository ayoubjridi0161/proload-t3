"use server"

import { auth } from "auth"
import { User } from "next-auth"
type authResponse = {
    sessionToken : string | null,
    user : User | null,
    error : string | null
}
export const useAuth = async ()=>{
    const session = await auth()
    let error = null
    let user = null
    let sessionToken = null
    if(!session) {
        error = "no session found"
    }else{
        sessionToken = session.sessionToken || "noToken"
        user = session.user
    }
    return {sessionToken,user,error} as authResponse
}