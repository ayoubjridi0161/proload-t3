'use client'
import { login } from "~/lib/actions"
import './login.css'
import { useFormState, useFormStatus } from "react-dom"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
export const Login =  ()=>{
    // const [error,action,isPending] = useActionState(login,null);
    const [error,action] = useFormState(login,null)
    const router = useRouter()
    if(error?.message === "success"){
        router.push('/workouts')
    }
    return (
        <form action={action} className="form">
  <div className="title">Welcome,<br/><span>sign up to continue</span></div>
  <input className="input" name="email" placeholder="Email" type="email"/>
  <input className="input" name="password" placeholder="Password" type="password"/>
  <Button />
  <p className="text-white">Dont have an account <a className="text-white font-semibold underline" href="/signup">Sign Up Here!</a></p>
   <p className="text-white">{error && error.message}</p>
</form>
    )
}
const Button = ()=>{
    const {pending} = useFormStatus()
    return(
  <button  className={pending ? "bg-white button-confirm" :"button-confirm"}>Let`s go →</button>

    )
}