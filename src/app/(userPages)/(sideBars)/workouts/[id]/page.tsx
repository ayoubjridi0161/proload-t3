import { Suspense } from "react";
import Comments from "~/components/component/WorkoutComments";
import TooltipBox from "~/components/component/tooltipV0";

import Workout from "~/components/ui/workoutShowCase/Workout";
import WorkoutSkeleton from "~/components/ui/workoutShowCase/skeleton/workoutSkeleton";
import UserDeatails from "~/components/ui/workoutShowCase/UserDetails";
import { auth } from "auth";
import { fetchWorkoutById } from "~/lib/data";
import { Toaster } from "~/components/ui/sonner";
import Container from "~/components/ui/Container";
import { Separator } from "~/components/ui/separator";


const page = async ({params} : {params:{id:string}}) => {
  const session =await auth()
    const user = session?.user
    const workout = await fetchWorkoutById(parseInt(params.id))
    if(!workout) throw new Error ("failed to fetch workout")
    const Reactions = {upvotes : workout.upvotes ,downvotes:workout.downvotes , clones:workout.clones }
    return (
            <div className="w-2/3 p-5 mt-5 space-y-3">
      <Container className="bg-xtraContainer col-span-3">
      <Suspense fallback={<WorkoutSkeleton/>}>
          <Workout fetchedWorkout={workout} id={parseInt(params.id)} />
      </Suspense>
      </Container>
      <Container className="bg-xtraContainer space-y-3">
      <Suspense fallback={<div>loading user</div>}>
      <UserDeatails userID = {workout.userId} />
      <Separator className="w-3/4 mx-auto"/>
      <TooltipBox userId = {user?.id } Reactions = {Reactions} workoutId = {parseInt(params.id)} />
      </Suspense>
      </Container>
      <Container className="bg-xtraContainer">
        <Comments appUser={user?.name ?? "user"} workoutID={workout.id} comments={workout.comments}/>
      </Container>
      <Toaster />
      </div>
    )
}
export default page;