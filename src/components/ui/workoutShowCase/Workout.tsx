import React from 'react'
import Day from './Day'
import { fetchWorkoutById } from '~/lib/data'

const Workout = async ({workout}:any) => {
    const fetchedWorkout = await fetchWorkoutById(30);

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
    
    function renderDays(){
        return fetchedWorkout?.days.map((day, index) => {
            return <Day key={index} day={day}/>
        })
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