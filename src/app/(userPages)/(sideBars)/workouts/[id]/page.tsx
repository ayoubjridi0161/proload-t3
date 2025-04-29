"use server"
import { Suspense } from "react";
import Comments from "~/components/component/WorkoutComments";
import TooltipBox from "~/components/component/tooltipV0";
import Image from "next/image";
import Workout from "~/components/ui/workoutShowCase/Workout";
import WorkoutSkeleton from "~/components/ui/workoutShowCase/skeleton/workoutSkeleton";
import UserDeatails from "~/components/ui/workoutShowCase/UserDetails";
import { auth } from "auth";
import { fetchWorkoutById, getUserWorkoutsShortVersion } from "~/lib/data";
import { Toaster } from "~/components/ui/sonner";
import { Separator } from "~/components/ui/separator";
import { SidebarContent,Sidebar } from "~/components/ui/sidebar";
import { Chip } from "@nextui-org/react";
import { Button } from "~/components/ui/button";
import RightSidebar from "~/components/ui/sidebars/rightAside";
import Container from "~/components/ui/userDashboard/Container";
import { WorkoutCard } from "~/components/ui/neoworkout/workout-side-card";


const page = async ({params} : {params:{id:string}}) => {
  const session =await auth()
    const user = session?.user
    
    const workout = await fetchWorkoutById(parseInt(params.id))
    
    const userWorkouts = await getUserWorkoutsShortVersion(workout?.userId ?? "")
    if(!workout) throw new Error ("failed to fetch workout")
    const Reactions = {upvotes : workout.upvotes ,downvotes:workout.downvotes , clones:workout.clones }
    return (
      <>
            <div className="w-2/3 p-5 mt-5 space-y-3">
            {/* {workout && JSON.stringify(workout)}  */}
      <Container className="bg-xtraContainer col-span-3">
      <Suspense fallback={<WorkoutSkeleton/>}>
          <Workout fetchedWorkout={workout} id={parseInt(params.id)} />
      </Suspense>
      </Container>
      
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3 space-y-3">
        <Container className="bg-xtraContainer space-y-3">
      <TooltipBox userId = {user?.id } Reactions = {Reactions} workoutId = {parseInt(params.id)} />
      {/* </Suspense> */}
      </Container>
      <Container >
        <Comments className="text-xtraText" appUser={user?.name ?? "user"} workoutID={workout.id} comments={workout.comments}/>
        </Container>
        </div>
        <Container className="h-fit min-h">
        <UserDeatails userID = {workout.userId} />
        </Container>
        
      </div>
      </div>
      <RightSidebar>
        <p className="text-xtraDark font-semibold text-md pt-3 px-3">More Workouts:</p>
        {userWorkouts?.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </RightSidebar>
      </>
    )
}
export default page;