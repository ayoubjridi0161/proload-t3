import React, { Suspense } from 'react'
import { WorkoutCardSkeleton } from '~/components/skeletons/workout-cardSkeleton';
import WorkoutGrid from '~/components/ui/neoworkout/workoutGrid';
import { getWorkoutList } from '~/lib/actions/workout';
type Props = {
  page?: number;
  sortFiled?: string;
  order?: string;
  search?: string;
}
export default async function PerloadWorkouts({page,sortFiled,order,search}: Props) {
    const params: Record<string, unknown> = {};
    if (page) params.currentPage = page;
    if (sortFiled) params.sortFiled = sortFiled;
    if (order) params.order = order;
    if (search) params.query = search;
    const workouts = await getWorkoutList(params);
  return (
    <Suspense fallback={<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({length: 9}, (_, index) => (<WorkoutCardSkeleton key={index} />))}
    </div>}>
    <WorkoutGrid  workouts = {workouts} />
    </Suspense>
  )
}