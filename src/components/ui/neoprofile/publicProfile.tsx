import Image from 'next/image'
import { Button } from '../button'
import { MoveRight } from 'lucide-react'
import AddPost from '../neopost/AddPost'
import Post from '../neopost/post'
import type { publicUser } from '~/lib/types'
import { user } from '@nextui-org/theme'
import { getUserLikes, getUserPosts } from '~/lib/data'
import ProfileHeader from './profileHeader'
import { timeAgo } from '~/lib/utils'
import { isFollowed } from '~/lib/actions'
async function PublicProfile({user}: {user: publicUser}) {
  const isfollowed = await isFollowed(user.id)
  return (
    <div className='w-full'>
      <ProfileHeader userID={user.id} isfollowed={isfollowed} numberOfConnects={250} userImage={user.image} userName={user.name}/>
      <main className='flex gap-2 '>
        <ProfileAside />
        <MainSection user = {user}/>
      </main>
    </div>
  )
}

export default PublicProfile

export const ProfileAside = ()=>{
  return (
    <aside className='w-2/5 p-3 space-y-3'>
        <div className='shadow-bottom w-full p-2 space-y-3'>
          <h1 className='text-xl font-bold'>Athletic Profile</h1>
            <p className='text-lg px-2'>User has no Bio</p>
        </div>
        <div className='shadow-bottom w-full p-2 space-y-3 '>
        <div className='flex justify-between items-center'><h1 className='text-xl font-bold'>Achievements photos</h1> <MoveRight color='#a4a4a4' /></div>
        <div className='flex gap-2 flex-wrap '>
          <Image src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach1.avif'} width={50} height={35} className='w-[48%] aspect-square ' alt={'hello'} />
          <Image src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach2.jpg'} width={50} height={35} className='w-[48%] aspect-square ' alt={'ach2'} />
          <Image src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach3.jpg'} width={50} height={35} className='w-[48%] aspect-square ' alt={'ach3'} />
          <Image src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach4.jpg'} width={50} height={35} className='w-[48%] aspect-square ' alt={'ach4'} />
        </div>
        </div>
    </aside>
  )
}

export const MainSection = async ({user}:{user:publicUser})=>{
  const FetchedPosts = await getUserPosts(user.id)
  const userLikes = await getUserLikes(user.id)
  
  return(
    <section className='w-3/5 p-3'>
      {/* <AddPost image={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"}  /> */}
      {FetchedPosts.map((post,i)=> <Post time={timeAgo(post.createdAt)} likes={post.likes} id={post.id} liked={userLikes?.includes(post.id)} key={i} userImage={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} comments={post.comments} images={post.resources} userName={user.name?? "Proload User"} userId={user.id} title={post.title} postContent={post.content} />)}
    </section>
  )
}