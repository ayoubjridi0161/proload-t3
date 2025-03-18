"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Filter, Plus, Search, SortAsc, SortDesc } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import { WorkoutCard } from "./workout-card"
import { workoutData } from "./workout-data"
import {type WorkoutDetail} from "~/lib/types"

type SortField = "name" | "days" | "likes"
type SortOrder = "asc" | "desc"

type Props = { workouts: {
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
}[]}

export default function WorkoutCards({workouts}:Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  // Filter and sort workouts
  const filteredAndSortedWorkouts =
    workouts && workouts.length > 0
      ? workouts
          // First apply search filter
          .filter(
            (workout) =>
              workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (workout.username ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
              workout.description.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          // Then sort based on selected field and order
          .sort((a, b) => {
            if (sortField === "name") {
              return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            } else if (sortField === "days") {
              return sortOrder === "asc" ? (a.numberOfDays ?? 0) - (b.numberOfDays ?? 0) : (b.numberOfDays ?? 0) - (a.numberOfDays ?? 0)
            } else if (sortField === "likes") {
              return sortOrder === "asc" ? a.upvotes - b.upvotes : b.upvotes - a.upvotes
            }
            return 0
          })
      : []

  // Toggle sort order or change sort field
  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to ascending order
      setSortField(field)
      setSortOrder("asc")
    }
  }

  // Get display text for current sort
  const getSortDisplayText = () => {
    const fieldText = {
      name: "Name",
      days: "Days",
      likes: "Popularity",
    }[sortField]

    return `${fieldText} (${sortOrder === "asc" ? "A-Z" : "Z-A"})`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search workouts or users..."
              className="pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2 min-w-[160px]">
                <Filter className="h-4 w-4" />
                <span className="flex-grow text-left">Sort by: {getSortDisplayText()}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Sort Workouts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleSortChange("name")}>
                  <span className="flex-grow">Name</span>
                  {sortField === "name" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4 ml-2" />
                    ) : (
                      <SortDesc className="h-4 w-4 ml-2" />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("days")}>
                  <span className="flex-grow">Number of Days</span>
                  {sortField === "days" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4 ml-2" />
                    ) : (
                      <SortDesc className="h-4 w-4 ml-2" />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("likes")}>
                  <span className="flex-grow">Popularity</span>
                  {sortField === "likes" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4 ml-2" />
                    ) : (
                      <SortDesc className="h-4 w-4 ml-2" />
                    ))}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Workout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedWorkouts.length > 0 ? (
          filteredAndSortedWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No workouts found</p>
          </div>
        )}
        {/* {workouts?.map(workout =>(
            <WorkoutCard key={workout.id} workout={workout} />
        ))} */}
      </div>
    </div>
  )
}

