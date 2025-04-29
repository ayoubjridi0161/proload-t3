"use server"
import React from 'react'
import { fetchWorkoutById, getExerciceNames } from '~/lib/data'
import {auth} from 'auth'
import EditWorkout from '~/components/ui/workouts/EditWorkout'
import { getWorkout } from '~/lib/actions/workout'
import { redirect } from 'next/navigation'
const Page = async ({params} : {params:{id:string}}) => {
  const {res,owned,err} = await getWorkout(Number(params.id))
  if(err)
    {console.log("err",err)
      redirect('/workouts')
    }
  if (!res) throw new Error('Workout not found')
  const {name, description, days ,id , numberOfDays, userId} = res
  const exerciceNames = await getExerciceNames()
  // console.log(`name:${name} , description:${description}, days : ${days}, id : ${id}, email:${email}`)
  return (
     <EditWorkout ownerId={userId ?? ""} exerciceNames={exerciceNames} NoD = {numberOfDays} name = {name} description = {description} days = {days} id = {id} owned={owned}  />
  )
}

export default Page