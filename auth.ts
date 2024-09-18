import NextAuth from "next-auth"
import {authConfig} from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { z } from "zod";
import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { users } from "~/server/db/schema"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    debug:true,

  providers: [
    Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(2)  })
              .parse(credentials);
              if(!parsedCredentials)
              throw new Error("zod :Invalid credentials")

                const {email,password} = parsedCredentials;
                const user = await db.query.users.findFirst({where:eq(users.email,email)})
                if(!user) {throw new Error("User not found");}
                const passwordMatch = password === user.password
                if(!passwordMatch) {throw new Error("wrong passwrd")}
                console.log(user)

                return {name:user.username,id:user.id,email:user.email}    
        }
    }),
Github
  ],
  callbacks: {
    async authorized({ request, auth }) {
      const url = request.nextUrl
      
      // If the user is authenticated, redirect to the home page
      if (auth?.user) {
        return NextResponse.redirect(new URL('/', url))
      }
      
      // For unauthenticated users, return false to deny access
      return false
     },
    // signIn({user}){
    //   console.log("logged")
    //   if(user.name === "proofv3")
    //   {
    //     console.log("its proof")
    //     revalidatePath('/')
    //     return '/'
    //   }
    //   return "/workouts"
    // },
    
    async jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string 
      session.user.email = token.email as string
      session.user.name = token.name
      return session
    },
  },

})