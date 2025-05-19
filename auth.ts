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
      session({ session, user  }) {
        const newSession = {
          userId: user.id,
          user: user
        };
        return newSession as typeof session
      },
      // signIn({ profile }) {
      //   console.log(profile)
      //   return true
      // }

    }
    })
  
  