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
import { getPosts } from '~/lib/data'

type Props = {}

export default async function page({}: Props) {
    const posts = await getPosts();
    const parsedPosts = posts.map((post)=> ({id:post.id , title:post.title, content:post.content , user:post.users.name , userImage:post.users.image , userId:post.userId , media : post.resources}))
  return (
    <main className='flex gap-2 justify-around max-h-full'>
      <AppSidebar className="sticky top-0 pt-5" />
      <section className='w-2/3 p-5 overflow-y-scroll'>
        <AddPost image = {"https://s3.eu-north-1.amazonaws.com/proload.me/2tUwhlyV-0Os5QTONBxxQ"} />
        {parsedPosts?.map((post)=> <Post media = {post.media} key={post.id} userImage={post.userImage ?? ""} userName={post.user ?? ""} userId={post.userId ?? -1} title={post.title} postContent={post.content} />)}
      </section>
      <section className='flex justify-end w-1/4'>
        <Separator orientation='vertical' />
        <SideConnets className="" />
      </section>
    </main>
  )
}