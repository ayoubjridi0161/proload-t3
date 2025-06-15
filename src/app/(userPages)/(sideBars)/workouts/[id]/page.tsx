"use server"
import { Suspense } from "react";
import Comments from "~/components/component/WorkoutComments";
import TooltipBox from "~/components/component/workoutReactions";
import Workout from "~/components/ui/workoutShowCase/Workout";
import WorkoutSkeleton from "~/components/ui/workoutShowCase/skeleton/workoutSkeleton";
import UserDeatails from "~/components/ui/workoutShowCase/UserDetails";
import { auth } from "auth";
import { fetchWorkoutById, getUserReactions, getUserWorkoutsShortVersion } from "~/lib/data";
import RightSidebar from "~/components/ui/sidebars/rightAside";
import Container from "~/components/ui/userDashboard/Container";
import { WorkoutCard } from "~/components/ui/neoworkout/workout-side-card";
import { redirect } from "next/navigation";


const page = async ({params} : {params:{id:string}}) => {
    const session =await auth()
    const user = session?.user
    const workout = await fetchWorkoutById(parseInt(params.id))
    if(!workout ) return (<div>no workout found!</div>)
    if(!user?.id) 
      redirect("/login")
    const userWorkouts = await getUserWorkoutsShortVersion(workout?.userId ?? "")
    const UserReactions = await getUserReactions(workout?.id,user?.id)
    const isOwner = user?.id === workout?.userId
    if(!workout) throw new Error ("failed to fetch workout")
    const Reactions = {upvotes : workout.upvotes ,downvotes:workout.downvotes , clones:workout.clones }
    return (
      <>
            <div className="w-2/3 p-5 mt-5 space-y-3">
            {/* {workout && JSON.stringify(workout)}  */}
      <Container className="bg-transparent dark:bg-transparent p-0 col-span-3">
      <Suspense fallback={<WorkoutSkeleton/>}>
          <Workout fetchedWorkout={workout} id={parseInt(params.id)} />
      </Suspense>
      </Container>
      
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3 space-y-3">
        <Container className="bg-xtraContainer dark:bg-xtraDarkPrimary space-y-3">
      <TooltipBox userReactions={UserReactions} isOwner={isOwner} userId = {user?.id } Reactions = {Reactions} workoutId = {parseInt(params.id)} />
      {/* </Suspense> */}
      </Container>
      <Container className="dark:bg-xtraDarkPrimary" >
        <Comments className="text-xtraText" appUser={user?.name ?? "user"} workoutID={workout.id} comments={workout.comments}/>
        </Container>
        </div>
        <Container className="h-fit min-h dark:bg-xtraDarkPrimary">
        <UserDeatails userID = {workout.userId} isOwner={isOwner} workoutID={Number(params.id)}/>
        </Container>
        
      </div>
      </div>
      <RightSidebar>
        <p className="text-xtraDark font-semibold text-md pt-3 px-3">More Workouts:</p>
        {userWorkouts?.filter(w => w.id !== Number(params.id)).sort((a,b) => (a.numberOfDays ?? 0) - (b.numberOfDays ?? 0)).splice(0,3).map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </RightSidebar>
      </>
    )
}
export default page;