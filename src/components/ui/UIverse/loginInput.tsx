import React, { Children } from 'react'
import "./loginInput.css"
import ProfileIcon from '../svg/profileIcon'
type Props = {
    readonly?: boolean
    placeholder: string
    name: string
    refprop?: React.RefObject<HTMLInputElement>
    type: string
    Icon?: React.ReactNode // Provide the correct type for Icon prop
}
const LoginInput = (props : Props) => {
  return (
<div  className="form__group ">
    <input type={props.type} name={props.name} className="form__field" placeholder="Name" />
    <div className='absolute right-3 top-5  w-8'>
    {props.Icon}
    </div>
    <label htmlFor="name" className="form__label">{props.placeholder}  </label>

</div>
  )
}

export default LoginInput