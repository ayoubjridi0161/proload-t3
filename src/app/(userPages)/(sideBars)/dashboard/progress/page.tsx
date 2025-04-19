import React from 'react'
import AthleteDashboard from '~/components/ui/userDashboard/progress'
import { fetchUserLogs } from '~/lib/actions/userLogsActions'
import { type UserLog } from '~/lib/types'

export default async function page() {
    const userLogs = await fetchUserLogs() as unknown as UserLog[]
  return (
    <AthleteDashboard userLogs={userLogs} />
  )
}
