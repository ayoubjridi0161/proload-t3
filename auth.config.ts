import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"


export default {
    providers: [Github,Google,Resend({
      from:"proof@proload.me"
    }),],
} satisfies NextAuthConfig;


















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