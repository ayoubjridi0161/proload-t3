"use server"
import { Separator } from '@radix-ui/react-separator'
import SideConnets from '~/components/ui/neopost/sideConnets'
import Header from '~/components/ui/neoworkout/header'
import { SidebarContent,Sidebar } from '~/components/ui/sidebar'
import WorkoutCalendar from '~/components/ui/userDashboard/workoutCalendar'
import { fetchWorkoutDates } from '~/lib/actions/userLogsActions'
import Footer from '~/components/ui/neoworkout/footer'
import PerloadWorkouts from './perloadWorkouts'
import { Suspense } from 'react'
import { WorkoutCardSkeleton } from '~/components/skeletons/workout-cardSkeleton'

export default async function page(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search;
  const page = Number(searchParams?.page) ?? 1;
  const sortFiled = searchParams?.sort ;
  const order = searchParams?.order;
  const dates = await fetchWorkoutDates()
  
  return (
<>
    <div className="container py-8 space-y-4">
      <Header/>    
      <PerloadWorkouts order={order} page={page} search={search} sortFiled={sortFiled} />
      <Footer currentPage={ page> 0 ?  page  : 1} hasNextPage/>
    </div>
    <Sidebar side='right'  className="border-left-1 dark:border-xtraDarkAccent px-3 top-[--header-height] !h-[calc(100svh-var(--header-height))]" >
    <SidebarContent className='space-y-3'>
  <WorkoutCalendar workoutDates={dates} />
  <Separator className='w-2/3 mx-auto'/>
  <SideConnets />
  </SidebarContent>
  </Sidebar></>
  )
}