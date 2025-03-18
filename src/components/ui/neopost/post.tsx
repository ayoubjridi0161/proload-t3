"use client"
import { Ellipsis, ThumbsUp } from 'lucide-react'
import {getSession} from "next-auth/react"
import React, { useState } from 'react'
import Avatar from '~/components/component/Avatar'
import { roboto } from '../font'
import Image from 'next/image'
import { TooltipProvider } from '../tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Label } from '../label'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Link from 'next/link'
import { cn } from '~/lib/utils'
import { addComment, addReply, likePost } from '~/lib/actions'
import { Textarea } from '../textarea'
import { Button } from '../button'
type Comment = {
  content: string;
  id: number;
  replys?: Comment[];
  users: {
    name: string | null;
  } | null;
};


type Props = {
  userImage:string
  userName:string,
  userId:number |string,
  title:string,
  postContent:string,
  images?:string[],
  likes:number,
  comments?:Comment[],
  shares?:number,
  time?:string,
  media?:string[]
  liked?:boolean,
  id:number
}
const sampleComments = [
  {
    id: "1",
    userId: "user123",
    userName: "Jane Smith",
    content: "Great post! Thanks for sharing this.",
    timestamp: "5 min ago",
    replies: [
      {
        id: "1-1",
        userId: "user456",
        userName: "John Doe",
        content: "I agree with Jane, this is really insightful!",
        timestamp: "3 min ago",
      },
    ],
  },
  {
    id: "2",
    userId: "user456",
    userName: "John Doe",
    content: "I completely agree with your points!",
    timestamp: "12 min ago",
    replies: [],
  },
]
export default function Post({userImage,userName,userId,postContent,media,likes,liked,id,comments,time}: Props) {
  const [likesCount, setLikesCount] = useState(likes)
  const [isLiked, setIsLiked] = useState(!!liked)

  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [Comments, setComments] = useState(comments)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleLike = async () => {
    try {
      const response = await likePost(id)
      console.log(response)
      if (response && !isLiked) {
        setLikesCount(likesCount + 1)
        setIsLiked(true)
      } else {
        setLikesCount(likesCount - 1)
        setIsLiked(false)
      }
    } catch (error) {
      console.error("Failed to like/unlike post", error)
    }
  }

  const toggleComments = () => {
    setShowComments(prev => !prev)
  }

  const handleAddComment = async (parentId?: number) => {
    const session = await getSession()
    if(!session?.user) return 
    const user = session.user

    const commentContent = parentId ? replyText : commentText

    if (commentContent.trim()) {
      const newComment : Comment= {
        id:Math.random()*250,
        content: commentContent,
        users:{name:user.name ?? null},
        replys:[]

        
      }
      console.log(newComment)

      if (parentId) {
        // Add reply to the parent comment
        // setComments(
        //   comments?.map((comment) => {
        //     if (comment.id === parentId) {
        //       return {
        //         ...comment,
        //         replies: [...(comment.replys ?? []), newComment],
        //       }
        //     }
        //     return comment
        //   }),
        // )
        await addReply(parentId,newComment.content)
        console.log(Comments)
        setReplyText("")
        setReplyingTo(null)
      } else {
        // Add new top-level comment
        setComments([newComment, ...(comments ?? [])])
        setCommentText("")
        await addComment(id,newComment.content)
      }
    }
  }
  return (
    <div className={ `p-5 mt-4 space-y-4 bg-white/70` }>
        <div className='flex items-center justify-between'>
            <Link href={`/profile/${userId}`} className='flex items-center gap-3'>
            <Avatar image={userImage} />
            <div >
                <h1 className={`text-md hover:underline`}>{userName}</h1>
                <p className='text-[#4a4a4a] text-[11px]'>{time}</p>
            </div>
            </Link>
            <Ellipsis className=''/>
        </div>
        <p>{postContent}</p>
        
        {/* <div className='grid grid-cols-2  gap-5 w-full'> */}
        {media?.map((src,index) => (
          <div key={index} className='relative w-full h-64'>
            <Image src={src} alt={`media-${index}`} layout='fill' objectFit='cover' />
          </div>
        ))}
        {/* </div> */}
        <div className=' flex justify-between items-center '>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <div onClick={handleLike} className={'flex gap-2 items-center cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110'}>
            <FontAwesomeIcon width={20} color={isLiked ? '#93c5fd ':'#a4a4a4'} icon={faThumbsUp} />
            <span className={isLiked ? 'text-blue-300 text-sm' : 'text-[#a4a4a4] text-sm'} >Like</span>
            <Label style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none text-[#4a4a4a] border-black border-1 px-3 py-1">{likesCount}</Label>
            </div>
          <div className='flex gap-2 items-center'>
            <div className='cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 ' onClick={toggleComments}>
          <FontAwesomeIcon  width={20} color='#a4a4a4' icon={faCommentDots}  />
          <span className='text-[#a4a4a4] text-sm' >Comment</span>
          </div>
          <div className='cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105'>
          <FontAwesomeIcon width={20} color='#a4a4a4' icon={faPaperPlane} className='ml-3' />
          <span className='text-[#a4a4a4] text-sm'>Share</span>
          <Label style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none text-[#4a4a4a] border-black border-1 px-3 py-1">18</Label>
          </div>

          </div>
        </div>
        {/* Comment Section */}
      {showComments && (
        <div className="mt-4 space-y-4 border-t pt-4">
          <div className="flex gap-2">
            
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[60px] resize-none"
              />
                <Button
                  onClick={() => { handleAddComment() }}
                  className="bg-blue-400 hover:bg-blue-500 text-white"
                  disabled={!commentText.trim()}
                >
                  Post
                </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {Comments?.map((comment) => (
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
                  <div className="flex gap-4 mt-1 ml-2">
                    <Button variant={"ghost"} size="sm" className="text-xs text-[#4a4a4a] hover:text-blue-400">Like</Button>
                    <Button variant={"ghost"} size="sm" className="text-xs text-[#4a4a4a] hover:text-blue-400"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}>
                      {replyingTo === comment.id ? "Cancel" : "Reply"}
                    </Button>
                  </div>
                {/* Reply Form */}
                {replyingTo === comment.id && (
                      <div className="flex gap-2 mt-2">
                        <div className="flex-1">
                          <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${comment.users?.name}...`}
                            className="min-h-[40px] resize-none text-sm"
                          />
                          <div className="flex justify-end mt-1">
                            <Button
                              onClick={() => handleAddComment(comment.id)}
                              className="bg-blue-400 hover:bg-blue-500 text-white text-xs py-1 h-auto"
                              disabled={!replyText.trim()}
                              size="sm"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Nested Replies */}
                    {comment.replys && comment.replys.length > 0 && (
                      <div className="ml-6 mt-2 space-y-3">
                        {comment?.replys?.map((reply) => (
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
                              <div className="flex gap-4 mt-1 ml-2">
                                <button className="text-[10px] text-[#4a4a4a] hover:text-blue-400">Like</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}