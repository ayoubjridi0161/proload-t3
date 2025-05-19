import React from 'react'
import { Skeleton } from '../../skeleton'

const ExSkeleton = () => {
  return (
<div className="flex items-center">
                <Skeleton className="h-10 bg-gray-300 w-10 mr-4 dark:bg-xtraDarkPrimary/50 rounded-md" />
                <div className=''>
                  <Skeleton className="h-4 w-16 mb-2 dark:bg-xtraDarkPrimary/50 bg-gray-300" />
                  <Skeleton className="h-4 w-20 dark:bg-xtraDarkPrimary/50 bg-gray-300" />
                </div>
              </div>  )
}

export default ExSkeleton