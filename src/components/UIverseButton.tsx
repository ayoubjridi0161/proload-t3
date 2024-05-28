import React from 'react'

import './UIverseButton.css'
export default function UIverseButton({name,placeHolder}:{name:string,placeHolder:string}) {
  return (
  <div className="input-container">
    <input type="text" id="input" name={name} required/>
    <label htmlFor="input" className="label">{placeHolder}</label>
  <div className="underline"></div>
  </div>
  )
}