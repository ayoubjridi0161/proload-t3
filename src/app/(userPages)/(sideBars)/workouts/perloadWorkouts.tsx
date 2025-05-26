import React from 'react'
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
    <WorkoutGrid  workouts = {workouts} />
  )
}