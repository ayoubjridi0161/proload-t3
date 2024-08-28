"use server"

import { auth } from "auth"
import { fetchAllWorkouts, getWorkoutsByUser } from "~/lib/data"
import WorkoutBox from "../workouts/WorkoutBox"

const ProfilePage = async ({id}:{id:string}) => {
    const session = await auth()        
    const workoutsList = await getWorkoutsByUser("",id)
  return (
    <>
    <div className="grid grid-cols-5  gap-2">
        {workoutsList  && workoutsList.map( workout => 
            <WorkoutBox key={workout.id} workoutSummary={workout} />
       )}
    </div>
    
    <hr />
    <div>{session && JSON.stringify(session.user)}</div>
    </>
  )
}

export default ProfilePage