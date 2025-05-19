"use client"
import React from 'react'
import { Button } from '~/components/ui/button'
import { seedWorkouts } from '~/server/db/seedWorkout'

type Props = {}

export default function GenerateWorkout({}: Props) {
   const handleClick = () => {
    // const workout = seedWorkouts()
    
  }
  
  return (
      <Button onClick={handleClick} >add routine</Button>
  )
}