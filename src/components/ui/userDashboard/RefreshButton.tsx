"use client"
import React from 'react'
import { Button } from '../button'
import { refreshPRs } from '~/lib/actions/userLogsActions'
import { useFormState, useFormStatus } from 'react-dom'

type Props = {}

export default function RefreshButton({}: Props) {
    const [state,dispatch] = useFormState(refreshPRs,null)
    if(state) console.log(state)
  return (
    <form action={dispatch}>
        <ButtonPR/>
    </form>
  )
}

const ButtonPR = ()=>{
    const { pending } = useFormStatus()
  return (
    <Button variant={"outline"} className='text-md text-xtraText' disabled={pending}>
      {pending ? 'Refreshing...' : 'Refresh PRs'}
    </Button>
  )
}