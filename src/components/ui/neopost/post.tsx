"use client"
import { Ellipsis, ThumbsUp, X } from 'lucide-react'
import React, { useState } from 'react'
import Avatar from '~/components/component/Avatar'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Label } from '../label'
import Link from 'next/link'
import { Textarea } from '../textarea'
import { Button } from '../button'
import Comments from './comments'
import DisplayImages from './displayImages'
import { toast } from 'sonner'
import { getSharedPost, sharePostAction } from '~/lib/actions/socialActions'
import { likePost } from '~/lib/actions/userInteractions'
import { WorkoutCard } from '../neoworkout/workout-card'
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
  userId:string,
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
  appUser:string
  sharedPost?:{
    id: number,
    userId: string,
    content: string,
    resources: string[],
    users: {
        name: string | null,
        image: string | null,
    }
  }|undefined
  sharedWorkout?: {
    exercices: {
        mg: string;
        exerciseCount: number;
    }[];
    id: number;
    name: string;
    userId: string | null;
    username: string | null | undefined;
    description: string;
    numberOfDays: number | null;
    dayNames: string[];
    upvotes: number;
} | null | undefined

}
export default function Post({sharedPost,userImage,userName,userId,postContent,media,likes,liked,id,comments,time,appUser,shares,sharedWorkout}: Props) {
  const [likesCount, setLikesCount] = useState(likes)
  const [isLiked, setIsLiked] = useState(!!liked)
  const [showComments, setShowComments] = useState(false)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [shareText, setShareText] = useState('')
  

  
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

  const handleShare = () => {
    setShowSharePopup(true)
  }

  const closeSharePopup = () => {
    setShowSharePopup(false)
    setShareText('')
  }

  const submitShare = async () => {
    try {
      // Here you would call your API to share the post
      // For example: await sharePost(id, shareText)
      const response = await sharePostAction(id,shareText,userId)
      
      // Close the popup after sharing
      closeSharePopup()
      if(response)
      return(
        toast("Post shared successfulyy")
      )
      else return toast("Failed to share post")
      
      // You might want to show a success message or update UI
    } catch (error) {
      console.error("Failed to share post", error)
    }
  }
  
  return (
    <div className={ `p-5 mt-4 space-y-4 bg-xtraContainer rounded-md shadow-md` }>
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
        
        {/* Shared Post Content */}
        {sharedPost && (
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3 mb-2">
              {sharedPost.users.image && (
                <Avatar image={sharedPost.users.image} />
              )}
              <div>
                <h2 className="text-sm font-medium hover:underline">
                  <Link href={`/profile/${sharedPost.userId}`}>
                    {sharedPost.users.name}
                  </Link>
                </h2>
              </div>
            </div>
            <p className="text-sm mb-3">{sharedPost.content}</p>
            {sharedPost.resources && sharedPost.resources.length > 0 && (
              <DisplayImages media={sharedPost.resources} />
            )}
          </div>
        )}
        {/* Shared Workout Content */}
        {sharedWorkout && (
          <WorkoutCard workout={sharedWorkout} />
        )}  
        {/* Original post media */}
        {media && media.length > 0 && <DisplayImages media={media} />}
        <div className=' flex justify-between items-center '>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <div onClick={handleLike} className={'flex gap-2 items-center cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110'}>
            <FontAwesomeIcon width={20} color={isLiked ? '#93c5fd ':'#a4a4a4'} icon={faThumbsUp} />
            <span className={isLiked ? 'text-blue-300 text-sm' : 'text-[#a4a4a4] text-sm'} >Like</span>
            <Label style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none text-[#4a4a4a] border-black border-1 px-3 py-1">{likesCount}</Label>
            </div>
          <div className='flex gap-2 items-center'>
          <div className='cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 space-x-1' onClick={toggleComments}>
          <FontAwesomeIcon  width={20} color='#a4a4a4' icon={faCommentDots}  />
          <span className='text-[#a4a4a4] text-sm' >Comment</span>
          </div>
          <div className='cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 space-x-1' onClick={handleShare}>
          <FontAwesomeIcon width={20} color='#a4a4a4' icon={faPaperPlane} className='ml-3' />
          <span className='text-[#a4a4a4] text-sm'>Share</span>
          <Label style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none text-[#4a4a4a] border-black border-1 px-3 py-1">{shares}</Label>
          </div>
          </div>
        </div>
        {showComments && <Comments appUser={appUser} postID={id} comments={comments ?? [] as Comment[]} user={userName}/>}
        
        {/* Share Popup */}
        {showSharePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
              <button 
                onClick={closeSharePopup}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-lg font-semibold mb-4">Share this post</h3>
              
              {/* Original post preview */}
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar image={userImage} />
                  <span className="font-medium">{userName}</span>
                </div>
                <p className="text-sm">{postContent}</p>
                {media && media.length > 0 && (
                  <div className="mt-2 h-32 overflow-hidden">
                    {media[0] && <Image 
                      src={media[0]} 
                      alt="Post media" 
                      width={100} 
                      height={100} 
                      className="object-cover rounded"
                    />}
                    {media.length > 1 && (
                      <span className="text-xs text-gray-500">+{media.length - 1} more</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Share text input */}
              <Textarea
                placeholder="Add your thoughts..."
                value={shareText}
                onChange={(e) => setShareText(e.target.value)}
                className="w-full mb-4"
              />
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={closeSharePopup}>Cancel</Button>
                <Button onClick={() => void submitShare()}>Share Post</Button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}