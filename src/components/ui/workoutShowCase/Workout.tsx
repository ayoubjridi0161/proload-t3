import React, { type ReactElement } from 'react'
import Day from './Day'
import { fetchWorkoutById } from '~/lib/data'
type split = 
    {
        id: number;
        name: string;
        createdAt: Date;
        userId: string | null;
        description: string;
        upvotes: number;
        downvotes: number;
        clones: number;
        published: boolean;
        numberOfDays : number | null,
        days:dayDetails[]
    }
    type Exercise = {
        id: number;
        name: string;
        sets: number;
        reps: number;
        dayId: number;
        exerciseLibrary: {
          images: string[];
        };
      }
    type dayDetails = {
        dayIndex:number,
        name : string,
        exercices :Exercise[]
    }
const Workout =  ({fetchedWorkout}:{id?:number,fetchedWorkout:split}) => {

    
    if (fetchedWorkout === undefined) {
        return <div>Workout not found</div>;
    }
    const NOD = fetchedWorkout.numberOfDays ?? 10
    const days = fetchedWorkout.days.sort((a,b)=> (a.dayIndex,b.dayIndex))
    function renderDays(){
        const renderDays: ReactElement[] = [];
    for (let i = 1, j = 0; i <= NOD; i++) {
    // Check if the current day matches the dayIndex in the days array
    if (days[j] && i === days[j]?.dayIndex) {
        // If it matches, push the Day component with the day details from the days array
         renderDays.push(<Day key={i} day={days[j]} />);
        j++; // Move to the next element in the days array
    } else {
        // If it doesn't match or days[j] is undefined, push a Day component for a rest day
        renderDays.push(<Day key={i} day={{ dayIndex: i, name: "rest", exercices: null }} />);
    }
}

        return renderDays
    }
  return (
    <div className="text-xtraLight  ">
      <h2 className="text-2xl font-bold mb-4 ">
        {fetchedWorkout?.name || "Workout"}
      </h2>
      <p className="text-gray-500 mb-4">{fetchedWorkout?.description || "Description"}</p>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
        {renderDays()}
        </div>
    </div>
    </div>
)
}

export default Workout