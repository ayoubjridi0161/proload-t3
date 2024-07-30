import { auth } from "auth"
import { redirect } from "next/navigation"
import GetWorkouts from "~/components/ui/form/getWorkouts"
import WorkoutBox from "~/components/ui/workouts/WorkoutBox"
import { postWorkouts } from "~/lib/actions"
import { fetchAllWorkouts } from "~/lib/data"

const page = async () => {
    const session = await auth()
    // if (!session) redirect("/")
    
    const colors = ['bg-background', 'bg-primary ', 'bg-foreground', 'bg-border', 'bg-card', 'bg-card-foreground', 'bg-popover', 'bg-popover-foreground', 'bg-primary-foreground', 'bg-secondary', 'bg-secondary-foreground', 'bg-muted', 'bg-muted-foreground', 'bg-accent', 'bg-accent-foreground', 'bg-destructive', 'bg-destructive-foreground'
    ]

    const workoutSummaryList = await fetchAllWorkouts()
    
     
    return (
        <div className="bg-white grid place-items-center h-screen">
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
            
        </div>
    )
}
export default page

