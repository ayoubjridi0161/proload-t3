import React from 'react'
export default function PageSkeleton() {
  return (
    <div className="container w-full mx-auto py-8 px-4">
      <div className="animate-pulse">
        <div className="h-10 w-48 bg-gray-300 rounded mb-6" />
        <div className="space-y-4">
          {Array.from({length: 5}).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
