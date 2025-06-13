import React from 'react';
import { Skeleton } from '~/components/ui/skeleton'; // Assuming you have a Skeleton component
import Container from '~/components/ui/userDashboard/Container';

export const ExercicesTableSkeleton = () => {
    const skeletonItems = Array.from({ length: 6 }); // Adjust count as needed
    return (
        <div className='w-full h-screen p-5'>
            {/* Filter Skeleton */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg w-full shadow-sm">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex-1">
                            <Skeleton className="h-4 w-1/4 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>
            {/* Table Skeleton */}
            <div className=" w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Container key={i} className="bg-white dark:bg-gray-800 p-0 dark:text-gray-300 rounded-lg shadow-md overflow-hidden">
            <Skeleton className="relative h-48 bg-gray-200 dark:bg-gray-700" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-full mb-3 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-2/3 mt-2 bg-gray-200 dark:bg-gray-700" />
            </div>
          </Container>
        ))}
      </div>
        </div>
    );
};

export default ExercicesTableSkeleton;



