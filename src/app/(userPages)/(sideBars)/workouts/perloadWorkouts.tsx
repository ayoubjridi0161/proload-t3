import React from 'react'
import { WorkoutCard } from '~/components/ui/neoworkout/workout-card';
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
    const workoutSummaryList = await getWorkoutList(params);
    if(!workoutSummaryList) return null
    const workouts = await Promise.all(workoutSummaryList) 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Map directly over the workouts prop passed from the server */}
    <WorkoutGrid workouts = {workouts} />
  </div>
  )
}