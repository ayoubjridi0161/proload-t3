"use client"
import { Skeleton } from "@nextui-org/react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function WorkoutCardSkeleton() {
    return (
      <Card className="h-full flex flex-col dark:bg-xtraDarkPrimary">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-5 w-32 mb-1 dark:bg-xtraDarkPrimary" />
              <Skeleton className="h-4 w-20 dark:bg-xtraDarkPrimary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between pb-2">
          <Skeleton className="h-4 w-full mb-1 dark:bg-xtraDarkPrimary" />
          <Skeleton className="h-4 w-4/5 mb-4 dark:bg-xtraDarkPrimary" />
          <div className="flex justify-center my-6">
            <Skeleton className="h-32 w-32 rounded-full dark:bg-xtraDarkPrimary" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 mb-2 dark:bg-xtraDarkPrimary" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-md dark:bg-xtraDarkPrimary" />
              <Skeleton className="h-6 w-16 rounded-md dark:bg-xtraDarkPrimary" />
              <Skeleton className="h-6 w-16 rounded-md dark:bg-xtraDarkPrimary" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 dark:border-xtraDarkPrimary">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-8 w-16 dark:bg-xtraDarkPrimary" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 dark:bg-xtraDarkPrimary" />
              <Skeleton className="h-8 w-8 dark:bg-xtraDarkPrimary" />
            </div>
          </div>
        </CardFooter>
      </Card>
    )
}