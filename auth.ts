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
  providers: [Github,Google,Resend({
    from:"proof@proload.me"
  }),
    
    // Credentials({
    //     async authorize(credentials) {
    //         const parsedCredentials = z
    //           .object({ email: z.string().email(), password: z.string().min(2)  })
    //           .parse(credentials);
    //           if(!parsedCredentials)
    //           throw new Error("zod :Invalid credentials")

    //             const {email,password} = parsedCredentials;
    //             const user = await db.query.users.findFirst({where:eq(users.email,email)})
    //             if(!user) {throw new Error("User not found");}
    //             const passwordMatch = password === user.password
    //             if(!passwordMatch) {throw new Error("wrong passwrd")}
    //             console.log(user)

    //             return {name:user.username,id:user.id,email:user.email}    
    //     }
    // })
  ],
  callbacks:{
    async authorized({ request: { nextUrl }, auth }) {
      console.log("authorization")
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      if (pathname.startsWith('/login') && isLoggedIn) {
        console.log("authed user already")
          return Response.redirect(new URL('/', nextUrl));
      }
      // if (pathname.startsWith("/workouts/create") && !isLoggedIn) {
      //     return Response.redirect(new URL('/login', nextUrl));
      // }
      return !!auth;
  },
  }
  //   // signIn({user}){
  //   //   console.log("logged")
  //   //   if(user.name === "proofv3")
  //   //   {
  //   //     console.log("its proof")
  //   //     revalidatePath('/')
  //   //     return '/'
  //   //   }
  //   //   return "/workouts"
  //   // },
    
  //   async jwt({ token, user }) {
  //     if (user) { // User is available during sign-in
  //       token.id = user.id
  //       token.name = user.name
  //       token.email = user.email
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     session.user.id = token.id as string 
  //     session.user.email = token.email as string
  //     session.user.name = token.name
  //     return session
  //   },
  // },

})