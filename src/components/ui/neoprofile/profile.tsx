import Image from 'next/image'
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
import ProfileHeader from './profileHeader'
import { isFollowed } from '~/lib/actions/userActions'
import { getUserWorkouts } from '~/lib/actions/workout'

async function Profile({user,isPublic}: {user: publicUser,isPublic:boolean}) {
  const isfollowed = isPublic ? await isFollowed(user.id) : null
  const awaitedWorkouts = await getUserWorkouts(true,user.id)
  return (
    <div className='w-full max-w-full md:max-w-[90%] lg:max-w-[70%] '>
      {typeof isfollowed == 'boolean' ? 
      <ProfileHeader userCover={user.cover} isfollowed={isfollowed ?? false} numberOfConnects={user.numberOfConnects} userID={user.id} userImage={user.image ?? ""} userName={user.name}/>
      :
      <header className='relative h-auto min-h-[180px] md:min-h-[250px] lg:min-h-[300px] mb-6'>
        {/* Background cover photo */}
        <div className='absolute inset-0 h-3/4 bg-slate-200 bg-center bg-cover'
        style={{backgroundImage:`url(${user.cover ?? "//s3.eu-north-1.amazonaws.com/proload.me/widegym.png"})`}}></div>
        
        {/* Profile info - positioned for overlap */}
        <div className='relative pt-[15%] md:pt-[12%] px-4 pb-4 flex flex-col sm:flex-row items-center sm:items-end gap-4 z-10'>
          <Image 
            src={user.image ?? "/liftingBarbell.png"} 
            alt={user.name ?? "Profile"} 
            width={180} 
            height={180} 
            className='w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover border-4 border-white shadow-md' 
          />
          <div className='text-center sm:text-left'>
            <h1 className='font-bold text-lg sm:text-xl md:text-2xl'>{user.name ?? "Proload User"}</h1>
            <p className='text-sm md:text-base'>{user.numberOfConnects} followers</p>
          </div>
        </div>
      </header>
      }

      <Tabs defaultValue="Profile" className="w-full">
        <div className="overflow-x-auto px-2">
          <TabsList className='bg-transparent whitespace-nowrap min-w-max mx-auto'>
            <TabsTrigger 
              value="Profile" 
              style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} 
              className="py-1 sm:py-2 rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-3 sm:px-7"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="Workouts" 
              style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} 
              className="py-1 sm:py-2 rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-3 sm:px-7"
            >
              Workouts
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator className='mt-3'/>
        <TabsContent value="Profile" className='w-full'>
          <main className='flex flex-col lg:flex-row gap-4 px-2 sm:px-0'>
            <ProfileAside userID={user.id} isPublic={isPublic} />
            <MainSection isPublic={isPublic} awaitedWorkouts={awaitedWorkouts} user={user} />
          </main>
        </TabsContent>
        <TabsContent value="Workouts" className='w-full px-2 sm:px-0'>
          <Suspense fallback={<div className='w-full text-center py-8'>Loading workouts...</div>}>
            <WorkoutSection privacy={false} userID={user.id} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile

export const ProfileAside = async ({userID,isPublic}:{isPublic:boolean,userID:string}) => {
  const details = await getUserBioAndDetails(userID)
  return (
    <aside className='w-full lg:w-2/5 p-2 sm:p-3 space-y-3'>
      <AsideTopSection data={details} isPublic={isPublic}/>
      <div className='shadow-bottom w-full p-2 space-y-3 bg-xtraContainer dark:bg-xtraDarkPrimary rounded-md'>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg sm:text-xl font-bold'>Achievements photos</h1> 
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

export const MainSection = async ({user,awaitedWorkouts,isPublic}:{isPublic:boolean,user:publicUser,awaitedWorkouts:{
  exercices: {
      mg: string;
      exerciseCount: number;
  }[];
  id: number;
  userId: string | null;
  name: string;
  username: string | null | undefined;
  description: string;
  numberOfDays: number | null;
  dayNames: string[];
  upvotes: number;
}[]}) => {
  const likes = await getUserLikes(user.id)
  const FetchedPosts = await getPosts(1,10,user.id)
  return(
    <section className='w-full lg:w-3/5 p-2 sm:p-3'>
      {!isPublic && <AddPost awaitedWorkouts={awaitedWorkouts} image={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} />}
      {FetchedPosts.posts.length > 0 ? (
        FetchedPosts.posts.map((post,i) => (
          <Post 
            sharedPost={post.sharedPost}
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
            postContent={post.content} 
          />
        ))
      ) : (
        <div className="text-center py-8 border border-gray-200 dark:border-gray-700 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">No posts to display</p>
        </div>
      )}
    </section>
  )
}