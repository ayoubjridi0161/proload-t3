import { auth } from "auth"
import GetWorkouts from "~/components/ui/form/getWorkouts"
import { Button } from "~/components/ui/button"
import { SonnerDemo } from "./tryout"
import { Toaster } from "~/components/ui/sonner"
import PostManager from "./CreatePost"
import AutoComplete from "./autoComplete"
import { AccordionDemo } from "./AccordionDemo"


const page = async () => {
    const session = await auth()
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

    
     
    return (
        <div className="bg-white grid place-items-center overflow-y-scroll h-screen space-y-5">
            <div className="h-fit">   
            <AccordionDemo />
            </div>
           
            {/* <WorkoutBox workoutSummary={}  /> */}
            <GetWorkouts />
 
            <h1 className="text-2xl font-bold mb-4">Tweet Card Test</h1>
      

            <SonnerDemo />
            <Toaster />
            <PostManager />
            {/* <MuscleGroupRadarChart /> */}
            <AutoComplete />  
            

                    </div>
    )
}
export default page

