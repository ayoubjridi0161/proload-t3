"use server"
import Home from "~/components/ui/userDashboard/Home"
import NewUser from "~/components/ui/userDashboard/newUser"
import { fetchPersonalRecords, fetchUserLogs } from "~/lib/actions/userLogsActions"


export default async function Page() {
  const userLogs = await fetchUserLogs() ?? []
  const userPrs= await fetchPersonalRecords() 
  if(userLogs.length >= 5) return <Home userLogs={userLogs} PRs={userPrs}/>
  else return (
    <NewUser userLogs={userLogs}/>
  )
}


