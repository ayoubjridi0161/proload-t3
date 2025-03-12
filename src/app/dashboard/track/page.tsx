import { fetchWorkoutById } from "~/lib/data";
import Track from "~/components/ui/userDashboard/track";
import { auth } from "auth";

export type WorkoutDetails = Awaited<ReturnType<typeof fetchWorkoutById>>;
const page = async () => {
  const session= await auth();
  const user = session?.user
  console.log(user)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const workout: WorkoutDetails = await fetchWorkoutById(user?.currentWorkout);
  const totalExercices = workout?.days.flatMap((day) => day.exercices) ?? [];
  const totalSets = totalExercices.reduce(
    (acc, exercice) => (acc + exercice.sets),
    0,
  );
  const totalReps = totalExercices.reduce(
    (acc, exercice) => acc + exercice.sets * exercice.reps,
    0,
  );
  // const totalSets = totalSetsPerDay.reduce((acc,sets)=>acc+sets,0)

  return (
    <Track workout={workout} totalSets={totalSets} totalReps={totalReps}  />
  );
};

export default page;
