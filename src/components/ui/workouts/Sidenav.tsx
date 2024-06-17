import React from 'react'
import Container from '../Container'
import { auth } from 'auth'
import { Avatar, AvatarFallback } from '../avatar'

export default async function Sidenav({username}: {username:string | undefined | null}) {

  return (
    <Container className=' h-fit border rounded-lg items-center flex justify-between '>
      <h1>ProLoad</h1>
      {username && <Avatar>
        <AvatarFallback >{ username[0]?.toUpperCase() }</AvatarFallback>
      </Avatar>}
      </Container>
    
  )
}