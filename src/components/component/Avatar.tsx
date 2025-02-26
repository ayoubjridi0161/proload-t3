import Image from 'next/image'
import React from 'react'

type Props = {
    image:string,
}

export default function Avatar({image}: Props) {
  return (
    <Image src={image} alt={'image'} width={40} height={40}  className='border-1 border-black/35 rounded-md' />
  )
}