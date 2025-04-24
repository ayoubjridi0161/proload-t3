"use client"
import React, { useOptimistic, useState } from 'react'
import Link from 'next/link';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import Replies from '../ui/neopost/replies';
import { cn } from '~/lib/utils';
import { addWorkoutComment } from '~/lib/actions/socialActions';
type Comment = {
    content: string;
    id: number;
    replys?: Comment[];
    users: {
      name: string | null;
    } | null;
  };
type Props = {
    comments:Comment[]
    workoutID:number
    appUser:string
    className?: string
}

export default function Comments({comments,workoutID,appUser, className}: Props) {
    // const [replyText, setReplyText] = useState("")
    const [optimisticComments,addOptimisticComments] = useOptimistic(
        comments,
        (state ,newComment:Comment)=>{
            return [...state,newComment] 
        }
    )
    const addCommentAction = async (formdata:FormData)=>{
        const messageContent = formdata.get("content") as string
        addOptimisticComments({
            content:messageContent,
            id:Math.random()*250,
            users:{name:appUser},
            replys:[]
        })
        await addWorkoutComment(workoutID,messageContent)
    }
  return (

        <div className={cn("mt-2 space-y-4", className)}>
          <form action={addCommentAction} className="flex gap-2">
            
              <Textarea
                placeholder="Write a comment..."
                className="min-h-[60px] resize-none"
                name="content"
              />
                <Button
                  className="bg-blue-400 hover:bg-blue-500 text-white"
                >
                  Post
                </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-1">
            {optimisticComments?.map((comment,index) => (
              <div key={comment.id} className={cn(index!=optimisticComments.length-1 && "border-b-1 pb-1 border-gray-200","flex gap-2")}>
                <div className="flex-1">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <Link href={`/profile/${comment.users?.name}`} className="font-semibold text-sm hover:underline">
                        {comment.users?.name}
                      </Link>
                      {/* <span className="text-[#4a4a4a] text-[10px]">{comment.timestamp}</span> */}
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                <Replies appUser={appUser} comment={comment}/>
                </div>
              </div>
            ))}
          </div>
        </div>

  )
}