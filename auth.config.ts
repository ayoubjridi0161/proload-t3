import type { NextAuthConfig } from "next-auth";
import { redirect } from "next/navigation";

export const authConfig = {
    pages:{
        signIn:'/login',
        error:'/auth/error',
        newUser:'/editprofile'
    },
    callbacks:{
      async signIn({ user, account, profile, email, credentials }) {
        console.log("sign in")
        if (user) {
          const isLoggedIn = !!user;
          if (isLoggedIn) {
            console.log("logged in")
              return true;
          }
      }
      return false;
      },
      async session({ session, user }) {
        console.log("session:",session);
        
        return session;
      },
        async authorized({ request: { nextUrl }, auth }) {
          console.log("authorization")
          const isLoggedIn = !!auth?.user;
          const { pathname } = nextUrl;
          if (pathname.startsWith('/login') && isLoggedIn) {
            console.log("authed user already");
            return Response.redirect(new URL('/', nextUrl));
        }
          const userName = auth?.user?.name
          if(!userName){
            return Response.redirect(new URL(`/profile/${auth?.user?.id}/setup`, nextUrl));
          }

          return true;
      },
      // async session({ session, user }) {
      //   console.log("session")
      //   if (!user.name) {
      //     redirect( '/profile/setup');
      //   }
      //   return session;
      // },
      },
    
    providers:[]
} satisfies NextAuthConfig;