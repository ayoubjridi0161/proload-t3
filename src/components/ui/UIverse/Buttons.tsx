import React from 'react'
import { cn } from '~/lib/utils'
import './Button.css'
import { type ButtonProps } from '../button'
export const ButtonBlack = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, size, variant, ...props }, ref) => {
        return (
        <button 
            ref={ref}
            className="btnblack  button-confirm"
            {...props}
        >
            {children}
        </button>
        )
    }
        
)
    
    ButtonBlack.displayName = 'ButtonBlack'
    
    export const ButtonWhite = React.forwardRef<HTMLButtonElement, ButtonProps>(
        ({ children, className, size, variant, ...props }, ref) => {
            return (
            <button 
                ref={ref}
                className="btnwhite button-confirm"
                {...props}
            >
                {children}
            </button>
            )
        }
    )
    
    ButtonWhite.displayName = 'ButtonWhite'