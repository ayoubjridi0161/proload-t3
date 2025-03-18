"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"
import { Clock, Dumbbell, Heart, Share2 } from "lucide-react"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
// No need to import ChartContainer
import{ type WorkoutDetail } from "~/lib/types"

interface WorkoutCardProps {
    workout: {
        exercices: {
            mg: string;
            exerciseCount: number;
        }[];
        id: number;
        name: string;
        username: string | null | undefined;
        description: string;
        numberOfDays: number | null;
        dayNames: string[];
        upvotes: number;
    }
}
  export function WorkoutCard({ workout }: WorkoutCardProps) {
    const { name,dayNames,description,exercices,id,numberOfDays,upvotes,username} = workout
    const muscleGroups = exercices?.map(ex => ({
        name:ex.mg,
        value:ex.exerciseCount
    }))
  
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">by {username}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between pb-2">
          <p className="text-sm mb-4">{description}</p>
          <div className="flex justify-center my-6">
            <div className="h-32 w-32">
              <MuscleGroupChart muscleGroups={muscleGroups} />
            </div>
          </div>
          <div className="space-y-2 ">
            <div className="text-sm font-medium">{numberOfDays}-day cycle:</div>
            <div className="flex flex-wrap gap-2">
              {dayNames?.map((day) => (
                <Badge key={day} variant={day == "rest" ? "secondary" : "default"}>
                  {day}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex justify-between items-center w-full">
            <Button variant="ghost" size="sm" className="gap-1">
              <Heart className="h-4 w-4" />
              <span>{upvotes}</span>
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Dumbbell className="h-4 w-4" />
                <span className="sr-only">Try workout</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    )
  }
  
  function MuscleGroupChart({ muscleGroups }: { muscleGroups: { name: string; value: number }[] }) {
    // Ensure we have data before rendering the chart
    if (!muscleGroups || muscleGroups.length === 0) {
      return <div className="h-full w-full flex items-center justify-center">No data</div>
    }
  
    return (
      <div className="h-full w-full">
        <RadarChart width={130} height={130} data={muscleGroups} outerRadius={60}>
          <PolarGrid />
          <PolarAngleAxis  dataKey="name" tick={{ fontSize: 10 }} />
          <Radar  dataKey="value" fill="hsl(var(--xtra-text))" fillOpacity={0.6} stroke="hsl(var(--xtra-text))" />
        </RadarChart>
      </div>
    )
  }
  
  