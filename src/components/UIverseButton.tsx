import React from 'react'

import './UIverseButton.css'
export default function UIverseButton({name,placeHolder}:{name:string,placeHolder:string}) {
  return (
    <input placeholder={placeHolder} className="input" name={name} type="text" />
  )
}