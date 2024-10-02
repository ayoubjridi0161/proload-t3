// "use client"
// import React, { useEffect } from 'react'
// import './signup.css'
// import {signup} from '~/lib/actions'
// import { useFormState } from 'react-dom'
// import { useRouter } from 'next/navigation'
// import LoginInput from '../UIverse/loginInput'
// import { Button } from '../button'
// import ProfileIcon from '../svg/profileIcon'
// import MailIcon from '../svg/mailIcon'
// import { Checkbox } from '../checkbox'
// import { inter } from '../font'

// export const Signup = () => {
//     const [error, action] = useFormState(signup,null)
//     console.log(error)
//     const router = useRouter()
//     useEffect(()=>{
//         if(error?.message === "success"){
//             router.push('/login')
//         }
//     },[error]) 
//   return (
//     <div className=" flex-col flex items-stretch w-3/4 mx-auto font-semibold">
//         <p className={`${inter.className} text-center my-5  text-3xl font-bold `}
//         >Registration</p>
//         <form action={action} className='space-y-5' >
//             <input type="hidden" value={"check"} name='check' />
//             <div className="flex flex-col">
//                 <LoginInput Icon={<ProfileIcon/>} name='username' placeholder="username"  type="text"/>
//                 {/* error message */}
//                 <p className='text-red-950 text-md pl-1 pt-1'>{error?.message ==="users_username_unique" ?? "username already exists!" }</p>
//             </div>
//             <div className="">
//                 <LoginInput Icon={<MailIcon/>} name='email' placeholder="email"   type="email"/>
//                 {/* error message */}
//                 <p className='text-red-950 text-md pl-1 pt-1'> {error?.message ==="users_email_unique" ? "email already exists!" : ""   } </p>
//             </div>
//             <div className="">
//                 <LoginInput  name='password' placeholder="password" type="password"/>
//             </div>
//             <div className="">
//                 <LoginInput  name='repeatPassword' placeholder="Repeat password" type="password"/>
//             </div>  
//             <div className="flex items-center space-x-2">
//       <Checkbox id="terms" />
//       <label
//         htmlFor="terms"
//         className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//       >
//         I agree to the terms & conditions 
//       </label>
//     </div>
//             <div className='space-y-5'>
//                 <Button className='w-full' >SIGN UP</Button>
//                 <p className='text-center text-md'>Have an account? <a className="underline ml-3" href="/login">Login Here!</a></p>
//             </div>

//             {/* <p className='text-center text-red-900'>{error?.message}</p> */}
//             </form>
//     </div>
// )
// }
