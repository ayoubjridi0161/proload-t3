import Image from 'next/image'
import { Button } from '../button'
import { MoveRight } from 'lucide-react'
import AddPost from '../neopost/AddPost'
import Post from '../neopost/post'
import type { publicUser } from '~/lib/types'
import { getUserBioAndDetails, getUserLikes, getPosts } from '~/lib/data'
import AsideTopSection from './AsideTopSection'
import { Separator } from '../separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'
import WorkoutSection from './workoutSection'
import { Suspense } from 'react'
import { timeAgo } from '~/lib/utils'

function Profile({user}: {user: publicUser}) {
  return (
    <div className='w-2/3'>
      <header className='relative h-auto min-h-[200px] md:min-h-[300px] mb-6'>
        {/* Background cover photo */}
        <div className='absolute inset-0 h-3/4 bg-slate-200 bg-s3gym bg-bottom bg-cover'></div>
        
        {/* Profile info - positioned for overlap */}
        <div className='relative pt-[15%] md:pt-[12%] px-4 pb-4 flex flex-col sm:flex-row items-start sm:items-end gap-4 z-10'>
          <Image 
            src={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} 
            alt={user.name ?? "Profile"} 
            width={180} 
            height={180} 
            className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover border-4 border-white shadow-md' 
          />
          <div className='mt-2 sm:mt-0 sm:mb-2'>
            <h1 className='font-bold text-lg sm:text-xl md:text-2xl'>{user.name ?? "Proload User"}</h1>
            <p className='text-sm md:text-base'>3002 followers</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="Profile" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className='bg-transparent whitespace-nowrap min-w-max'>
            <TabsTrigger 
              value="Profile" 
              style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} 
              className="py-2 rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-4 sm:px-7"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="Workouts" 
              style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} 
              className="py-2 rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-4 sm:px-7"
            >
              Workouts
            </TabsTrigger>
            <TabsTrigger 
              value="Achievements" 
              style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} 
              className="py-2 rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-4 sm:px-7"
            >
              Achievements
            </TabsTrigger>
          </TabsList>
        </div>
        
        <Separator className='mt-3'/>
        
        <TabsContent value="Profile" className='min-w-full'>
          <main className='flex flex-col lg:flex-row gap-4'>
            <ProfileAside userID={user.id} />
            <MainSection user={user} />
          </main>
        </TabsContent>
        
        <TabsContent value="Workouts" className='min-w-full'>
          <Suspense fallback={<div className='w-[66vw]'>loading..</div>}>
          <WorkoutSection privacy={false} userID={user.id} />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="Achievements" className='min-w-full'>
        <div className='p-4'>
            <h2 className='text-xl font-bold'>Workouts Section</h2>
            <p>Details about user workouts will go here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile

export const ProfileAside = async ({userID}:{userID:string}) => {
  const details = await getUserBioAndDetails(userID)
  return (
    <aside className='w-full lg:w-2/5 p-3 space-y-3'>
      <AsideTopSection data={details}/>
      <div className='shadow-bottom w-full p-2 space-y-3'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold'>Achievements photos</h1> 
          <MoveRight color='#a4a4a4' />
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <Image 
            src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach1.avif'} 
            width={200} 
            height={200} 
            className='w-full aspect-square object-cover' 
            alt={'achievement 1'} 
          />
          <Image 
            src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach2.jpg'} 
            width={200} 
            height={200} 
            className='w-full aspect-square object-cover' 
            alt={'achievement 2'} 
          />
          <Image 
            src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach3.jpg'} 
            width={200} 
            height={200} 
            className='w-full aspect-square object-cover' 
            alt={'achievement 3'} 
          />
          <Image 
            src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach4.jpg'} 
            width={200} 
            height={200} 
            className='w-full aspect-square object-cover' 
            alt={'achievement 4'} 
          />
        </div>
      </div>
    </aside>
  )
}

export const MainSection = async ({user}:{user:publicUser}) => {
  const likes = await getUserLikes(user.id)
  const FetchedPosts = await getPosts(user.id)
  return(
    <section className='w-full lg:w-3/5 p-3'>
      <AddPost image={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} />
      {FetchedPosts.map((post,i) => (
        <Post 
        sharedPost = {post.sharedPost}
        sharedWorkout={post.sharedWorkout}
        shares={post.shares}
        time={timeAgo(post.createdAt)}
        appUser={user.id}
          likes={post.likes} 
          id={post.id} 
          comments={post.comments} 
          media={post.resources} 
          images={post.resources} 
          liked={!!likes?.includes(post.id)} 
          key={i} 
          userImage={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} 
          userName={user.name ?? "Proload User"} 
          userId={user.id} 
          title={post.title} 
          postContent={post.content} 
        />
      ))}
    </section>
  )
}