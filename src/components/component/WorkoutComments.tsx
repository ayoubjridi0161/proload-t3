"use client"
import React, { useOptimistic, useState } from 'react'
import Link from 'next/link';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import Replies from '../ui/neopost/replies';
import { cn } from '~/lib/utils';
import { addWorkoutComment } from '~/lib/actions/socialActions';
import { toast } from 'sonner';
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
    const [userComments,addUserComments] = useState<Comment[]>(comments)
    const [pending,setPending] = useState(false)
    const [commentBox,setCommentBox] = useState<string>("")
    const addCommentAction = async ()=>{
        try{
        setPending(true)
        const messageId = Math.random()*250
        addUserComments((prev) => [...prev , {content:commentBox,id:messageId,users:{name:appUser},replys:[]}] )
        const res = await addWorkoutComment(workoutID,commentBox)
        if (!res ){
          addUserComments((prev) => prev.filter((comment) => comment.id !== messageId));
          toast.error("your comment was not posted")
        }
      }
      catch(error){
        toast.error("your comment was not posted")  
      }finally{
        setPending(false)
        setCommentBox("")
      }
    }
  return (

        <div className={cn("mt-2 space-y-4", className)}>
          <form className="flex gap-2">
            
              <Textarea
                value={commentBox}
                onChange={(e) => setCommentBox(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[60px] resize-none"
                name="content"
              />
                <Button
                  className="bg-blue-400 hover:bg-blue-500 text-white"
                  disabled={pending}
                  onClick={()=>{void addCommentAction()}}
                  type='button'
                >
                  Post
                </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-1">
            {userComments?.map((comment,index) => (
              <div key={comment.id} className={cn(index!=userComments.length-1 && "border-b-1 pb-1 border-gray-200 dark:border-xtraDarkAccent","flex gap-2 ")}>
                <div className="flex-1">
                  <div className="bg-gray-100 p-3 rounded-lg dark:bg-xtraDarkPrimary dark:text-xtraGray dark:border-1 dark:border-xtraDark/70 ">
                    <div className="flex justify-between">
                      <Link href={`/profile/${comment.users?.name}`} className="font-semibold opacity-70 text-sm hover:underline">
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