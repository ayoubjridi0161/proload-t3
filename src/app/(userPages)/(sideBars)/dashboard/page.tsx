import Home from "~/components/ui/userDashboard/Home"
import NewUser from "~/components/ui/userDashboard/newUser"
import { fetchUserLogs } from "~/lib/actions/userLogsActions"

export default async function Page() {
  const userLogs = await fetchUserLogs() ?? []
  if(userLogs.length >= 5) return <Home userLogs={userLogs} />
  else return (
    <NewUser userLogs={userLogs}/>
  )
}


