import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/workouts',
  '/components',
];
const unprotectedRoutes = ['/', '/login'];


import { auth } from 'auth';

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const isProtectedRoute = protectedRoutes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );
  if (!session && isProtectedRoute) {
    const absoluteURL = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  // if(session?.user?.name !== "proofv3" && isProtectedRoute){
  //   const absoluteURL = new URL('/', request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
  if(session?.user && request.nextUrl.pathname.startsWith('/login')){
    const absoluteURL = new URL('/workouts',request.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}