import { auth } from "auth";
import { Console } from "console";
import { type NextRequest, NextResponse } from "next/server";



const protectedRoutes = ["/profile","/neopost","/neoworkout","dashboard","home"]

export default async function middleware(request: NextRequest){
    const session = await auth()
    const {pathname} = request.nextUrl
    const isProtected = protectedRoutes.some(route => 
        pathname === route || pathname.startsWith(`${route}/`)  // More precise matching
      );
    if((session && session?.user as { onboarded?: boolean })?.onboarded === false){
        if(pathname !== "/onboarding"){
            return NextResponse.redirect(new URL("/onboarding",request.nextUrl))
        }
    }
    if (isProtected && !session){
        return NextResponse.redirect(new URL("/api/auth/signin",request.nextUrl))
    }
    if(session && pathname === "/login"){
        return NextResponse.redirect(new URL("/home",request.nextUrl))
    }
    if(pathname.startsWith("/admin")&& session?.user?.email !== "proofyouba@gmail.com"){
        return NextResponse.redirect(new URL("/home",request.nextUrl))
    }

    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'private, no-store, max-age=0');
    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  };

