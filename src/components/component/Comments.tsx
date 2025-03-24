"use client"
import { Label } from '@radix-ui/react-label'
import { ReplyIcon, HeartIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import Link from 'next/link'
import { addComment, addReply } from '~/lib/actions'
import { getSession } from 'next-auth/react'
  type Comment = {
    createdAt?:Date
    content: string;
    id: number;
    replys?: Comment[];
    users: {
      name: string | null;
    } | null;
  };
  type Props = {
    comments: Comment[]
    liked:boolean
    likes:number
    workoutID:number
  }
  

    export default function Comments({workoutID,comments,liked,likes}:Props) {
        // const [likesCount, setLikesCount] = useState(likes)
        // const [isLiked, setIsLiked] = useState(!!liked)
      
        const [showComments, setShowComments] = useState(false)
        const [commentText, setCommentText] = useState("")
        const [Comments, setComments] = useState(comments)
        const [replyingTo, setReplyingTo] = useState<number | null>(null)
        const [replyText, setReplyText] = useState("")

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
                await addReply(parentId,newComment.content)
                console.log(Comments)
                setReplyText("")
                setReplyingTo(null)
              } else {
                // Add new top-level comment
                setComments([newComment, ...(comments ?? [])])
                setCommentText("")
                await addComment(workoutID,newComment.content)
              }
            }
          }

          
        return (
          
            <div className="mt-4 space-y-4 pt-4">
              <div className="flex gap-2">
                  <Textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="min-h-[60px] resize-none"
                  />
                    <Button
                      onClick={() => { void handleAddComment() }}
                      className="text-white"
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
                                  onClick={() => void handleAddComment(comment.id)}
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
          
        )
      }  