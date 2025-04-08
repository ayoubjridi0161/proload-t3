import { fetchWorkoutById, getLastUserLog } from "~/lib/data";
import Track from "~/components/ui/userDashboard/track";
import { auth } from "auth";
import { fetchFullUser } from "~/lib/actions";

export type WorkoutDetails = Awaited<ReturnType<typeof fetchWorkoutById>>;
const page = async () => {
  const user = await fetchFullUser()
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
  // const totalSets = totalSetsPerDay.reduce((acc,sets)=>acc+sets,0)

  return (
    <Track workout={workout} totalSets={totalSets} totalReps={totalReps} lastSession = {lastSession}  />
  );
};

export default page;
