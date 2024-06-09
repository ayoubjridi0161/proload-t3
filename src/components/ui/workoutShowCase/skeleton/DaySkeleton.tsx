import React from 'react'
import Container from '../../Container'
import ExSkeleton from './ExSkeleton'
import { Skeleton } from '../../skeleton'

const DaySkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-[#F0F0F0] to-[#E6E6E6] dark:from-[#2A2A2A] dark:to-[#232323] rounded-lg p-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
            <Skeleton className="h-6 w-full bg-gray-300 mb-4" />
            <div className="grid grid-cols-3 gap-3">
            <ExSkeleton />
            <ExSkeleton />
            <ExSkeleton />
            
            </div>
    </div>
    )
}

export default DaySkeleton