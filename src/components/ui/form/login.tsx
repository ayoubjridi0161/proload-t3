'use client'
import { githubSignIn, login } from "~/lib/actions"

import { useFormState, useFormStatus } from "react-dom"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../button" 
import Input from "../UIverse/Input"
import LoginInput from "../UIverse/loginInput"
import Link from "next/link"
import LockIcon from "../svg/lockIcon"
import MailIcon from "../svg/mailIcon"
import { signIn } from "auth"
// import { MailIcon } from "lucide-react"
export const Login =  ()=>{
    // const [error,action,isPending] = useActionState(login,null);
    const [error,action] = useFormState(login,null)
    const router = useRouter()
    if(error?.message === "success"){
        router.push('/workouts')
    }
    return (
        <div>
        <form action={action} className="flex flex-col w-9/12 mx-auto    items-stretch gap-4 h-[60vh]">
  <div className="text-3xl font-bold text-center mb-16">Sign In</div>
  <LoginInput Icon={<MailIcon/>}  name="email" placeholder="Email" type="email"/>
  <LoginInput  name="password" placeholder="Password" type="password"/>
  <Link href={"/"}  className=" self-end font-medium">Forgot password</Link >
  <LocalButton />
  <p className="text-black text-center">Dont have an account <a className="text-black font-semibold underline" href="/signup">Register!</a></p>
   <p className="text-red-950">{error && error.message}</p>
 </form>
<form action={githubSignIn}>
      <button type="submit">Signin with GitHub</button>
    </form>
</div> 

    )
}
const LocalButton = ()=>{
    const {pending} = useFormStatus()
    return(
  <Button variant={"default"}  className={pending ? "bg-gray " :  " "}>Sign in</Button>

    )
}