import React from 'react'

import './UIverseButton.css'
interface UIverseButtonProps {
  defaultval?: string;
  name: string;
  placeHolder: string;
  'aria-label': string;
}

export default function UIverseButton({ 
  defaultval,
  name,
  placeHolder,
  'aria-label': ariaLabel
 }: UIverseButtonProps) {
  return (
    <input 
      defaultValue={defaultval ?? ""} 
      required 
      placeholder={placeHolder} 
      className="input" 
      name={name} 
      type="text"
      aria-label={ariaLabel}
      role="textbox"
    />
  )
}