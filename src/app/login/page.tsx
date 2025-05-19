
import React from 'react'
import EmailLogin from '~/components/ui/form/emailLogin';

const page =  () => {
  return (
    <>
    <div className=' grid place-items-center h-screen  ' style={{
      background:"url('./loginBackground.png')",
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"bottom"
      }}>
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