import React, { useState } from 'react'
import { Textarea } from '../textarea'
import { Button } from '../button'
import Link from 'next/link';
import { addReply } from '~/lib/actions/socialActions';
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
    comment:Comment
    appUser:string
}

export default function Replies({ comment,appUser }: Props) {
        const [replyingTo, setReplyingTo] = useState<number | null>(null)
        const [ReplyBox,setReplyBox] = useState("")
        const [pending,setPending] = useState(false)
        const [replies,setReplies] = useState(comment.replys ?? [])

        const addReplyAction = async ()=>{
            try{
            setPending(true)
            setReplyBox("")
            setReplyingTo(null)
            const replyId = Math.random()*250
            setReplies((prev) => [...prev , {content:ReplyBox,id:replyId,users:{name:appUser},replys:[]}] )
            const res = await addReply(comment.id,ReplyBox)
            if (!res ){
              setReplies((prev) => prev.filter((reply) => reply.id !== replyId));
              toast.error("your comment was not posted")
            }
          }
          catch(error){
            toast.error("your comment was not posted")  
          }finally{
            setPending(false)

          }
        }
  
    return (

        <div className="flex flex-col gap-2 m-0 ">
                <Button variant={"link"} size="sm" className="text-xs text-[#4a4a4a] dark:text-xtraGray/50 font-light self-start p-0 my-0 ml-2"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>
                     {replyingTo === comment.id ? "Cancel" : "Reply"}
                </Button>
            {replyingTo &&<form className="flex gap-2">
                <Textarea
                value={ReplyBox}
                onChange={(e)=>setReplyBox(e.target.value)}
                name='content'
                placeholder={`Reply to ${comment.users?.name}...`}
                className="min-h-[40px] resize-none text-sm"
                />
                <div className="flex justify-end mt-1">
                <Button
                    type='button'
                    className="bg-blue-400 hover:bg-blue-500 text-white text-xs py-1 h-2/3 self-start "
                    size="sm"
                    disabled={pending}
                    onClick={()=> {void addReplyAction()}}
                >
                    Reply
                </Button>
                </div>
            </form>}
            {replies && replies.length > 0 && (
            <div className="ml-6 mt-0 space-y-3">
            {replies?.map((reply) => (
                <div key={reply.id} className="flex gap-2 dark:border-1 dark:border-xtraDark/70 rounded-md">
                <div className="flex-1">
                    <div className="bg-gray-100/60 dark:bg-xtraDarkPrimary dark:text-xtraDarkText p-2 rounded-lg">
                    <div className="flex justify-between">
                        <Link
                        href={`/profile/${reply.users?.name}`}
                        className="font-semibold opacity-60 text-xs hover:underline"
                        >
                        {reply.users?.name}
                        </Link>
                        {/* <span className="text-[#4a4a4a] text-[9px]">{reply.timestamp}</span> */}
                    </div>
                    <p className="text-xs mt-1 ">{reply.content}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
            )}
        </div>
    )
}
