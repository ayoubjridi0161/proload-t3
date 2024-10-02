// "use server"

// import { auth } from "auth"
// import { fetchAllWorkouts, getWorkoutsByUser } from "~/lib/data"
// import WorkoutBox from "../workouts/WorkoutBox"

// const ProfilePage = async ({id}:{id:string}) => {
//     const session = await auth()        
//     const workoutsList = await getWorkoutsByUser(id)
//   return (
//     <>
//     <div className="grid grid-cols-5  gap-2">
//         {workoutsList  && workoutsList.map( workout => 
//             <WorkoutBox key={workout.id} workoutSummary={workout} />
//        )}
//     </div>
    
//     <hr />
//     <div>{session && JSON.stringify(session.user)}</div>
//     </>
//   )
// }

// export default ProfilePage

import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { JSX, SVGProps } from "react"
import { auth } from "auth"
import { getPosts, getWorkoutsByUser } from "~/lib/data"
import PostCard from "../Posts/PostCard"
import { getUserProfile } from "~/lib/actions"

export default async function Component({id}:{id:string}) {
    const session = await auth()        
    const userDetails = await getUserProfile(id)
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-center gap-6 mb-8">
        <Avatar className="w-24 h-24 border-4 border-primary">
          {userDetails?.image && <AvatarImage src={userDetails?.image} alt="User Avatar" />}
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{userDetails?.name}</h1>
          <p className="text-muted-foreground">Fitness enthusiast, health coach, and avid blogger.</p>
        </div>
      </div>
          <div className="w-full min-h-fit bg-slate-400 rounded-md text-center text-lg py-1 my-3">
            <p className="bg-white rounded-lg px-5 py-1 w-fit mx-auto ">Workouts</p>
          </div>
          <div className="grid gap-4">
            {userDetails?.workouts.map((workout,index) => (
              <Card key={workout.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{workout.name}</h3>
                    <p className="text-muted-foreground">{workout.createdAt.toDateString()}</p>
                    <p className="text-sm mt-2 opacity-70">{workout.description}</p>
                    <p>{workout.numberOfDays} days cycle</p>
                                        
                  </div>
                  <Button variant="outline" size="icon">
                    <MoveHorizontalIcon className="w-5 h-5"  />
                  </Button>
                </div>
              </CardHeader>
            </Card>
            ))
              }
            
            
          </div>
          <div className="w-full min-h-fit bg-slate-400 rounded-md text-center text-lg py-1 my-3">
            <p className="bg-white rounded-lg px-5 py-1 w-fit mx-auto ">Posts</p>
          </div>
          <div className="space-y-3">
          {userDetails?.posts.map((post,index) => (
          // <div key={post.id} className="border-2 shadow-md p-4 rounded-md ">
          //   <h5>{post.users.username}</h5>
          //   <h3 className="text-lg font-semibold">{post.title}</h3>
          //   <p className="mt-2">{post.content}</p>
          // </div>
          <PostCard userImage={userDetails.image} author={userDetails.name || "hiim"} description={post.content} publishDate="2 sep 2003" title={post.title} readingTime="3mn"  key={index}  />
        ))}
          </div>
    </div>
  )
}

function MoveHorizontalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}