import { cn } from '~/lib/utils'
import React from 'react'



const Container = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} style={{
        padding: '20px',
        background: 'lightgrey',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '20px',
        borderRadius: '5px',
        border: '2px solid #323232',
        boxShadow: '4px 4px #323232'
      }}  className={cn("",props.className)} />
  )
}
export default Container