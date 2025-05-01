"use client"
import { Skeleton } from "@nextui-org/react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function WorkoutCardSkeleton() {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-5 w-32 mb-1" /> {/* Skeleton for name */}
              <Skeleton className="h-4 w-20" /> {/* Skeleton for username */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between pb-2">
          <Skeleton className="h-4 w-full mb-1" /> {/* Skeleton for description line 1 */}
          <Skeleton className="h-4 w-4/5 mb-4" /> {/* Skeleton for description line 2 */}
          <div className="flex justify-center my-6">
            <Skeleton className="h-32 w-32 rounded-full" /> {/* Skeleton for chart */}
          </div>
          <div className="space-y-2 ">
            <Skeleton className="h-4 w-24 mb-2" /> {/* Skeleton for cycle text */}
            <div className="flex flex-wrap gap-2">
              {/* Skeleton for badges */}
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-8 w-16" /> {/* Skeleton for upvotes button */}
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8" /> {/* Skeleton for try button */}
              <Skeleton className="h-8 w-8" /> {/* Skeleton for share button */}
            </div>
          </div>
        </CardFooter>
      </Card>
    )
  }