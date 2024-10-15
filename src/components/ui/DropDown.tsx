"use client"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import React from 'react'
import { Providers } from '~/app/providers'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { Avatar, AvatarFallback ,AvatarImage } from './avatar'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
type Props = {
    UUID:string 
    userName:string
    image:string
    
}
const DropDown = (props:Props) => {
  const router = useRouter()
  return (
<Providers>
      <Dropdown>
      <DropdownTrigger>
      {/* <Link href={`/profile/${props.UUID}`}> */}
              <Avatar >
                <AvatarImage src={props.image}></AvatarImage>
                <AvatarFallback >{ `${props.userName[0]?.toUpperCase()}${props.userName[1]}` }</AvatarFallback>
              </Avatar>
              {/* </Link> */}
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
      <DropdownItem key="new"><Link href={`/profile/${props.UUID}`}>Profile</Link></DropdownItem>
      <DropdownItem key="new"><button onClick={() => signOut()}>Sign Out</button></DropdownItem>
      <DropdownItem key="new" onClick={()=>{router.push("/editprofile")}}>settings</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    </Providers>  )
}

export default DropDown
