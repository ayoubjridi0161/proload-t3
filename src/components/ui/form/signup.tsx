"use client"
import React, { useEffect } from 'react'
import './signup.css'
import {signup} from '~/lib/actions'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

export const Signup = () => {
    const [error, action] = useFormState(signup,null)
    console.log(error)
    const router = useRouter()
    useEffect(()=>{
        if(error?.message === "success"){
            router.push('/login')
        }
    },[error]) 
  return (
    <div className="container">
    <div className="form_area">
        <p className="title">SIGN UP</p>
        <form action={action}>
            <div className="form_group">
                <label className="sub_title" htmlFor="name">Username</label>
                <input name='username' placeholder="Enter your username" className="form_style" type="text"/>
                <p className='text-destructive text-sm pl-1 pt-1'>{error?.message ==="users_username_unique" ?? "username already exists!" }</p>
            </div>
            <div className="form_group">
                <label className="sub_title" htmlFor="email">Email*</label>
                <input name='email' placeholder="Enter your email" id="email" className="form_style" type="email"/>
                <p className='text-destructive text-sm pl-1 pt-1'> {error?.message ==="users_email_unique" ?? "email already exists!"  } </p>
            </div>
            <div className="form_group">
                <label className="sub_title" htmlFor="password">Password</label>
                <input name='password' placeholder="Enter your password" id="password" className="form_style" type="password"/>
            </div>
            <div>
                <button className="btn">SIGN UP</button>
                <p>Have an Account? <a className="link" href="/login">Login Here!</a></p><a className="link" href="">
            </a></div><a className="link" href="">
        
    </a></form></div><a className="link" href="">
</a></div>
)
}
