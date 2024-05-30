import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod";
import { getUserFromDb } from "~/lib/data";
import { signInSchema } from "~/lib/zodValidation";
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import type { t3User } from "~/lib/types";
import { Provider } from "next-auth/providers";
export const providers: Provider[] =[
    Github,
    Google,
    Credentials
    ({
        credentials : 
        {   email : {},
            
            password : {}
        }
        , authorize : async (credentials):Promise<t3User|null|any> =>
        { try{
            let user = null;
            const {email,password} = await signInSchema.parseAsync(credentials) 
            //pwHash = hashFunction(credentials.password)
            user = await getUserFromDb(email,password)
            if(!user){
                throw new Error("user not found")
            }
            return user
        }catch(err){
            if(err instanceof ZodError){
                return null
            }
        }
        }
    }),
    
            ]
export const config = 

{   pages: {
        signIn: '/loginzebbi',
        
    },providers,
    callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;  
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }  
    }
} satisfies NextAuthConfig;
export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  export const { signIn, signOut , auth , handlers } = NextAuth(config)
