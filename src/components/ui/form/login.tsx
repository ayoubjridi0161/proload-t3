'use client'
import { login } from "~/lib/actions"
import './login.css'
import { useFormState, useFormStatus } from "react-dom"
export const Login =  ()=>{

    const [errorMessage, dispatch] = useFormState(login,undefined);
    return (
        <form action={login} className="form">
  <div className="title">Welcome,<br/><span>sign up to continue</span></div>
  <input className="input" name="email" placeholder="Email" type="email"/>
  <input className="input" name="password" placeholder="Password" type="password"/>
  <button className="button-confirm">Let`s go →</button>
  <p className="text-white">Don't have an account <a className="text-white font-semibold underline" href="/signup">Sign Up Here!</a></p>
   {errorMessage && <p className="text-red-500">{errorMessage.message}</p>}
   
</form>
    )
}