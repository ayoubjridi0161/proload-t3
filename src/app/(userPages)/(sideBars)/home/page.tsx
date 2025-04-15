import { auth } from 'auth'
import React from 'react'
import Advertising from '~/components/component/Advertising'
import { roboto } from '~/components/ui/font'
import AddPost from '~/components/ui/neopost/AddPost'
import Header from '~/components/ui/neopost/header'
import Post from '~/components/ui/neopost/post'
import { AppSidebar } from '~/components/ui/neopost/sideBar'
import SideConnets from '~/components/ui/neopost/sideConnets'
import { Separator } from '~/components/ui/separator'
import { Sidebar, SidebarContent, SidebarHeader } from '~/components/ui/sidebar'
import WorkoutCalendar from '~/components/ui/userDashboard/workoutCalendar'
import { fetchWorkoutDates } from '~/lib/actions'
import { getPosts, getUserLikes } from '~/lib/data'
import { timeAgo } from '~/lib/utils'

type Props = {}

export default async function page({}: Props) {
    const posts = await getPosts();
    const session = await auth()
    const userName= session?.user?.name
    const image = session?.user?.image
    const UUID = session?.user?.id
    if(!UUID || !userName ) throw new Error("No user ID found")
    const likes = await getUserLikes(UUID)
    const dates = await fetchWorkoutDates()

    
    return (
      <>
      <section className='w-full md:w-1/2 lg:w-2/5 p-5 overflow-y-scroll'>
        <AddPost image = {image ??"https://s3.eu-north-1.amazonaws.com/proload.me/2tUwhlyV-0Os5QTONBxxQ"} />
        {posts?.map((post)=> <Post shares={post.shares} sharedPostId={post.sharedPostId}  appUser={userName} time={timeAgo(post.createdAt)} media = {post.resources} likes={post.likes} key={post.id} id={post.id} userImage={post.users.image ?? ""} liked={likes?.includes(post.id)} userName={post.users.name ?? ""} userId={post.userId ?? "undefined"} title={post.title} postContent={post.content} comments={post.comments} />)}
      </section>
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