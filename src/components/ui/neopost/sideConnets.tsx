import React from 'react'
import { Avatar, AvatarImage ,AvatarFallback} from '../avatar'
import { cn } from '~/lib/utils'
import { getConnects } from '~/lib/actions'

export default async function SideConnets({className}: {className:string}) {
  const users = await getConnects()
  return (
    <div className={cn('p-5 h-fit mt-4 space-y-6 w-fit sticky top-0',className)}>
        <p className='text-md text-xtraDark'>Stay connected with:</p>
        <div className='space-y-4'>
        {users?.map((user,i)=> <a href={`/profile/${user.id}`} key={i} className='cursor-pointer flex gap-2 items-center'>
            <Avatar >
            <AvatarFallback>{user?.name ? user.name[0] : "u"}</AvatarFallback>
            <AvatarImage src={user.image ?? ""} />
            </Avatar>    
            <h1 className='hover:underline'>{user.name}</h1>
        </a>)}
        </div>
    </div>
  )
}
