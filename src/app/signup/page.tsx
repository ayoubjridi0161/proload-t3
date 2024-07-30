import React from 'react'
import { Signup } from '~/components/ui/form/signup'

const page = () => {
  return (
    <>
    <div className='flex justify-center items-start mt-10 h-screen '>
    {/* <form
      action={signout}>
        <Button type='submit' size={'lg'} variant={'outline'} >Logout</Button>
    </form> */}
    {/* {session?.user ?  <h1 className='text-white bg-primary-foreground'>Welcome {session.user.name}</h1> : <h1 className='text-white bg-black '>who tf is this </h1>} */}
    <div className=" w-full bg-slate-300/10 backdrop-blur-md rounded-3xl max-w-md p-6 shadow-lg">
          <div className=" ">
            <Signup />
          </div>
        </div>
    
    
    </div>
    </>
  )
}
export default page;