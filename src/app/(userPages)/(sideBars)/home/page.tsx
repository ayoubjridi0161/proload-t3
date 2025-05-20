import { auth } from 'auth'
import React, { Suspense } from 'react'
import AddPost from '~/components/ui/neopost/AddPost'
import SideConnets from '~/components/ui/neopost/sideConnets'
import { Separator } from '~/components/ui/separator'
import { Sidebar, SidebarContent, SidebarHeader } from '~/components/ui/sidebar'
import WorkoutCalendar from '~/components/ui/userDashboard/workoutCalendar'
import { fetchWorkoutDates } from '~/lib/actions/userLogsActions'
import PreloadPosts from './preloadPosts'
import PostSkeleton from '~/components/skeletons/postSkeleton'
import { getUserWorkouts } from '~/lib/actions/workout'
import { InfiniteScrollPosts } from './InfiniteScroll'
type Props = {}
export default async function page({}: Props) {
    const session = await auth()
    const userName= session?.user?.name
    const image = session?.user?.image
    const UUID = session?.user?.id
    if(!UUID || !userName ) throw new Error("No user ID found")
    const dates = await fetchWorkoutDates()
    const workoutsToShare = await getUserWorkouts(true,UUID)
    const awaitedWorkouts = await Promise.all(workoutsToShare) 
    return (
      <>
      <section className='w-full md:w-1/2 lg:w-2/5 p-5  overflow-y-auto'>
        <AddPost awaitedWorkouts={awaitedWorkouts} image={image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/2tUwhlyV-0Os5QTONBxxQ"} />
        <Suspense fallback={<><PostSkeleton /><PostSkeleton /></>}>
            <PreloadPosts UUID={UUID} userName={userName} />
            {/* <InfiniteScrollPosts UUID={UUID} userName={userName} /> */}
        </Suspense>
      </section>
    <Sidebar side='right'  className="border-left-1 dark:border-xtraDarkAccent px-3 top-[--header-height] !h-[calc(100svh-var(--header-height))]" >
    <SidebarContent className='space-y-3'>
      <WorkoutCalendar workoutDates={dates} />
      <Separator className='w-2/3 mx-auto'/>
      <SideConnets />
      </SidebarContent>
      </Sidebar>
      </>
  )
}