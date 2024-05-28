import React from 'react'
import './Input.css'
type Props = {
    readonly: boolean
    placeholder: string
    name: string
    refprop: React.RefObject<HTMLInputElement>
}

export default function Input(props: Props) {
  return (
    <input ref={props.refprop} name={props.name} type="text" readOnly={props.readonly} placeholder={props.placeholder} className="input"/>
  )
}
