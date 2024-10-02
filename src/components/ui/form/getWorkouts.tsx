"use client"
import { postWorkouts } from "~/lib/actions"
import { Button } from "../button"
import { useFormState } from "react-dom"

const GetWorkouts = ()=>{
    const [data, action ] =useFormState(postWorkouts,null)
    if (Array.isArray(data)) {
       const workouts = data.map((workout:any)=>console.log(workout))
    }
    


    return(
        <div>
            <form action={action}>
            <Button type="submit">Get Workouts</Button>
            </form>
            <div>
               <p className="w-full text-center"> {data && JSON.stringify(data)}</p>
            </div>
        </div>
    )
}
export default GetWorkouts