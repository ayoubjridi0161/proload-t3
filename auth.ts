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
              usersTable: users ,
              accountsTable: accounts ,
              sessionsTable: sessions ,
              verificationTokensTable: verificationTokens,
            }
          ),
    pages:{
        signIn:"/login",
    },
    events:{
      async signOut({ session }) {
        // Server-side cleanup logic
      }
    },
    callbacks:{
      session({ session, user }) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        session.user.currentWorkout = user.currentWorkout
        return session;
      }
    }
        })
  
  