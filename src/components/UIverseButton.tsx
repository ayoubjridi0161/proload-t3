import React from 'react'

import './UIverseButton.css'
export default function UIverseButton({defaultval,name,placeHolder}:{defaultval?:string,name:string,placeHolder:string}) {
  return (
    <input defaultValue={defaultval ?? ""} required placeholder={placeHolder} className="input" name={name} type="text" />
  )
}