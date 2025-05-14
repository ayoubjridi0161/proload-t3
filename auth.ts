import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { db } from "~/server/db"
import {  accounts, sessions, users, verificationTokens } from "~/server/db/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: DrizzleAdapter(db,
            {
              usersTable: users ,
              accountsTable: accounts ,
              sessionsTable: sessions ,
              verificationTokensTable: verificationTokens,
            }
          ),
    pages:{
        signIn:"/login",
    },
    callbacks: {
      // session({ session, user }) {
      //   session.user.id = user.id
      //   console.log(session)
      //   session.user.onboarded = user.onboarded as boolean
      //   return session
      // },
      // signIn({ profile }) {
      //   console.log(profile)
      //   return true
      // }

    }
    })
  
  