"use client"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import React from 'react'
import { Providers } from '~/app/providers'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { Avatar, AvatarFallback } from './avatar'
import { signOut } from 'next-auth/react'
type Props = {
    UUID:string 
    userName:string
}
const DropDown = (props:Props) => {
  return (
<Providers>
      <Dropdown>
      <DropdownTrigger>
      {/* <Link href={`/profile/${props.UUID}`}> */}
              <Avatar >
                <AvatarFallback >{ `${props.userName[0]?.toUpperCase()}${props.userName[1]}` }</AvatarFallback>
              </Avatar>
              {/* </Link> */}
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
      <DropdownItem key="new"><Link href={`/profile/${props.UUID}`}>Profile</Link></DropdownItem>

      <DropdownItem key="new"><button onClick={() => signOut()}>Sign Out</button></DropdownItem>

      </DropdownMenu>
    </Dropdown>

    </Providers>  )
}

export default DropDown
