import { auth } from "auth"
import { redirect } from "next/navigation"
import GetWorkouts from "~/components/ui/form/getWorkouts"
import TweetCard from "~/components/ui/Posts/TweetCard"
import WorkoutBox from "~/components/ui/workouts/WorkoutBox"
import { postWorkouts, seed } from "~/lib/actions"
import { fetchAllWorkouts } from "~/lib/data"
import {User} from "@nextui-org/user";
import {
    Autocomplete,
    AutocompleteSection,
    AutocompleteItem
  } from "@nextui-org/autocomplete";
import { Providers } from "../providers"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import DropDown from "~/components/ui/DropDown"
import { Button } from "~/components/ui/button"
import { toast } from "sonner"
import { SonnerDemo } from "./tryout"
import { Toaster } from "~/components/ui/sonner"
import PostManager from "./CreatePost"
import MuscleGroupRadarChart from "~/components/component/MuscleChart"
import AutoComplete from "./autoComplete"

const page = async () => {
    const session = await auth()
    // if (!session) redirect("/")
    
    const colors = ['bg-background', 'bg-primary ', 'bg-foreground', 'bg-border', 'bg-card', 'bg-card-foreground', 'bg-popover', 'bg-popover-foreground', 'bg-primary-foreground', 'bg-secondary', 'bg-secondary-foreground', 'bg-muted', 'bg-muted-foreground', 'bg-accent', 'bg-accent-foreground', 'bg-destructive', 'bg-destructive-foreground'
    ]
     const animals = [
        {label: "Cat", value: "cat", description: "The second most popular pet in the world"},
        {label: "Dog", value: "dog", description: "The most popular pet in the world"},
        {label: "Elephant", value: "elephant", description: "The largest land animal"},
        {label: "Lion", value: "lion", description: "The king of the jungle"},
        {label: "Tiger", value: "tiger", description: "The largest cat species"},
        {label: "Giraffe", value: "giraffe", description: "The tallest land animal"},
        {
          label: "Dolphin",
          value: "dolphin",
          description: "A widely distributed and diverse group of aquatic mammals",
        },
        {label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds"},
        {label: "Zebra", value: "zebra", description: "A several species of African equids"},
        {
          label: "Shark",
          value: "shark",
          description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
        },
        {
          label: "Whale",
          value: "whale",
          description: "Diverse group of fully aquatic placental marine mammals",
        },
        {label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
        {label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile"},
      ];

    const workoutSummaryList = await fetchAllWorkouts()
    
     
    return (
        <div className="bg-white grid place-items-center h-screen space-y-5">
            <div className="flex flex-wrap gap-3 px-4 w-full ">
                {
                    colors.map((color,index) => (
                        <div key={index} className="h-16" >
                            <h3 className="text-center">{color}</h3>
                            <div className={`h-5 w-full border-2 border-border  ${color} `}></div>
                        </div>)
                    )
                }
            </div>
            <div className="flex flex-wrap gap-1">
            {
                workoutSummaryList.map((workoutSummary, index) => (
                    <WorkoutBox key={index} workoutSummary={workoutSummary} />
                ))
            }
            </div>
            {/* <WorkoutBox workoutSummary={}  /> */}
            <GetWorkouts />
 
            <h1 className="text-2xl font-bold mb-4">Tweet Card Test</h1>
      

            <SonnerDemo />
            <Toaster />
            <PostManager />
            <MuscleGroupRadarChart />
            <form action={seed}>
            <Button  variant={'destructive'} size={'lg'}   className=' mb-5 w-1/12'>Seed</Button>

            </form>
            <AutoComplete />            
                    </div>
    )
}
export default page

