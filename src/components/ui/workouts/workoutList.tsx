import React from 'react'
import WorkoutBox from './WorkoutBox'

type Props= {
    workoutSummaryList: Promise<{
    name: string;
    id: number;
    exercices: {
        mg: string;
        exerciseCount: number;
    }[];
}>[]}


export default function workoutList({workoutSummaryList}:Props) {
    
  return (
    <div className="flex flex-wrap gap-5 justify-center ">
      {
        workoutSummaryList.map( (workoutSummary, index: number) => (
          <WorkoutBox key={index} workoutSummary={workoutSummary} />
        ))
      } 
      

    </div>
  )
}