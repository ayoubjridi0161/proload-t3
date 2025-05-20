"use client"

import { Calendar } from "~/components/ui/calendar"
import { cn } from "~/lib/utils"
import { CalendarIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getWorkoutDaysByID } from "~/lib/actions/workout"
type Props = {
  workoutDates: {
    date: Date;
    dayName: string | null;
  }[] | null | undefined
}
export default function WorkoutCalendar({ workoutDates }: Props) {
  // Current date for comparison
  const [workoutDays, setWorkoutDays] = useState<string[] | null>(null)
  const [nextWorkout, setNextWorkout] = useState<{ date: Date, name: string } | null>(null)
  const [futureWorkouts, setFutureWorkouts] = useState<{ date: Date, name: string }[]>([]);


  const { data } = useSession()
  const currentWorkoutId = data?.user ? (data.user as { currentWorkout: number }).currentWorkout : null
  const lastWorkoutLogged = workoutDates ? workoutDates[workoutDates.length - 1] : undefined
  // const today = lastWorkoutLogged?.date.getDate() === new Date().getDate() ? newDate.setDate(newDate.getDate() + 1) : newDate
  const newDate = new Date()
  const today = lastWorkoutLogged?.date.getDate() === new Date().getDate() ?
    (() => {
      const tomorrow = new Date(newDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    })() :
    new Date(newDate);

  useEffect(() => {
    async function getUserWorkouts() {
      const res = currentWorkoutId ? await getWorkoutDaysByID(currentWorkoutId) : null;
      setWorkoutDays(res)
    }
    void getUserWorkouts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const lastWorkoutIndex = lastWorkoutLogged && workoutDays ? workoutDays.findIndex(day => day === lastWorkoutLogged.dayName) : -1
    if (lastWorkoutIndex !== -1 && workoutDays) {
      let nextDayIndex = (lastWorkoutIndex + 1) % workoutDays.length;
      let daysToAdd = 1;

      // Find next non-rest day
      while (workoutDays[nextDayIndex] === "rest" && daysToAdd < workoutDays.length) {
        nextDayIndex = (nextDayIndex + 1) % workoutDays.length;
        daysToAdd++;
      }

      setNextWorkout({ date: today, name: workoutDays[nextDayIndex] ?? "No name" })

      // Calculate days since last workout
      const daysSinceLastWorkout = Math.floor(
        (today.getTime() - (lastWorkoutLogged?.date.getTime() ?? today.getTime())) / (1000 * 60 * 60 * 24)
      );

      // Adjust date if needed
      if (daysToAdd > daysSinceLastWorkout) {
        const adjustedDate = new Date(lastWorkoutLogged?.date ?? new Date());
        adjustedDate.setDate(adjustedDate.getDate() + daysToAdd);
        setNextWorkout(prev => prev ? ({ ...prev, date: adjustedDate }) : null);
      }
    } else {
      setNextWorkout({ date: today, name: workoutDays?.[0] ?? "No name" })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutDays])

  useEffect(() => {
    if (!workoutDays || !nextWorkout) return;

    const generateFutureWorkouts = () => {
      const future: { date: Date, name: string }[] = [];
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 3); // 3 months from now

      const currentDate = new Date();
      currentDate.setDate(nextWorkout.date.getDate() + 1)
      let dayIndex = workoutDays.findIndex(day => day === nextWorkout.name);

      while (currentDate <= endDate) {
        // Skip rest days
        while (workoutDays[dayIndex] === "rest") {
          dayIndex = (dayIndex + 1) % workoutDays.length;
          currentDate.setDate(currentDate.getDate() + 1);
        }

        future.push({
          date: new Date(currentDate),
          name: workoutDays[dayIndex] ?? "no name"
        });

        // Move to next workout day
        dayIndex = (dayIndex + 1) % workoutDays.length;
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return future;
    };

    setFutureWorkouts(generateFutureWorkouts());

  }, [workoutDays, nextWorkout]);

  const isPastWorkoutDay = (date: Date) => {
    return workoutDates?.some(
      (workoutDate) =>
        workoutDate.date.getDate() === date.getDate() &&
        workoutDate.date.getMonth() === date.getMonth() &&
        workoutDate.date.getFullYear() === date.getFullYear(),
    )
  }

  // Function to check if a date is the next workout
  const isNextWorkoutDay = (date: Date) => {
    if (!nextWorkout) return false

    return (
      nextWorkout.date.getDate() === date.getDate() &&
      nextWorkout.date.getMonth() === date.getMonth() &&
      nextWorkout.date.getFullYear() === date.getFullYear()
    )
  }

  // Function to check if a date is a future workout (but not the next one)
  const isFutureWorkoutDay = (date: Date) => {
    return (
      futureWorkouts.some(
        (workoutDate) =>
          workoutDate.date.getDate() === date.getDate() &&
          workoutDate.date.getMonth() === date.getMonth() &&
          workoutDate.date.getFullYear() === date.getFullYear(),
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

      {nextWorkout?.name !== "No name" && <div className="mb-2 text-center w-full">
        <div className="flex items-center justify-center gap-1 p-1 bg-blue-50 rounded-lg border border-blue-200 text-xs">
          <CalendarIcon className="h-3 w-3 text-blue-500" />
          <span className="font-medium text-xs dark:text-xtraText">Next: {nextWorkout?.name}</span>
        </div>
      </div>}

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
                {/* <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 whitespace-nowrap">
                {futureWorkouts.find(workout => 
                  workout.date.getDate() === date.getDate() && 
                  workout.date.getMonth() === date.getMonth() && 
                  workout.date.getFullYear() === date.getFullYear()
                )?.name ?? 'rest'}
                </span> */}
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




