export default function ProfileSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="relative h-auto min-h-[180px] md:min-h-[250px] lg:min-h-[300px] mb-6">
          <div className="absolute inset-0 h-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="relative pt-[15%] md:pt-[12%] px-4 pb-4 flex flex-col sm:flex-row items-center sm:items-end gap-4 z-10">
            <div className='w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-gray-400 dark:bg-gray-600 rounded-full border-4 border-white dark:border-gray-800 shadow-md'></div>
            <div className='text-center sm:text-left mt-2 sm:mt-0'>
              <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2'></div>
              <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2'></div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="overflow-x-auto px-2 mb-3">
          <div className='bg-transparent whitespace-nowrap min-w-max mx-auto flex space-x-2'>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>
        <div className='h-px bg-gray-300 dark:bg-gray-700 mt-3 mb-3'></div>

        {/* Content Skeleton */}
        <div className='flex flex-col lg:flex-row gap-4 px-2 sm:px-0'>
          {/* Aside Skeleton */}
          <div className='w-full lg:w-2/5 p-2 sm:p-3 space-y-3'>
            <div className='h-40 bg-gray-300 dark:bg-gray-700 rounded'></div>
            <div className='h-60 bg-gray-300 dark:bg-gray-700 rounded'></div>
          </div>
          {/* Main Content Skeleton */}
          <div className='w-full lg:w-3/5 p-2 sm:p-3 space-y-4'>
            <div className='h-20 bg-gray-300 dark:bg-gray-700 rounded'></div>
            <div className='h-48 bg-gray-300 dark:bg-gray-700 rounded'></div>
            <div className='h-48 bg-gray-300 dark:bg-gray-700 rounded'></div>
          </div>
        </div>
      </div>
    </div>
  )
}