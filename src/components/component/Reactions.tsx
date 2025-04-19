"use client"
import { Toggle } from '../ui/toggle'
import { ArrowBigDownDash, ArrowBigUpDash, CopyIcon, MessageSquare } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { auth } from 'auth'
import {useSession } from 'next-auth/react'
import {useState, useTransition} from  "react"
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { updateReactions } from '~/lib/data'
import { toast } from 'sonner'
import { addUserReaction } from '~/lib/actions/userInteractions'

export const Upvote =  ({workoutId,pressed,EUR}:{EUR:boolean,workoutId:number,pressed:boolean}) => {
const [isPressed,setPressed] = useState(pressed)
  return (
    <Tooltip  >
              <TooltipTrigger asChild onClick={(e) => {
                void (async () => {
                setPressed(prev => !prev)
                
                const result = await addUserReaction(workoutId,EUR,{type:"upvote",payload:!pressed})
              // Handle the result appropriately
                console.log(result)
  })
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
  const [isPressed,setPressed] = useState(pressed)
    return (
      <Tooltip  >
                <TooltipTrigger asChild onClick={(e) => {
                  void (async () => {
                  setPressed(prev => !prev)
                  
                  const result = await addUserReaction(workoutId,EUR,{type:"downvote",payload:!pressed})
                // Handle the result appropriately
                  console.log(result)
              })}}>
                <Toggle className={isPressed ? "bg-muted text-muted-foreground" : ""}>
                <ArrowBigDownDash className="h-5 w-5 " />
                <span className="sr-only">Downvote</span>
                </Toggle>
                </TooltipTrigger>
                
            <TooltipContent>Downvote </TooltipContent>
                
              </Tooltip>
              
    )
  }
  export const Clone = ({workoutId}:{workoutId:number})=>{
    return(
        <Tooltip>
        <TooltipTrigger asChild>
          <Button className="text-black" size="icon" variant="ghost" onClick={() => {
            void (async () => {
            const result = await addUserReaction(workoutId,true,{type:"clone",payload:true})
            console.log("result",result)
            return (toast(result=== "success" ? "workout is cloned" : "failed to clone workout" ))
          })}}>
            <CopyIcon className="h-5 w-5" />
            <span className="sr-only">Clone</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Clone</TooltipContent>
      </Tooltip>
  )}

export const Comment = ()=>{
  return(
    <Tooltip  >
                <TooltipTrigger asChild >
                  <Button onClick={()=>{console.log("allahu akbar")}} variant={"ghost"} className='hover:bg-muted hover:text-muted-foreground px-3'>
                  <MessageSquare className='cursor-pointer '/>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>comments </TooltipContent>
          </Tooltip>
  )
}