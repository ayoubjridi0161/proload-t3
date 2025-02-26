import { auth } from 'auth'
import React from 'react'
import Advertising from '~/components/component/Advertising'
import { roboto } from '~/components/ui/font'
import AddPost from '~/components/ui/neopost/AddPost'
import Header from '~/components/ui/neopost/header'
import Post from '~/components/ui/neopost/post'
import SideBar from '~/components/ui/neopost/sideBar'
import { getPosts } from '~/lib/data'

type Props = {}

export default async function page({}: Props) {
    const posts = await getPosts();
    const parsedPosts = posts.map((post)=> ({id:post.id , title:post.title, content:post.content , user:post.users.name , userImage:post.users.image , userId:post.userId}))
  return (
    <main className='flex gap-2 justify-center'>
          <SideBar />
          <section className='w-1/2 p-5'>
            <AddPost image = {""} />
            {parsedPosts && parsedPosts.map((post)=> <Post key={post.id} userImage={post.userImage || ""} userName={post.user || ""} userId={post.userId || -1} title={post.title} postContent={post.content} />)}
          </section>
          <section className='w-1/6 pt-2'>
            <Advertising />
          </section>
        </main>
          
  )
}