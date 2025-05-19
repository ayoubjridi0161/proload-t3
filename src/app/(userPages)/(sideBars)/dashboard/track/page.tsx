import { fetchWorkoutById, getLastUserLog } from "~/lib/data";
import Track from "~/components/ui/userDashboard/track";
import { auth } from "auth";
import { getUserProfile } from "~/lib/actions/userActions";

export type WorkoutDetails = Awaited<ReturnType<typeof fetchWorkoutById>>;
const page = async () => {
  const user = await getUserProfile(["currentWorkout","id"]) as {currentWorkout:number,id:string}
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const workout: WorkoutDetails = await fetchWorkoutById(user?.currentWorkout ?? -1);
  const totalExercices = workout?.days.flatMap((day) => day.exercices) ?? [];
  const totalSets = totalExercices.reduce(
    (acc, exercice) => (acc + exercice.sets),
    0,
  );
  const totalReps = totalExercices.reduce(
    (acc, exercice) => acc + exercice.sets * exercice.reps,
    0,
  )
  const lastSession = await getLastUserLog(user?.id ?? "");
  return (
    <Track workout={workout} totalSets={totalSets} totalReps={totalReps} lastSession = {lastSession}  />
  );
};

export default page;
