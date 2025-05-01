import React from 'react';
import { Label } from '../ui/label';
 // Assuming Label is in the same ui directory

export default function PostSkeleton() {
  return (
    <div className="p-5 mt-4 space-y-4 bg-xtraContainer rounded-md shadow-md animate-pulse">
      {/* User Info Skeleton */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div> {/* Avatar Skeleton */}
          <div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-1"></div> {/* User Name Skeleton */}
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div> {/* Time Skeleton */}
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div> {/* Ellipsis Skeleton */}
      </div>

      {/* Post Content Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
      </div>

      {/* Optional Media Skeleton (Placeholder for potential image/video area) */}
      {/* You might adjust height based on typical media size */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>

      {/* Action Bar Skeleton */}
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div> {/* Like Icon Skeleton */}
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-8"></div> {/* Like Text Skeleton */}
          {/* Label Skeleton - Using actual Label for structure but with placeholder inside */}
          <Label style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.1)' }} className="rounded-none border-gray-400 border-1 px-3 py-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4"></div> {/* Likes Count Skeleton */}
          </Label>
        </div>
        <div className='flex gap-4 items-center'> {/* Increased gap slightly for visual separation */}
          <div className='flex gap-1 items-center'>
             <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div> {/* Comment Icon Skeleton */}
             <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div> {/* Comment Text Skeleton */}
          </div>
          <div className='flex gap-1 items-center'>
            <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div> {/* Share Icon Skeleton */}
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10"></div> {/* Share Text Skeleton */}
            {/* Label Skeleton */}
            <Label style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.1)' }} className="rounded-none border-gray-400 border-1 px-3 py-1">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4"/>{/* Shares Count Skeleton */}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}