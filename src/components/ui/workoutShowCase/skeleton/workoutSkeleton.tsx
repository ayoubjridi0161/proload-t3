import React from 'react'
import DaySkeleton from './DaySkeleton'
import { Skeleton } from '../../skeleton'

const workoutSkeleton = () => {
  return (
    <div className='dark:bg-xtraDarkPrimary'>
        <Skeleton className="h-8 mx-auto w-4/6 bg-slate-100 dark:bg-xtraDarkPrimary/70 mb-4" />

    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        <DaySkeleton />
        <DaySkeleton />
        <DaySkeleton />
        
    </div>
    </div>
  )
}

export default workoutSkeleton