import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { db } from "~/server/db"
import {  accounts, sessions, users, verificationTokens } from "~/server/db/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { redirect } from "next/navigation"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: DrizzleAdapter(db,
            {
              usersTable: users  as any,
              accountsTable: accounts as any,
              sessionsTable: sessions as any,
              verificationTokensTable: verificationTokens as any,
            }
          ),
    pages:{
        signIn:"/login",
    },
    events:{
      signOut: async (message)=>{
        console.log("signout",message)
        redirect("/")
      }
    },
    callbacks:{
      session({ session, user }) {
        session.user.currentWorkout = user.currentWorkout
        return session;
      }
    }
        })
  
  