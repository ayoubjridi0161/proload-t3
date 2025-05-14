"use client"

import { useEffect, useState, useCallback } from "react" // Import useCallback
import { usePathname, useRouter, useSearchParams } from "next/navigation" // Import next/navigation hooks
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
// Remove workoutData import if it's no longer needed client-side
// import { workoutData } from "./workout-data"
import {type WorkoutDetail} from "~/lib/types"

type SortField = "name" | "days" | "likes"
type SortOrder = "asc" | "desc"

type Props = { 
  

}




export default function WorkoutCards({}:Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  // Add loading bar state
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Wrap router.push with loading state
  const goToCreate = useCallback(() => {
    setIsNavigating(true)
    setLoadingProgress(0)
    router.push("/workouts/create")
  }, [router])

  // Handle loading animation
  useEffect(() => {
    if (!isNavigating) return

    const interval = setInterval(() => {
      setLoadingProgress(prev => (prev + 2) % 100);
    }, 20);

    return () => clearInterval(interval);
  }, [isNavigating]);

  // Reset loading state when navigation completes
  useEffect(() => {
    setIsNavigating(false)
    setLoadingProgress(0)
  }, [])

  // Get current search/sort state from URL parameters
  const currentSearchQuery = searchParams?.get("search") ?? ""
  const currentSortField = (searchParams?.get("sort") as SortField) ?? "name"
  const currentSortOrder = (searchParams?.get("order") as SortOrder) ?? "asc"

  // Local state for controlled search input, synced with URL param
  const [localSearchQuery, setLocalSearchQuery] = useState(currentSearchQuery);
  useEffect(() => {
    // Sync local state if URL parameter changes externally
    setLocalSearchQuery(currentSearchQuery);
  }, [currentSearchQuery]);
  // Update URL parameters on sort change
  const handleSortChange = (field: SortField) => {
    const params = new URLSearchParams(searchParams?.toString())
    let newOrder: SortOrder = "asc"

    // Determine the new sort order
    if (field === currentSortField) {
      // Toggle order if the same field is clicked
      newOrder = currentSortOrder === "asc" ? "desc" : "asc"
    }


    // Set the new sort field and order in URL parameters
    params.set("sort", field)
    params.set("order", newOrder)
    // Optional: Reset pagination if it exists
    params.delete("page");

    // Update the URL using router.push
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  // Get display text for current sort based on URL params
  const getSortDisplayText = () => {
    const fieldText = {
      name: "Name",
      days: "Days",
      likes: "Popularity",
    }[currentSortField] // Use currentSortField from URL

    const orderText = currentSortOrder === "asc" ? "A-Z" : "Z-A" // Use currentSortOrder from URL
    // Optional: Adjust order text for numeric fields
    // if (currentSortField === 'days' || currentSortField === 'likes') {
    //   orderText = currentSortOrder === 'asc' ? 'Low-High' : 'High-Low';
    // }

    return `${fieldText} (${orderText})`
  }
  const handleSearchButton = () => {
    const params = new URLSearchParams(searchParams?.toString() )
    if (localSearchQuery) {
      params.set("search", localSearchQuery)
    } else {
      params.delete("search")
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`)
    
    
  }
  return (
    <div className="space-y-6">
      {isNavigating && (
        <div className="fixed top-0 left-0 w-full h-[2px] bg-gray-200 z-50">
          <div 
            className="h-full bg-blue-500 w-1/5 absolute transition-all duration-200 ease-linear" 
            style={{ left: `${loadingProgress}%` }}
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">Workout Library</h1>
      <p className="text-muted-foreground mb-8">
        Browse workouts shared by the community. Find the perfect routine for your fitness goals.
      </p>
    
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-grow max-w-md">
            <Search onClick={handleSearchButton} className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer z-10" />
            <Input
              type="search"
              placeholder="Search workouts or users..."
              className="pl-8 bg-white"
              value={localSearchQuery} // Bind value to local state
              onChange={e => setLocalSearchQuery(e.target.value)} // Use the new input change handler
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2 min-w-[160px]">
                <Filter className="h-4 w-4" />
                {/* Use updated function to get display text from URL params */}
                <span className="flex-grow text-left">Sort by: {getSortDisplayText()}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Sort Workouts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* Update onClick handlers to use the modified handleSortChange */}
                <DropdownMenuItem onClick={() => handleSortChange("name")}>
                  <span className="flex-grow">Name</span>
                  {/* Check against currentSortField/Order from URL params */}
                  {currentSortField === "name" &&
                    (currentSortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4 ml-2" />
                    ) : (
                      <SortDesc className="h-4 w-4 ml-2" />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("days")}>
                  <span className="flex-grow">Number of Days</span>
                  {/* Check against currentSortField/Order from URL params */}
                  {currentSortField === "days" &&
                    (currentSortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4 ml-2" />
                    ) : (
                      <SortDesc className="h-4 w-4 ml-2" />
                    ))}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("likes")}>
                  <span className="flex-grow">Popularity</span>
                  {/* Check against currentSortField/Order from URL params */}
                  {currentSortField === "likes" &&
                    (currentSortOrder === "asc" ? (
                      <SortAsc className="h-4 w-4 ml-2" />
                    ) : (
                      <SortDesc className="h-4 w-4 ml-2" />
                    ))}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button onClick={()=>goToCreate()} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Workout
        </Button>
      </div>

      
    </div>
  )
}

