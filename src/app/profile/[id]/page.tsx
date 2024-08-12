import React from 'react'
import { getWorkoutsByUser } from '~/lib/data'

const   page = async ({params} : {params:{id:string}}) => {
const workouts = await getWorkoutsByUser("",params.id)
    return (
    <div>{workouts && JSON.stringify(workouts)}</div>


  )
}

export default page