import { Suspense } from "react";
import Comments from "~/components/component/Comments";
import TooltipBox from "~/components/component/tooltipV0";
import Container from "~/components/ui/Container";
import Workout from "~/components/ui/workoutShowCase/Workout";
import WorkoutSkeleton from "~/components/ui/workoutShowCase/skeleton/workoutSkeleton";
import UserDeatails from "~/components/ui/workoutShowCase/UserDetails";
import { auth } from "auth";
import { SessionProvider } from "next-auth/react";
import { fetchWorkoutById } from "~/lib/data";
import { Skeleton } from "~/components/ui/skeleton";
import { Toaster } from "~/components/ui/sonner";


const page = async ({params} : {params:{id:string}}) => {
  const session =await auth();
  console.log(session)
  const userID = session?.user?.id
  const sessionToken = session?.sessionToken as string ;
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const workout = await delay(3000).then(() => fetchWorkoutById(parseInt(params.id)));
    if(!workout) throw new Error ("failed to fetch workout")
    const Reactions = {upvotes : workout.upvotes ,downvotes:workout.downvotes , clones:workout.clones }
    return (
            <div className="flex gap-5">
      <Container>
      <Suspense fallback={<WorkoutSkeleton/>}>
          <Workout fetchedWorkout={workout} id={parseInt(params.id)} />
      </Suspense>

      </Container>
       
      <div className="space-y-5">
      <Container>
        <Suspense fallback={<div>loading user</div>}>
      <UserDeatails userID = {workout.userId} />
      </Suspense>
      </Container>
      <Container>
      <TooltipBox  userId = {userID } Reactions = {Reactions} workoutId = {parseInt(params.id)} />
      </Container>
      <Container>
        <Comments />
      </Container>
      <Toaster />

        </div>
      </div>
    )
}
export default page;