import { auth } from 'auth'; // Adjust the import path according to your project structure
import { NextResponse } from 'next/server';

export async function GET(req:Request) {
    const session = await 
    auth();
    console.log("session is",session)
    if (!session) {
      return NextResponse.json({ error: "Not Authenticated" }, { status: 400 });
    }
    return NextResponse.json({ success: session }, { status: 200 });

}

