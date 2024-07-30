import Link from "next/link";
import { Suspense } from "react";
import Container from "~/components/ui/Container";
import Workout from "~/components/ui/workoutShowCase/Workout";
import WorkoutSkeleton from "~/components/ui/workoutShowCase/skeleton/workoutSkeleton";
import UserDeatails from "~/components/ui/workoutShowCase/UserDetails";
import Comments from "~/components/component/Comments";
import Sidenav from "~/components/ui/workouts/Sidenav";
import { auth } from "auth";
import TooltipBox from "~/components/component/tooltipV0";
import { Home } from "~/components/ui/homePage/Home";

export default async function HomePage() {
  
  return (
    <Home />
  );
}
