import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import SideConnets from '~/components/ui/neopost/sideConnets'
import WorkoutCards from '~/components/ui/neoworkout/workouts-cards'
import { SidebarContent,Sidebar } from '~/components/ui/sidebar'
import WorkoutCalendar from '~/components/ui/userDashboard/workoutCalendar'
import { fetchWorkoutDates } from '~/lib/actions/userLogsActions'
import { getWorkoutList } from '~/lib/actions/workout'

type Props = {}

export default async function page({}: Props) {
  const dates = await fetchWorkoutDates()
    const workoutSummaryList = await getWorkoutList()
    const workouts = await Promise.all(workoutSummaryList) 
  return (
    <>
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Workout Library</h1>
      <p className="text-muted-foreground mb-8">
        Browse workouts shared by the community. Find the perfect routine for your fitness goals.
      </p>
      <WorkoutCards workouts={workouts} />
    </div>
    <Sidebar side='right'  className="border-left-1 px-3 bg-[#f2fcf5] top-[--header-height] !h-[calc(100svh-var(--header-height))]" >
    <SidebarContent className='bg-[#f2fcf5] space-y-3'>
  <WorkoutCalendar workoutDates={dates} />
  <Separator className='w-2/3 mx-auto'/>
  <SideConnets />
  </SidebarContent>
  </Sidebar>
  </>
  )
}