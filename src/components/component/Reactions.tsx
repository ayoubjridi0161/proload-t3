"use client"
import { Toggle } from '../ui/toggle'
import { ArrowBigUpDash } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { auth } from 'auth'
import {useSession } from 'next-auth/react'
import {useState, useTransition} from  "react"
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { updateReactions } from '~/lib/data'
import { addUserReaction } from '~/lib/actions'

export const Upvote =  ({workoutId,pressed,EUR}:{EUR:boolean,workoutId:number,pressed:boolean}) => {
let [isPending,startTrasition ] = useTransition( );
const [isPressed,setPressed] = useState(pressed)
  return (
    <Tooltip  >
              <TooltipTrigger asChild onClick={async (e) => {
                setPressed(prev => !prev)
                
                const result = await addUserReaction(workoutId,EUR,{type:"upvote",payload:!pressed})
              // Handle the result appropriately
                console.log(result)
            }}>
              <Toggle className={isPressed ? "bg-muted text-muted-foreground" : ""}>
              <ArrowBigUpDash className="h-5 w-5 " />
              <span className="sr-only">Upvote</span>
              </Toggle>
              </TooltipTrigger>
              
          <TooltipContent>Upvote </TooltipContent>
              
            </Tooltip>
            
  )
}
export const Downvote =  ({workoutId,pressed,EUR}:{EUR:boolean,workoutId:number,pressed:boolean}) => {
  let [isPending,startTrasition ] = useTransition( );
  const [isPressed,setPressed] = useState(pressed)
    return (
      <Tooltip  >
                <TooltipTrigger asChild onClick={async (e) => {
                  setPressed(prev => !prev)
                  
                  const result = await addUserReaction(workoutId,EUR,{type:"downvote",payload:!pressed})
                // Handle the result appropriately
                  console.log(result)
              }}>
                <Toggle className={isPressed ? "bg-muted text-muted-foreground" : ""}>
                <ArrowBigUpDash className="h-5 w-5 " />
                <span className="sr-only">Downvote</span>
                </Toggle>
                </TooltipTrigger>
                
            <TooltipContent>Downvote </TooltipContent>
                
              </Tooltip>
              
    )
  }