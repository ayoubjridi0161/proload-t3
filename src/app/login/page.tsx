import { auth, signOut } from 'auth'
import React from 'react'
import { ButtonBlack, ButtonWhite } from '~/components/ui/UIverse/Buttons';
import { Button } from '~/components/ui/button';
import { Login } from '~/components/ui/form/login'

const page = async () => {
    const credentials = await auth();
    console.log(credentials)
  return (
    <>
    <div className='bg-black grid place-items-center h-screen'>
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
        <Button type='submit' size={'lg'} variant={'outline'} >Logout</Button>
        </form>
        {credentials ? <div className='text-white'>you're logged in </div> : <p className='text-white'>youre not</p>}
        <Login />
    </div>
    </>

  )
}

export default page