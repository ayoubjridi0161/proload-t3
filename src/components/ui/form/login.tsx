'use client'
import { useFormState, useFormStatus } from "react-dom"
import { GitBranch,Github } from "lucide-react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../button" 

import LoginInput from "../UIverse/loginInput"
import Link from "next/link"
import LockIcon from "../svg/lockIcon"
import MailIcon from "../svg/mailIcon"
import { signIn } from "auth"
import { githubSignIn, login } from "~/lib/actions/authentication"
import { Input } from "../input"
export const Login =  ()=>{
    // const [error,action,isPending] = useActionState(login,null);
    const [error,action] = useFormState(login,null)
    const router = useRouter()
    console.log(error)
    if(error?.message === "success"){
        router.push('/workouts')
    }
    return (
        <div className='flex flex-col items-center gap-6'>
<form className='w-full flex flex-col items-center  gap-5 ' action={action}>
    <Input placeholder='email' name='email '  />
    <Button className='w-1/2 '>sing In with Resend</Button>
</form>  
<form className='w-full flex-col flex items-center ' action={githubSignIn}>
    <Button className=''><Github /></Button>
</form>
</div>)
}
const LocalButton = ()=>{
    const {pending} = useFormStatus()
    console.log("pending;",pending)
    return(
  <Button variant={"default"}  className={pending ? "bg-slate-500 " :  " "}>Sign in</Button>

    )
}