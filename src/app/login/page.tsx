
import { auth } from 'auth'
import React from 'react'
import { ButtonBlack, ButtonWhite } from '~/components/ui/UIverse/Buttons';
import { Button } from '~/components/ui/button';
import EmailLogin from '~/components/ui/form/emailLogin';
import { Login } from '~/components/ui/form/login'
import { signout } from '~/lib/actions';

const page = async  () => {
  return (
    <>
    <div className=' grid place-items-center h-screen '>
    <div className=" w-full bg-slate-300/10 backdrop-blur-md rounded-3xl max-w-md p-6 shadow-lg">
          <div className=" ">
            <EmailLogin />
          </div>
        </div>
    
    
    </div>
    </>

  )
}

export default page