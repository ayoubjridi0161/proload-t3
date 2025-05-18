"use client"

import React from 'react'
import { Providers } from '~/app/providers'
import Link from 'next/link'
import { Avatar, AvatarFallback ,AvatarImage } from './avatar'
import { signOut, useSession } from 'next-auth/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'
type Props = {
    UUID:string 
    userName:string
    image:string
    
}
const DropDown = (props:Props) => {
  return (
      <DropdownMenu >
      <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer' >
                <AvatarImage src={props.image}></AvatarImage>
                <AvatarFallback >{ `${props.userName[0]?.toUpperCase()}${props.userName[1]}` }</AvatarFallback>
              </Avatar>
              {/* </Link> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label="Static Actions">
      <DropdownMenuItem key="new"><Link href={`/profile`}>Profile</Link></DropdownMenuItem>
      <DropdownMenuItem key="new"><Link href={'/profile/settings'} >Settings</Link></DropdownMenuItem>
      <DropdownMenuItem key="new"><button onClick={() => void signOut()}>Sign Out</button></DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
     )
}

export default DropDown
