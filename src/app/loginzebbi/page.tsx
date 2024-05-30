import { auth } from "auth";
import SignInPage from "~/components/ui/SignIn-form"
import { Button } from "~/components/ui/button";
import LoginForm from "~/components/ui/login-form"
export default async function page(){
     const session = await auth();
    return (

        <div className="h-screen grid place-items-center ">
        {session?.user ? <h1>you are logged in</h1> : <h1>you are not logged in</h1>}
        <Button></Button>
        <LoginForm />
        {/* <SignInPage/> */}
        </div>
    )

}