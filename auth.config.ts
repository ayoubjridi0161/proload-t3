import { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ request: {nextUrl},auth }) {
            const isLoggedIn = !!auth?.user;
            const isOnWorkouts = nextUrl.pathname.startsWith('/workouts');
            if(isOnWorkouts){
                if(isLoggedIn) return true; 
                return false;//redirect to signIn page
            }
            else if(isLoggedIn){
                return Response.redirect(new URL('/dashboard', nextUrl));
        
            }
            return true
        }
    },
        providers:[]

} satisfies NextAuthConfig;