"use server"
import Home from "~/components/ui/userDashboard/Home"
import NewUser from "~/components/ui/userDashboard/newUser"
import { getUserProfile } from "~/lib/actions/userActions"
import { fetchPersonalRecords, fetchUserLogs } from "~/lib/actions/userLogsActions"
import { fetchWorkoutById } from "~/lib/data"
import { type WorkoutDetails } from "./track/page"


export default async function Page() {
  const userLogs = await fetchUserLogs() ?? []
  const userPrs= await fetchPersonalRecords() 
  const user = await getUserProfile(["currentWorkout","id"]) as {currentWorkout:number,id:string}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const workout: WorkoutDetails = await fetchWorkoutById(user?.currentWorkout ?? -1);
  
  if(userLogs.length >= 5) return <Home currentWorkout={workout} userLogs={userLogs} PRs={userPrs}/>
  else return (
    <NewUser userLogs={userLogs}/>
  )
}


