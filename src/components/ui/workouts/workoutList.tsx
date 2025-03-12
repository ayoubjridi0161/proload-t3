import React from 'react'
import WorkoutBox from './WorkoutBox'

type Props = {
    workoutSummaryList : {id: number;
    name: string;
    upvotes: number;
    days: {
        name: string;
        exercices: {
            name: string;
        }[];
    }[];
    users: {
        name: string | null;
    } | null;
}[]
}

export default function workoutList({workoutSummaryList}: Props) {
  return (
    <div className="flex flex-wrap gap-5 justify-center ">
            
            {
                workoutSummaryList.map((workoutSummary, index) => (
                    <WorkoutBox key={index} workoutSummary={workoutSummary} />
                ))
            } 
      </div>
  )
}