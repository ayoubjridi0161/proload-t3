import React from 'react'
import './signup.css'
import {signup} from '~/lib/actions'

export const Signup = () => {
  return (
    <div className="container">
    <div className="form_area">
        <p className="title">SIGN UP</p>
        <form action={signup}>
            <div className="form_group">
                <label className="sub_title" htmlFor="name">Username</label>
                <input name='username' placeholder="Enter your full name" className="form_style" type="text"/>
            </div>
            <div className="form_group">
                <label className="sub_title" htmlFor="email">Email</label>
                <input name='email' placeholder="Enter your email" id="email" className="form_style" type="email"/>
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
