import Image from 'next/image'
import { Button } from '../button'
import { MoveRight } from 'lucide-react'
import AddPost from '../neopost/AddPost'
import Post from '../neopost/post'
import type { publicUser } from '~/lib/types'
import { user } from '@nextui-org/theme'
import { getUserPosts } from '~/lib/data'
function PublicProfile({user}: {user: publicUser}) {
  return (
    <div className='w-full'>
      <header className='h-[40dvh] grid grid-rows-10 pb-3 grid-cols-1 border-b-1 border-b-slate-300 '>
        <div className='bg-slate-200 row-start-1 row-end-7 col-start-1 bg-s3gym bg-bottom bg-cover'></div>
        <div className='flex justify-between row-start-5 row-span-6  col-start-1 z-20 p-4 pt-6 '>
            <div className='flex items-center gap-5 w-full h-full flex-col md:flex-row'>
              <Image src={user.image ??"https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} alt='omarsy' width={180} className='h-1/2 md:h-full w-[15%]' height={120} />
              <div className='mt-3 text-center md:text-left'>
              <h1 className='font-bold text-xl'>{user.name ?? "Proload User"}</h1>
              <p>3002 followers</p>
              </div>
            </div>
            <div className='flex gap-2 items-center self-center place-self-end'> 
              <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0">FOLLOW</Button>
              <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0">MESSAGE</Button>
            </div>
            
        </div>
        <div className='flex gap-3 '>
              <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0">Profile</Button>
              <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0">Workouts</Button>
              <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0">Achievements</Button>
              <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0">Videos</Button>
        </div>
      </header >
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
  return(
    <section className='w-3/5 p-3'>
      {/* <AddPost image={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"}  /> */}
      {FetchedPosts.map((post,i)=> <Post key={i} userImage={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} userName={user.name?? "Proload User"} userId={user.id} title={post.title} postContent={post.content} />)}
    </section>
  )
}