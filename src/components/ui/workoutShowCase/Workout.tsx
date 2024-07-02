import React, { ReactElement } from 'react'
import Day from './Day'
import { fetchWorkoutById } from '~/lib/data'

const Workout = async ({id}:{id:number}) => {
    const fetchedWorkout = await fetchWorkoutById(id);

    const Split = {
        title: "Push/Pull/Legs",
        days:[
            {
                name : "push",
                exercices:[
                    {
                        name : "Bench Press",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    },
                    {
                        name : "Dumbell Press",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    },
                    {
                        name : "Tricep Extension",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    },
                    {
                        name : "Shoulder Press",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    }
                ]
            },
            {
                name : "pull",
                exercices:[
                    {
                        name : "Deadlift",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    },
                    {
                        name : "Pullups",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    },
                    {
                        name : "Bicep Curl",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    },
                    {
                        name : "Face Pull",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    }
                ]
            },
            {
                name : "legs",
                exercices:[
                    {
                        name : "Squat",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    },
                    {
                        name : "Leg Press",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    },
                    {
                        name : "Leg Curl",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    },
                    {
                        name : "Calf Raise",
                        sets: 4,
                        reps: 8,
                        weight: 60
                    }
                ]
            }
        ]
    }
    type dayDetails = {
        dayIndex:number,
        name : string,
        exercices :null | {
            name : string,
            sets : number,
            reps : number,
        }[] 
    }
    if (fetchedWorkout === undefined) {
        return <div>Workout not found</div>;
    }
    const NOD = fetchedWorkout.numberOfDays ||  10
    const {days} = fetchedWorkout
    function renderDays(){
        const renderDays: any = [];
for (let i = 1, j = 0; i <= NOD; i++) {
    // Check if the current day matches the dayIndex in the days array
    if (days[j] && i === days[j].dayIndex) {
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
    <div className="">
      <h2 className="text-2xl font-bold mb-6 text-[#006400] dark:text-[#00FF00]">
        {fetchedWorkout?.name || "Workout"}
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
        {renderDays()}
        </div>
    </div>
    </div>
)
}

export default Workout