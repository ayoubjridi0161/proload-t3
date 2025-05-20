"use client"
import { Label, PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { Clock, Dumbbell, Heart, MapPin, Share2 } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import Link from "next/link"
import React from "react"
import { cn, mapToMainMuscleGroup } from "~/lib/utils"
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "../tooltip"
import { toast } from "sonner"
import {cloneAndUseWorkoutAction, makeCurrentWorkoutAction } from "~/lib/actions/workout"
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
    userId: string | null

  };
  handleShareEvent?: ({ workoutId, userId }: { workoutId: number, userId: string | null }) => void // Corrected type for handleShareEvent argument
  handleOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>; // Add the new prop type
}
export function WorkoutCard({ workout, handleShareEvent, handleOpenDialog }: WorkoutCardProps) {
  const [loading,isLoading] = React.useState(false)
  

  const { name, dayNames, description, exercices, id, numberOfDays, upvotes, username } = workout
  const muscleGroups = exercices?.map(ex => ({
    name: ex.mg as string,
    value: ex.exerciseCount
  }))
  const handleUseWorkout = async ()=>{
    try{
      isLoading(true)
    const res= await cloneAndUseWorkoutAction(workout.id)
    if(res == "success"){
      toast.success("workout is now in your library")
    }else{
      toast.error("something went wrong")
    }
  }catch(err){
    console.log(err)
  }finally{
    isLoading(false)
  }
  }

  // const  shareBehaviour = async ()=>{ await  handleShareEvent(workout.id,workout.userId ?? "")}

  return (
    <>
      <Card className="h-full flex flex-col">
        <Link className="h-full flex flex-col" href={`/workouts/${id}`}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-sm text-muted-foreground">by {username}</p>
                <p className="text-sm mt-2">
                  {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <MuscleGroupChart className="my-2 w-full max-w-[300px] mx-auto" muscleGroups={muscleGroups} />
          </CardContent>
          <div className="px-6 pb-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">{numberOfDays}-day cycle:</div>
              <div className="flex flex-wrap gap-2">
                {dayNames?.map((day,index) => (
                  <Badge
                    className={`truncate max-w-[100px] ${day.length > 6 ? 'text-[10px]' : 'text-xs'}`}
                    key={index}
                    variant={day == "rest" ? "secondary" : "default"}
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Link>
        {handleShareEvent && handleOpenDialog && <CardFooter className="border-t pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2">
            <Button variant="ghost" size="sm" className={"gap-1 border border-transparent hover:border-green-500"}>
              <Heart className={"h-4 w-4"} />
              <span>{upvotes}</span>
            </Button>
            <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                  disabled={loading}
                    onClick = {()=> {void handleUseWorkout()}}
                    variant="ghost" 
                    size="sm"
                    className={cn("", {
                      "opacity-50 cursor-not-allowed": loading
                    })}
                  >
                    <Dumbbell className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  use Workout
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => {
                handleShareEvent({ userId: workout.userId ?? "", workoutId: id });
                handleOpenDialog(true);
              }}>
                <Share2 className="h-4 w-4" />
              </Button>
              </TooltipTrigger>
              <TooltipContent>
              Share
              </TooltipContent>
              </Tooltip>
            </TooltipProvider>
              
            </div>
          </div>
        </CardFooter>}
      </Card>
    </>
  )
}

function MuscleGroupChart({ muscleGroups, className }: { className?: string, muscleGroups: { name: string; value: number }[] }) {
  // Define the main muscle groups that should always be displayed
  // Create a map for quick lookup of existing muscle group data
  const muscleGroupMap = new Map(muscleGroups.map(mg => [mapToMainMuscleGroup(mg.name.toLowerCase()), mg.value]));


  // Build the final data array ensuring all main groups are present
  // const chartData = mainMuscleGroups.map(groupName => ({
  //   name: groupName.charAt(0).toUpperCase() + groupName.slice(1), // Capitalize for display
  //   value: muscleGroupMap.get(groupName) ?? 0 // Use existing value or 0 if not present
  // }));

  const chartData = muscleGroupMap
  // Ensure we have data before rendering the chart
  if (!chartData) {
    return <div className={cn(className, "h-full w-full flex items-center justify-center")}>No data</div>
  }
  return (
    <div className={cn(className, "h-fit w-full flex items-center justify-center")}>
      <div className="w-full max-w-[300px] mx-auto">
        <RadarChart
          width={200}
          height={150}
          data={Array.from(chartData, ([name, value]) => ({ name, value }))}
          outerRadius={60}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          className="mx-auto"
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 9 }} />
          <Radar dataKey="value" fill="hsl(var(--xtra-gray))" fillOpacity={0.6} stroke="hsl(var(--xtra-gray))" />
        </RadarChart>
      </div>
    </div>
  )
}
