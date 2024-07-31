"use server"
import React from 'react'
import { fetchWorkoutById, getWorkoutsByUser } from '~/lib/data'
import {auth} from 'auth'
import EditWorkout from '~/components/ui/workouts/EditWorkout'
const Page = async ({params} : {params:{id:string}}) => {
  const session = await auth()
  if(!session) throw new Error('Not session')
  if(!session.user) throw new Error('Not user')
  if(!session.user.email) throw new Error('Not email')

  const workoutIDs = await getWorkoutsByUser(session.user.email)
  const flattenedWorkoutIDs = workoutIDs.map(({id}) => id)
  const workoutID = Number(params.id)
  if(! flattenedWorkoutIDs.includes(workoutID)) throw new Error(' not authed')
  const data = await fetchWorkoutById(workoutID)
  if (!data) throw new Error('Workout not found')
  const {name, description, days ,id , numberOfDays} = data
  const email = session.user.email
  // console.log(`name:${name} , description:${description}, days : ${days}, id : ${id}, email:${email}`)
  return (
     <EditWorkout NoD = {numberOfDays} name = {name} description = {description} days = {days} id = {id} email = {email} />
    
  )
}

export default Page