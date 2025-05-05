"use client"
import { Label, PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { Clock, Dumbbell, Heart, MapPin, Share2 } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
// No need to import ChartContainer
import{ type WorkoutDetail } from "~/lib/types"
import Link from "next/link"
import React from "react"
import { cn } from "~/lib/utils"

interface WorkoutCardProps {
    workout: {
      exercices: {
          mg: unknown;
          exerciseCount: number;
      }[];
      id: number;
      name: string;
      username: string | null | undefined;
      description: string;
      numberOfDays: number | null;
      dayNames: string[];
      upvotes: number;
      userId:string|null

  };
  handleShareEvent?: ({workoutId,userId}:{workoutId:number,userId:string|null}) => void // Corrected type for handleShareEvent argument
  handleOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>; // Add the new prop type

}
  export function WorkoutCard({ workout,handleShareEvent,handleOpenDialog }: WorkoutCardProps) {
    
    const { name,dayNames,description,exercices,id,numberOfDays,upvotes,username} = workout
    const muscleGroups = exercices?.map(ex => ({
        name:ex.mg as string,
        value:ex.exerciseCount
    }))

    // const  shareBehaviour = async ()=>{ await  handleShareEvent(workout.id,workout.userId ?? "")}
  
    return (
      <>
      
      <Card className="h-full flex flex-col">
      <Link className="h-full" href={`/workouts/${id}`}>
      <CardHeader>
          <div className="flex justify-between items-start ">
            <div>
              <h3 className="font-bold text-lg">{name}</h3>
              <p className="text-sm text-muted-foreground">by {username}</p>
              <p className="text-sm mt-2">
                {description.length > 100 ? `${description.slice(0, 100)}...` : description}
              </p>
            </div>
          </div>
          </CardHeader>
        {/* <CardContent className="flex-grow flex flex-col justify-between pb-2"> */}
        <CardContent>
          <MuscleGroupChart className="my-2 " muscleGroups={muscleGroups}  />
          <div className="space-y-2">
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
        </Link>
        {handleShareEvent && handleOpenDialog &&  <CardFooter className="border-t pt-4 ">
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
              <Button variant="ghost" size="sm" onClick={()=>{
                handleShareEvent({userId:workout.userId ?? "", workoutId:id}); // Ensure userId is passed correctly, handle null case
                handleOpenDialog(true); // Call handleOpenDialog to open the dialog
                }}>
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </CardFooter>}
      </Card>
      
      </>
    )
  }
  
  function MuscleGroupChart({ muscleGroups,className }: { className?:string,muscleGroups: { name: string; value: number }[] }) {
    // Define the main muscle groups that should always be displayed
    const mainMuscleGroups = ['chest', 'shoulder', 'arms', 'legs', 'core', 'back'];

    // Create a map for quick lookup of existing muscle group data
    const muscleGroupMap = new Map(muscleGroups.map(mg => [mg.name.toLowerCase(), mg.value]));

    // Build the final data array ensuring all main groups are present
    const chartData = mainMuscleGroups.map(groupName => ({
      name: groupName.charAt(0).toUpperCase() + groupName.slice(1), // Capitalize for display
      value: muscleGroupMap.get(groupName) ?? 0 // Use existing value or 0 if not present
    }));


    // Ensure we have data before rendering the chart
    if (!chartData || chartData.length === 0) {
      return <div className={cn(className,"h-full w-full flex items-center justify-center")}>No data</div>
    }
    return (
      <div className={cn(className,"h-fit w-full")}>
        {/* Pass the complete chartData to the RadarChart */}
        <RadarChart width={300} height={150} data={chartData} outerRadius={60}>
          <PolarGrid />
          <PolarAngleAxis  dataKey="name" tick={{ fontSize: 9 }} />
          <Radar  dataKey="value" fill="hsl(var(--xtra-gray))" fillOpacity={0.6} stroke="hsl(var(--xtra-gray))" />
        </RadarChart>
      </div>
    )
  }
