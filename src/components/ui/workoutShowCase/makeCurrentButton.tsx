"use client"
import React from 'react'
import { Button } from '../button'
import { makeCurrentWorkoutAction } from '~/lib/actions/workout'
import { toast } from 'sonner'

type Props = {
    userID:string
    workoutID:number 
}

export default function MakeCurrentButton({
    userID,workoutID
}: Props) {
    async function makeCurrentButton(){
        if(!userID || !workoutID) {
          toast.error("failed to make current workout, please try again later")
          return
        }
        const res = await makeCurrentWorkoutAction(userID,workoutID)
        if(res == "success"){
          toast.success("workout made current")
        }else{
          toast.error("failed to make current workout, please try again later")
        }
      }
  return (
    <Button onClick={()=> void makeCurrentButton()} className="border-0 px-1 " variant={"outline"}>
          Make Current
        </Button>
  )
}