import { auth } from "auth";
import { type NextRequest, NextResponse } from "next/server";



const protectedRoutes = ["/profile","/neopost","/neoworkout"]

export default async function middleware(request: NextRequest){
    const session = await auth()
    // console.log("middleware Called")

    const {pathname} = request.nextUrl

    const isProtected= protectedRoutes.some((route)=> pathname.startsWith(route))
    if(session){
        if(!session.user?.name && pathname !== "/profile/edit/details"){
            return NextResponse.redirect(new URL("/profile/edit/details",request.nextUrl))
        }
    }

    if (isProtected && !session){
        return NextResponse.redirect(new URL("/api/auth/signin",request.nextUrl))
    }
    return NextResponse.next()
}