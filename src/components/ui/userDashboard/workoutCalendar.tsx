"use client"

import { Calendar } from "~/components/ui/calendar"
import { cn } from "~/lib/utils"
import { CalendarIcon } from "lucide-react"
type Props = {
  workoutDates :{
    date: Date;
}[] | null | undefined
}
export default function WorkoutCalendar({workoutDates}:Props) {
  // Current date for comparison
  const today = new Date()

  // Extract dates from workoutDates prop
  const workoutDateObjects = workoutDates?.map(item => item.date) ?? []
  
  // Separate past and future workouts
  const pastWorkouts = workoutDateObjects.filter(date => date <= today)
  const futureWorkouts = workoutDateObjects.filter(date => date > today)

  // Find the next workout date (first future workout after today)
  const nextWorkout = futureWorkouts.length > 0 ? futureWorkouts[0] : null

  // Function to check if a date is in the past workout days array
  const isPastWorkoutDay = (date: Date) => {
    return pastWorkouts.some(
      (workoutDate) =>
        workoutDate.getDate() === date.getDate() &&
        workoutDate.getMonth() === date.getMonth() &&
        workoutDate.getFullYear() === date.getFullYear(),
    )
  }

  // Function to check if a date is the next workout
  const isNextWorkoutDay = (date: Date) => {
    if (!nextWorkout) return false

    return (
      nextWorkout.getDate() === date.getDate() &&
      nextWorkout.getMonth() === date.getMonth() &&
      nextWorkout.getFullYear() === date.getFullYear()
    )
  }

  // Function to check if a date is a future workout (but not the next one)
  const isFutureWorkoutDay = (date: Date) => {
    return (
      futureWorkouts.some(
        (workoutDate) =>
          workoutDate.getDate() === date.getDate() &&
          workoutDate.getMonth() === date.getMonth() &&
          workoutDate.getFullYear() === date.getFullYear(),
      ) && !isNextWorkoutDay(date)
    )
  }

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "No upcoming workouts"
    return date.toLocaleDateString("en-US", {
      weekday: "short", // Changed from 'long' to 'short'
      month: "short",   // Changed from 'long' to 'short'
      day: "numeric",
    })
  }

  return (
    <div className="mt-5 flex flex-col items-center p-2 rounded-lg mx-auto   w-full text-xs">
      <h2 className="text-sm font-bold mb-1">Workout Calendar</h2>

      <div className="mb-2 text-center w-full">
        <div className="flex items-center justify-center gap-1 p-1 bg-blue-50 rounded-lg border border-blue-200 text-xs">
          <CalendarIcon className="h-3 w-3 text-blue-500" />
          <span className="font-medium text-xs">Next: {formatDate(nextWorkout ?? null)}</span>
        </div>
      </div>

      <div className="border rounded-lg bg-xtraDark shadow-sm  grid place-items-center w-full">
        <Calendar
          mode="single"
          className="rounded-md bg-white scale-95"
          components={{
            DayContent: ({ date }) => (
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-md text-xs",
                  isPastWorkoutDay(date) && "bg-green-500 text-white",
                  isNextWorkoutDay(date) && "bg-blue-500 text-white font-bold ring-1 ring-blue-300",
                  isFutureWorkoutDay(date) && "bg-blue-100 text-blue-800",
                )}
              >
                {date.getDate()}
              </div>
            ),
          }}
        />
      </div>

      <div className="mt-2 flex flex-wrap gap-2 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs">Completed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-xs">Next</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-100"></div>
          <span className="text-xs">Future</span>
        </div>
      </div>
    </div>
  )
}

