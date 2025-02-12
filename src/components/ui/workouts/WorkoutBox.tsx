
import React from 'react'
import { Button } from '../button'
import Link from 'next/link'
import { getExerciceByName, getExerciceNames } from '~/lib/data';
import MuscleGroupRadarChart from '~/components/component/MuscleChart';
import FlippingCard from '../UIverse/FlippingCard';
type workoutSummary ={
    id:number;
    name: string;
    users: {
        name: string | null;
    } | null;
    days: {
        name: string;
        exercices: {
            name: string;
        }[];
    }[];
}
const  WorkoutBox = async ({workoutSummary}:{workoutSummary : workoutSummary }) => {
  const exercices = workoutSummary.days.map(day => day.exercices).flat().map(exercice => exercice.name);

  // Fetch all exercises by name
  const fullExercices = await Promise.all(
    exercices.map(async exercice => {
      if (exercice.length > 0) {
        const res = await getExerciceByName(exercice);
        return res;
      }
      return null;
    })
  );

  // Filter out null values
  const validExercices = fullExercices.filter(exercice => exercice !== null);

  // Group exercises by muscle group
  const data = ["chest", "arms", "back", "legs", "shoulders", "core"].map(muscleGroup => {
    const muscleExercices = validExercices.filter(exercice => exercice?.muscleGroup === muscleGroup);
    return {
      muscleGroup,
      exerciseCount: muscleExercices.length
    };
  });

  // console.log(data);
  return (
    <Link href={`/workouts/${workoutSummary.id}`} className='bg-slate-200 min-h-64 w-72 cursor-pointer border-border  p-4 rounded-md shadow-md'>
        <div className='flex gap-1 items-center'>
      <h2 className='text-xl font-bold text-slate-700'>{workoutSummary.name}</h2>
      <Button className='text-primary '  variant={'link'}>{'>>'}</Button>
      </div>
      <h1 className='text-black font-light text-sm opacity-35 '>by {workoutSummary.users?.name}</h1>

      <div className=''>
        
          <div className='opacity-50 hover:opacity-90'>
          <MuscleGroupRadarChart data={data} />
          </div>
        
        
      </div>

    </Link>

  )
}
export default WorkoutBox