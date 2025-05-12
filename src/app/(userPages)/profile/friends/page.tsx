import React from 'react'
import { FriendList } from '~/components/ui/neoprofile/friends-list'
import { getFriendListAction, getUserProfile } from '~/lib/actions/userActions'

type Props = {}

export default async  function page({}: Props) {
  const friendsList = await getFriendListAction()
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Friends</h1>
      {!friendsList ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No friends found.</p>
        </div>
      ) : 
      
      <FriendList connects={friendsList} />
    }
    </div>
  )
}