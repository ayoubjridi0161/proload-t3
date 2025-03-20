"use client"

import { Calendar } from "~/components/ui/calendar"
import { cn } from "~/lib/utils"
import { CalendarIcon } from "lucide-react"

export default function WorkoutCalendar() {
  // Current date for comparison
  const today = new Date()

  // Sample past workout data - dates when workouts were completed
  const pastWorkouts = [
    new Date(2025, 2, 1),
    new Date(2025, 2, 3),
    new Date(2025, 2, 5),
    new Date(2025, 2, 8),
    new Date(2025, 2, 10),
    new Date(2025, 2, 12),
    new Date(2025, 2, 15),
    new Date(2025, 2, 17),
  ]

  // Sample future scheduled workouts
  const futureWorkouts = [
    new Date(2025, 2, 20),
    new Date(2025, 2, 22),
    new Date(2025, 2, 24),
    new Date(2025, 2, 26),
    new Date(2025, 2, 29),
    new Date(2025, 2, 31),
  ]

  // Find the next workout date (first future workout after today)
  const nextWorkout = futureWorkouts.find((date) => date > today) ?? null

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
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col items-center p-6 rounded-lg mx-auto bg-xtraDark w-full">
      <h1 className="text-2xl font-bold mb-2">Workout Calendar</h1>

      <div className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          <span className="font-medium">Next workout: {formatDate(nextWorkout)}</span>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-[#f2fcf5] shadow-md grid place-items-center w-full">
        <Calendar
          mode="single"
          className="rounded-md"
          components={{
            DayContent: ({ date }) => (
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md",
                  isPastWorkoutDay(date) && "bg-green-500 text-white",
                  isNextWorkoutDay(date) && "bg-blue-500 text-white font-bold ring-2 ring-blue-300",
                  isFutureWorkoutDay(date) && "bg-blue-100 text-blue-800",
                )}
              >
                {date.getDate()}
              </div>
            ),
          }}
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm">Completed workouts</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm">Next scheduled workout</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-100"></div>
          <span className="text-sm">Future scheduled workouts</span>
        </div>
      </div>
    </div>
  )
}

