import NextAuth from "next-auth"
import {authConfig} from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { z } from "zod";
import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { users } from "~/server/db/schema"
export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(2)  })
              .parse(credentials);
              if(!parsedCredentials)
              throw new Error("zod :Invalid credentials")

                console.log(parsedCredentials)
                const {email,password} = parsedCredentials;
                const user = await db.query.users.findFirst({where:eq(users.email,email)})
                 if(!user) throw new Error("User not found");
                const passwordMatch = password === user.password
                if(!passwordMatch) throw new Error("wrong passwrd")
                 return {email:user.email , date: user.createdAt}     
        }
    }),Github,Google
  ],
})