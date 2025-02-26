import React from 'react'
import { cn } from '~/lib/utils'

type Props = {
    children? : React.ReactNode,
    className?: string
}

const Container = ({children,className}: Props) => {
  return (
    <div className={cn("bg-[#f2fcf5] p-5 rounded-lg text-[#63949E]",className)}>{children}</div>
  )
}

export default Container