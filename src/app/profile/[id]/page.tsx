import React, { Suspense } from 'react'
import ProfilePage from '~/components/ui/profile/profilePage'
import { getWorkoutsByUser } from '~/lib/data'


const   page = async ({params} : {params:{id:string}}) => {
    return (
<ProfilePage id={params.id} />
  )
}

export default page