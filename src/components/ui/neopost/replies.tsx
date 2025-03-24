import React, { useOptimistic, useState } from 'react'
import { Textarea } from '../textarea'
import { Button } from '../button'
import Link from 'next/link';
import { addReply } from '~/lib/actions';
type Comment = {
    content: string;
    id: number;
    replys?: Comment[];
    users: {
      name: string | null;
    } | null;
  };
type Props = {
    comment:Comment
    appUser:string
}

export default function Replies({ comment,appUser }: Props) {
        const [replyingTo, setReplyingTo] = useState<number | null>(null)
        const [optimisticReplies,addOptimisticReplies] = useOptimistic(
          comment.replys,
          (state ,newReply:Comment)=>{
              return [...state ?? [],newReply] 
          }
        )
        const addReplyAction = async(formData:FormData)=>{
            const replyContent = formData.get("content") as string
            addOptimisticReplies({
                content:replyContent,
                id:Math.random()*500,
                users:{name:appUser}
            })
            await addReply(comment.id,replyContent)
        }
  
    return (

        <div className="flex flex-col gap-2 mt-2">
             <div className="flex gap-4 mt-1 ml-2">
                <Button variant={"ghost"} size="sm" className="text-xs text-[#4a4a4a] hover:text-blue-400"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>
                     {replyingTo === comment.id ? "Cancel" : "Reply"}
                </Button>
            </div>
            {replyingTo &&<form action={addReplyAction} className="flex gap-2">
                <Textarea
                name='content'
                placeholder={`Reply to ${comment.users?.name}...`}
                className="min-h-[40px] resize-none text-sm"
                />
                <div className="flex justify-end mt-1">
                <Button
                    className="bg-blue-400 hover:bg-blue-500 text-white text-xs py-1 h-2/3 self-start "
                    size="sm"
                >
                    Reply
                </Button>
                </div>
            </form>}
            {optimisticReplies && optimisticReplies.length > 0 && (
            <div className="ml-6 mt-2 space-y-3">
            {optimisticReplies?.map((reply) => (
                <div key={reply.id} className="flex gap-2">
                <div className="flex-1">
                    <div className="bg-gray-100 p-2 rounded-lg">
                    <div className="flex justify-between">
                        <Link
                        href={`/profile/${reply.users?.name}`}
                        className="font-semibold text-xs hover:underline"
                        >
                        {reply.users?.name}
                        </Link>
                        {/* <span className="text-[#4a4a4a] text-[9px]">{reply.timestamp}</span> */}
                    </div>
                    <p className="text-xs mt-1">{reply.content}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
            )}
        </div>
    )
}
