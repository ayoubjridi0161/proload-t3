import React from 'react'
import { FriendList } from '~/components/ui/neoprofile/friends-list'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Friends</h1>
      <FriendList />
    </div>
  )
}