import { Suspense } from "react";
import Comments from "~/components/component/Comments";
import { tooltipV0 } from "~/components/component/tooltip-v0";
import Container from "~/components/ui/Container";
import Workout from "~/components/ui/workoutShowCase/Workout";
import WorkoutSkeleton from "~/components/ui/workoutShowCase/skeleton/workoutSkeleton";
import UserDeatails from "~/components/ui/workoutShowCase/UserDetails";


const page = async ({params} : {params:{id:string}}) => {

    return (
            <div className="flex gap-5">
      <Container>
      <Suspense fallback={<WorkoutSkeleton/>}>
          <Workout id={parseInt(params.id)} />
      </Suspense>
      </Container>
      <div className="space-y-5">
      <Container>
      <UserDeatails />
      </Container>
      <Container>
      {tooltipV0()}
      </Container>
      <Container>
        <Comments />
      </Container>
      </div>
      </div>
    )
}
export default page;