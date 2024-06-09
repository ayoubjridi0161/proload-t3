import Link from "next/link";
import { Suspense } from "react";
import Container from "~/components/ui/Container";
import Workout from "~/components/ui/workoutShowCase/Workout";
import WorkoutSkeleton from "~/components/ui/workoutShowCase/skeleton/workoutSkeleton";
import UserDeatails from "~/components/ui/workoutShowCase/UserDetails";
import {tooltipV0} from "~/components/component/tooltip-v0"
import Comments from "~/components/component/Comments";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white">
      <div className="flex gap-5">
      <Container>
      <Suspense fallback={<WorkoutSkeleton/>}>
          <Workout />
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
    </main>
  );
}
