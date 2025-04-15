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
import { type ProfileDetails } from '~/lib/types'
import { auth } from 'auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'
import { Separator } from '../separator'
import { Suspense } from 'react'
import WorkoutSection from './workoutSection'

async function PublicProfile({user}: {user: publicUser}) {
  const isfollowed = await isFollowed(user.id)
  return (
    <div className='w-full md:w-5/6 lg:w-2/3 mx-auto'>
      <ProfileHeader 
        userID={user.id} 
        isfollowed={isfollowed} 
        numberOfConnects={user.numberOfConnects} 
        userImage={user.image ?? ""} 
        userName={user.name}
      />
      <main className='flex w-full flex-col md:flex-row gap-4 px-2'>
      <Tabs defaultValue="Profile" className="w-full">
          <TabsList className='flex justify-start gap-3 bg-transparent whitespace-nowrap min-w-full'>
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
        
        <Separator className='mt-3'/>
        
        <TabsContent value="Profile" className='w-full min-h-[300px]'>
          <main className='flex flex-col lg:flex-row gap-4'>
            <ProfileAside profileDetails={user.details} savedBio={user.bio ?? ""} />
            <MainSection user={user} />
          </main>
        </TabsContent>
        
        <TabsContent value="Workouts" className='w-full min-h-[300px]'>
          <Suspense fallback={<div className="w-full min-h-[200px] flex items-center justify-center">loading..</div>}>
            <div className="w-full">
              <WorkoutSection privacy={true} userID={user.id} />
            </div>
          </Suspense>
        </TabsContent>
        
        <TabsContent value="Achievements" className='w-full min-h-[300px]'>
        <Suspense fallback={<div className="w-full min-h-[200px] flex items-center justify-center">loading..</div>}>
            <div className="w-full">
            <div className='w-[100vw] overflow-x-hidden max-w-full'>No Workouts</div>
            </div>
          </Suspense>
        </TabsContent>
      </Tabs>
      </main>
    </div>
  )
}

export default PublicProfile

export const ProfileAside = ({savedBio, profileDetails}: {
  savedBio: string,
  profileDetails: ProfileDetails | null
}) => {
  return (
    <aside className='w-full md:w-2/5 p-2 md:p-3 space-y-3'>
      <div className='shadow-bottom w-full p-2 space-y-3 rounded-lg'>
        <h1 className='text-lg md:text-xl font-bold'>Athletic Profile</h1>
        {savedBio && 
          <div className="border border-gray-200 p-2 md:p-3 mb-3 rounded">
            <p className="text-sm font-semibold">{savedBio}</p>
          </div>
        }
        {profileDetails &&
          <div className="border border-gray-200 p-2 md:p-3 mb-3 rounded">
            {Object.entries(profileDetails).map(([key, value]) => {
              if(value) return(
                <div key={key} className="mb-2">
                  <span className="text-sm font-semibold capitalize">{key}:</span>
                  <span className="text-sm text-gray-700 ml-1">{value}</span>
                </div>
              )
            })}
          </div>
        }
      </div>
      <div className='shadow-bottom w-full p-2 space-y-3 rounded-lg'>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg md:text-xl font-bold'>Achievements photos</h1> 
          <MoveRight color='#a4a4a4' />
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <Image 
            src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach1.avif'} 
            width={100} 
            height={100} 
            className='w-full aspect-square rounded' 
            alt={'achievement photo 1'} 
          />
          <Image 
            src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach2.jpg'} 
            width={100} 
            height={100} 
            className='w-full aspect-square rounded' 
            alt={'achievement photo 2'} 
          />
          <Image 
            src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach3.jpg'} 
            width={100} 
            height={100} 
            className='w-full aspect-square rounded' 
            alt={'achievement photo 3'} 
          />
          <Image 
            src={'https://s3.eu-north-1.amazonaws.com/proload.me/ach4.jpg'} 
            width={100} 
            height={100} 
            className='w-full aspect-square rounded' 
            alt={'achievement photo 4'} 
          />
        </div>
      </div>
    </aside>
  )
}

export const MainSection = async ({user}: {user: publicUser}) => {
  const FetchedPosts = await getUserPosts(user.id)
  const userLikes = await getUserLikes(user.id)
  const session = await auth()
  const appUser = session?.user?.name ?? "user"
  
  return(
    <section className='w-full md:w-3/5 p-2 md:p-3'>
      {/* <AddPost image={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"}  /> */}
      {FetchedPosts.length === 0 ? (
        <div className="text-center py-8 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No posts to display</p>
        </div>
      ) : (
        FetchedPosts.map((post, i) => (
          <Post appUser={appUser}
            time={timeAgo(post.createdAt)} 
            likes={post.likes} 
            id={post.id} 
            liked={userLikes?.includes(post.id)} 
            key={i} 
            userImage={user.image ?? "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} 
            comments={post.comments} 
            media={post.resources} 
            images={post.resources} 
            userName={user.name ?? "Proload User"} 
            userId={user.id} 
            title={post.title} 
            postContent={post.content} 
          />
        ))
      )}
    </section>
  )
}