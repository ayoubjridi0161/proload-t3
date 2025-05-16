import { auth } from "auth"
import GetWorkouts from "~/components/ui/form/getWorkouts"
import { Button } from "~/components/ui/button"
import { SonnerDemo } from "./tryout"
import { Toaster } from "~/components/ui/sonner"
import {  seedExercisesFromCSV } from "~/server/db/seed"
import GenerateWorkout from "./generateWorkout"


const page =  () => {
    
     
    return (
        <div className="bg-white grid place-items-center overflow-y-scroll h-screen space-y-5">
            {/* <div className="h-fit">   
            <AccordionDemo />
            </div> */}
           
            {/* <WorkoutBox workoutSummary={}  /> */}
            {/* <GetWorkouts /> */}
 
            {/* <h1 className="text-2xl font-bold mb-4">Tweet Card Test</h1> */}
      

            <SonnerDemo />
            <Toaster />
            {/* <PostManager /> */}
            {/* <MuscleGroupRadarChart /> */}
            {/* <AutoComplete />   */}
            <form action={async ()=>{
              "use server"
              await seedExercisesFromCSV()
            }}>
            <Button type="submit" >seed Exercises</Button>
            </form>
            <GenerateWorkout/>

            </div>
    )
}
export default page

