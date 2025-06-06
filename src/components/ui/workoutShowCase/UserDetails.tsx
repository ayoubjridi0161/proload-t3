
import { getUserByID } from "~/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "../avatar"
import { Calendar, TriangleAlert } from "lucide-react"
import { Button } from "../button"
import { Separator } from "../separator"
import MakeCurrentButton from "./makeCurrentButton"

const UserDetails = async ({ userID,isOwner,workoutID }: { userID: string | null,isOwner:boolean,workoutID:number }) => {
  if (!userID) return null
  const date = new Date()
  const dateString = date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  })
  const userDetails = await getUserByID(userID)
  return (
    <div className="space-y-2 ">
      <div className="flex justify-between items-center">
      {isOwner && <MakeCurrentButton userID={userID} workoutID={workoutID}/>}
        <p className="gap-2 flex items-center">
          <Calendar /> {dateString}
        </p>
        {!isOwner &&
          <Button variant={"ghost"} size={"sm"} className="flex gap-1 items-center justify-end"><TriangleAlert color="red" /> Report </Button>
          }
        
      </div>
      <Separator className="w-2/3 mx-auto" />
      <div className="flex items-start pt-2 gap-5">
        <Avatar>
          <AvatarFallback>
            {userDetails?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
          {userDetails?.image &&
            <AvatarImage src={userDetails?.image} />
          }
        </Avatar>
        <div className="w-full">
          <p className="text-lg font-semibold">{userDetails?.name}</p>
          <p className="text-sm text-gray-500">
            {userDetails?.bio}
          </p>
        </div>
      </div>
      </div>
  )
}

export default UserDetails