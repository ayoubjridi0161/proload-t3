import { getSession } from 'next-auth/react'
import React, { useOptimistic, useState } from 'react'
import { Textarea } from '../textarea'
import { Button } from '../button';
import Link from 'next/link';
import Replies from './replies';
import { addComment } from '~/lib/actions/socialActions';
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
    postID:number
    user:string
    appUser:string
}

export default function Comments({comments,postID,user,appUser}: Props) {
    // const [commentText, setCommentText] = useState("")
    // const [Comments, setComments] = useState(comments)
    const [replyText, setReplyText] = useState("")
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
        await addComment(postID,messageContent)
    }
  return (

        <div className="mt-4 space-y-4 border-t pt-4">
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
          <div className="space-y-4">
            {optimisticComments?.map((comment) => (
              <div key={comment.id} className="flex gap-2">
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