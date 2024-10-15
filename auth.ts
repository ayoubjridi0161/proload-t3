import NextAuth from "next-auth"
import {authConfig} from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { z } from "zod";
import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import {  accounts, sessions, users, verificationTokens } from "~/server/db/schema"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

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
  providers: [Github({
    clientId:process.env.AUTH_GITHUB_DEV_ID,
    clientSecret:process.env.AUTH_GITHUB_DEV_SECRET
  }),
  Google({
    allowDangerousEmailAccountLinking:true,
}),
  Resend({
    from:"no-reply@proload.me",
    async generateVerificationToken() {
      return crypto.randomUUID()
    },
  }),

  ],
  


})