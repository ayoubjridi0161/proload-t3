import React from 'react'
import Logs from '~/components/ui/userDashboard/logs'
import { fetchUserLogs } from '~/lib/actions'

type Props = {}

export default function pages({}: Props) {
  return (
    <Logs/>
  )
}