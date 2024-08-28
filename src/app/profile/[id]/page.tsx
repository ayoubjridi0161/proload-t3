import React, { Suspense } from 'react'
import ProfilePage from '~/components/ui/profile/profilePage'
import { getWorkoutsByUser } from '~/lib/data'


const   page = async ({params} : {params:{id:string}}) => {
    return (
<Suspense fallback={<div>loading...</div>}>
<ProfilePage id={params.id} />
</Suspense>
  )
}

export default page