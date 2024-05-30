import Link from "next/link";
import LoginForm from "~/components/ui/login-form";
import {} from 'next-auth'
import { auth } from "auth";
import Header from "~/components/ui/Header";
import { Button } from "~/components/ui/button";
import { getUser } from "~/lib/actions";
export default async function HomePage() {
  const session = await auth();
  console.log("session is ",session)
  const user = await getUser()

  return (

    <>
    <Header/>
    <main className="flex min-h-screen flex-col items-center bg-background justify-center  ">
      <h1 className="text-text font-body">{JSON.stringify(user)}</h1>
      
    </main>
  
  </>
  );
}
