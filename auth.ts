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
              .object({ email: z.string().email(), password: z.string().min(2) })
              .safeParse(credentials);
              if(parsedCredentials.success){
                console.log(parsedCredentials.data)
                const {email,password} = parsedCredentials.data;
                const user = await db.query.users.findFirst({where:eq(users.email,email)})
                 if(!user) return null;
                const passwordMatch = password === user.password
                if(passwordMatch) return {email, name: user.username, id: user.id}
                }
            throw new Error("invalid credentials");
        }
    }),Github,Google
  ],
})