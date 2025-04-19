import { auth } from "auth";
import { Console } from "console";
import { type NextRequest, NextResponse } from "next/server";



const protectedRoutes = ["/profile","/neopost","/neoworkout"]

export default async function middleware(request: NextRequest){
    const session = await auth()
    // console.log("middleware Called")

    const {pathname} = request.nextUrl

    const isProtected= protectedRoutes.some((route)=> pathname.startsWith(route))
    // if(session){
    //     if(!session.user?.name){
    //         if( pathname!== "/profile/settings"){
    //             return NextResponse.redirect(new URL("/profile/settings",request.nextUrl))
    //         }
    //     }
    // }
    // if (session?.user?.needsProfileSetup && !request.nextUrl.pathname.startsWith('/profile/settings')) {
    //     console.log(session.user)
    // }

    if (isProtected && !session){
        return NextResponse.redirect(new URL("/api/auth/signin",request.nextUrl))
    }
    return NextResponse.next()
}

