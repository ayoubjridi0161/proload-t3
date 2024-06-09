import { cn } from '~/lib/utils'
import React from 'react'



const Container = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div style={{
        "padding": "20px",
    "background": "lightgrey",
    "borderRadius": "5px",
    "border": "2px solid #323232",
    "boxShadow": "4px 4px #323232"

    }} {...props} className={cn('',props.className)} />
  )
}
export default Container