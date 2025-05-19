import React, { Suspense } from 'react'
import { Button } from '~/components/ui/button'
import { andika } from '~/components/ui/font'
import Container from '~/components/ui/userDashboard/Container'
import Image from 'next/image'
import { Chip } from '@nextui-org/react'
import WorkoutSkeleton from '~/components/ui/workoutShowCase/skeleton/workoutSkeleton'
import Workout from '~/components/ui/workoutShowCase/Workout'
import { getUserCurrentWorkout } from '~/lib/actions/workout'


type Props = {}

export default async function page({}: Props) {
      const workout =  await getUserCurrentWorkout()
      
  return (
    <p>{workout && JSON.stringify(workout)}</p>
  )
}
const DumbbellIcon = ()=>{
    return(<svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
        <path fill="#00c846" d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22l1.43-1.43L16.29 22l2.14-2.14l1.43 1.43l1.43-1.43l-1.43-1.43L22 16.29z" strokeWidth={0.7} stroke="#00c846"></path>
    </svg>)
}