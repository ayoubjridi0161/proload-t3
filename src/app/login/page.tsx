
import { auth } from 'auth'
import React from 'react'
import { ButtonBlack, ButtonWhite } from '~/components/ui/UIverse/Buttons';
import { Button } from '~/components/ui/button';
import { Login } from '~/components/ui/form/login'
import { signout } from '~/lib/actions';

const page = async  () => {
  const session = await auth()
  return (
    <>
    <div className='bg-[--primary] grid place-items-center h-screen'>
    <form
      action={signout}>
        <Button type='submit' size={'lg'} variant={'outline'} >Logout</Button>
    </form>
    {session?.user ? <h1 className='text-white bg-primary-foreground'>Welcome {session.user.name}</h1> : <h1 className='text-white bg-black '>who tf is this </h1>}
        <Login />
    </div>
    </>

  )
}

export default page