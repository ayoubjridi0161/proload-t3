import { Suspense } from "react";
import Comments from "~/components/component/WorkoutComments";
import TooltipBox from "~/components/component/tooltipV0";
import Image from "next/image";
import Workout from "~/components/ui/workoutShowCase/Workout";
import WorkoutSkeleton from "~/components/ui/workoutShowCase/skeleton/workoutSkeleton";
import UserDeatails from "~/components/ui/workoutShowCase/UserDetails";
import { auth } from "auth";
import { fetchWorkoutById } from "~/lib/data";
import { Toaster } from "~/components/ui/sonner";
import { Separator } from "~/components/ui/separator";
import { SidebarContent,Sidebar } from "~/components/ui/sidebar";
import { Chip } from "@nextui-org/react";
import { Button } from "~/components/ui/button";
import RightSidebar from "~/components/ui/sidebars/rightAside";
import Container from "~/components/ui/userDashboard/Container";


const page = async ({params} : {params:{id:string}}) => {
  const session =await auth()
    const user = session?.user
    const workout = await fetchWorkoutById(parseInt(params.id))
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
      <Container className="bg-xtraContainer space-y-3">
      {/* <Suspense fallback={<div>loading user</div>}> */}
      
      {/* <Separator className="w-3/4 mx-auto"/> */}
      <TooltipBox userId = {user?.id } Reactions = {Reactions} workoutId = {parseInt(params.id)} />
      {/* </Suspense> */}
      </Container>
      <div className="grid grid-cols-4 gap-5">
        <Container className="col-span-3">
        <Comments className="text-xtraText" appUser={user?.name ?? "user"} workoutID={workout.id} comments={workout.comments}/>
        </Container>
        <Container className="h-fit">
        <UserDeatails userID = {workout.userId} />
        </Container>
        
      </div>
      <Toaster />
      </div>
      <RightSidebar>
        <p className="text-xtraDark font-semibold text-md pt-3 px-3">More Workouts:</p>
      
      </RightSidebar>
      </>
    )
}
export default page;