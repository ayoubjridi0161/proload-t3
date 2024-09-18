"use server"
import React from 'react'
import { fetchWorkoutById } from '~/lib/data'
import {auth} from 'auth'
import EditWorkout from '~/components/ui/workouts/EditWorkout'
import { useAuth } from '~/lib/hooks/useAuth'
import { getWorkoutByUser } from '~/lib/actions'
const Page = async ({params} : {params:{id:string}}) => {
  const [error,email,userName ] = await useAuth();
  if(!email) throw new Error('not authed')
  const {res,err} = await getWorkoutByUser(email)
  if(!res)
    {console.log("err",err)
     return (<div>this is not your workout</div>)
    }
  const flattenedWorkoutIDs = res.map(({id}) => id)
  const workoutID = Number(params.id)
  if(! flattenedWorkoutIDs.includes(workoutID)) throw new Error(' not authed')
  const data = await fetchWorkoutById(workoutID)
  if (!data) throw new Error('Workout not found')
  const {name, description, days ,id , numberOfDays} = data
  
  // console.log(`name:${name} , description:${description}, days : ${days}, id : ${id}, email:${email}`)
  return (
     <EditWorkout NoD = {numberOfDays} name = {name} description = {description} days = {days} id = {id} email = {email} />
  )
}

export default Page