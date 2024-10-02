import React from 'react'
import { githubSignIn, signInWithResend } from '~/lib/actions'
import { Button } from '../button'
import { Input } from '../input'
import { Github } from 'lucide-react'

const EmailLogin = () => {
  return (
    <div className='flex flex-col items-center gap-6'>
<form className='w-full flex flex-col items-center  gap-5 ' action={signInWithResend}>
    <Input type="email" placeholder='email' name='email '  />
    <Button className='w-1/2 '>sing In with Resend</Button>
</form>  
<form className='w-full flex-col flex items-center ' action={githubSignIn}>
    <Button className=''><Github /></Button>
</form>
</div>)
}

export default EmailLogin