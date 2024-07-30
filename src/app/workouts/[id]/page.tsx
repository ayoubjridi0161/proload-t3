import { Suspense } from "react";
import Comments from "~/components/component/Comments";
import TooltipBox from "~/components/component/tooltipV0";
import Container from "~/components/ui/Container";
import Workout from "~/components/ui/workoutShowCase/Workout";
import WorkoutSkeleton from "~/components/ui/workoutShowCase/skeleton/workoutSkeleton";
import UserDeatails from "~/components/ui/workoutShowCase/UserDetails";
import { auth } from "auth";


const page = async ({params} : {params:{id:string}}) => {
  const session =await auth()
  if(!session) return ( <div>loading</div>)
    const user = session?.user
    return (
            <div className="flex gap-5">
      <Container>
      <Suspense fallback={<div>ladoing</div>}>
          <Workout id={parseInt(params.id)} />
      </Suspense>
      </Container>
      <div className="space-y-5">
      <Container>
      <UserDeatails />
      </Container>
      <Container>
      <TooltipBox userId = {user?.id} workoutId = {parseInt(params.id)} />
      </Container>
      <Container>
        <Comments />
      </Container>
      </div>
      </div>
    )
}
export default page;