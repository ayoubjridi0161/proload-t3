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
import { getPosts, getUserLikes } from '~/lib/data'
import { timeAgo } from '~/lib/utils'

type Props = {}

export default async function page({}: Props) {
    const posts = await getPosts();
    const session = await auth()
    const userName= session?.user?.name
    const image = session?.user?.image
    const UUID = session?.user?.id
    if(!UUID) throw new Error("No user ID found")
    const likes = await getUserLikes(UUID)
  
    
    return (
    <main className='flex gap-2 justify-around max-h-full'>
      <AppSidebar className="sticky top-0 pt-5" />
      <section className='w-2/3 p-5 overflow-y-scroll'>
        <AddPost image = {image ??"https://s3.eu-north-1.amazonaws.com/proload.me/2tUwhlyV-0Os5QTONBxxQ"} />
        {posts?.map((post)=> <Post time={timeAgo(post.createdAt)} media = {post.resources} likes={post.likes} key={post.id} id={post.id} userImage={post.users.image ?? ""} liked={likes?.includes(post.id)} userName={post.users.name ?? ""} userId={post.userId ?? -1} title={post.title} postContent={post.content} comments={post.comments} />)}
      </section>
      <section className='flex justify-end w-1/4'>
        <Separator orientation='vertical' />
        <SideConnets className="" />
      </section>
    </main>
  )
}