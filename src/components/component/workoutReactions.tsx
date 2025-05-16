"use client"
import { Button } from "~/components/ui/button"
import { TooltipTrigger, TooltipContent, Tooltip, TooltipProvider } from "~/components/ui/tooltip"
import { ArrowBigDownDash, ArrowBigUpDash, CopyIcon, Edit } from 'lucide-react'
import Link from "next/link"
import { useState, type JSX, type SVGProps } from "react"
import { Toggle } from "../ui/toggle"
import { addUserReaction } from "~/lib/actions/userInteractions"
import { toast } from "sonner"
type Props = {
  userId: string | undefined,
  workoutId: number,
  Reactions: { upvotes: number, downvotes: number, clones: number }
  userReactions: { upvote: boolean, downvote: boolean } | undefined,
  isOwner: boolean,
}
function TooltipBox(props: Props) {
  const [userReactions, setUserReactions] = useState(props.userReactions)
  const pressButton = async (type: "upvote" | "downvote") => {
    const oldReactions = userReactions
    if(type == "upvote"){
      setUserReactions(prev => prev ? { downvote:prev.upvote ? prev.downvote : false ,upvote:!prev.upvote } : { upvote: true, downvote: false })
      const res = await addUserReaction(
        props.workoutId, 
        { 
          type: "upvote",
          payload: oldReactions ? { downvote:oldReactions.upvote ? oldReactions.downvote : false ,upvote:!oldReactions.upvote } : { upvote: true, downvote: false }
        }
      )
      if(res !== "success"){
        setUserReactions(oldReactions ? {...oldReactions} : undefined)
        toast.error(res)
      }
    } else {
      const oldReactions = userReactions
      setUserReactions(prev => prev ? { downvote: !prev.downvote , upvote: prev.downvote ? prev.upvote : false  } : { upvote: false, downvote: true })
      const res = await addUserReaction(
        props.workoutId, 
        { 
          type: "upvote",
          payload: oldReactions ? { downvote: !oldReactions.downvote , upvote: oldReactions.downvote ? oldReactions.upvote : false  } : { upvote: false, downvote: true }
        }
      )
      if(res !== "success"){
        setUserReactions(oldReactions ? {...oldReactions} : undefined)
        toast.error(res)
      }
    }
  }
  return (
    <div className="flex justify-around items-start gap-x-2 ">
      <TooltipProvider>

        <div>
          {/* <Upvote EUR={!!UserReactions} pressed={UserReactions?.upvote ?? false} workoutId={props.workoutId} /> */}
          <Tooltip  >
            <TooltipTrigger asChild onClick={() => { void pressButton("upvote") }}>
              <Toggle className={userReactions?.upvote ? " text-green-500" : ""}>
                <ArrowBigUpDash className="h-5 w-5 " />
                <span className="sr-only">Upvote</span>
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Upvote </TooltipContent>

          </Tooltip>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">{props.Reactions.upvotes}</div>
        </div>
        <div>
          {/* <Downvote EUR={!!UserReactions} pressed={UserReactions?.downvote ?? false} workoutId={props.workoutId} /> */}
          <Tooltip  >
            <TooltipTrigger asChild onClick={() =>
              void (pressButton("downvote"))
            }>
              <Toggle className={userReactions?.downvote ? "text-red-700" : ""}>
                <ArrowBigDownDash className="h-5 w-5  hover:scale-110 ease-in" />
                <span className="sr-only">Downvote</span>
              </Toggle>
            </TooltipTrigger>

            <TooltipContent>Downvote </TooltipContent>

          </Tooltip>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">{props.Reactions.downvotes}</div>
        </div>
        <div>
          {/* <Clone workoutId={props.workoutId} /> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="text-black" size="icon" variant="ghost" 
              onClick={() => {
                void (async () => {
                  const result = await addUserReaction(props.workoutId, { type: "clone", payload: undefined })
                  return (toast(result === "success" ? "workout is cloned" : "failed to clone workout"))
                })
              }}
              >
                <CopyIcon className="h-5 w-5" />
                <span className="sr-only">Clone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clone</TooltipContent>
          </Tooltip>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">{props.Reactions.clones}</div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="text-black" size="icon" variant="ghost">
              <ShareIcon className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/workouts/${props.workoutId}/edit`} >
              <Button className="font-bold" variant={"link"}>
                <Edit/> 
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>{props.isOwner ? "Edit" : "Request edit"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}



function ShareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}


function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
export default TooltipBox
