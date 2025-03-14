"use client"
import { Ellipsis, ThumbsUp } from 'lucide-react'
import React, { useState } from 'react'
import Avatar from '~/components/component/Avatar'
import { roboto } from '../font'
import {Comment} from '~/components/component/Reactions'
import Image from 'next/image'
import { TooltipProvider } from '../tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Label } from '../label'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Link from 'next/link'
import { cn } from '~/lib/utils'
import { likePost } from '~/lib/actions'
type Props = {
  userImage:string
  userName:string,
  userId:number |string,
  title:string,
  postContent:string,
  images?:string[],
  likes:number,
  comments?:number,
  shares?:number,
  time?:string,
  media?:string[]
  liked?:boolean,
  id:number
}

export default function Post({userImage,userName,userId,postContent,media,likes,liked,id}: Props) {
  const [likesCount, setLikesCount] = useState(likes)
  const [isLiked, setIsLiked] = useState(!!liked)
  

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
  return (
    <div className={ `p-5 mt-4 space-y-4 bg-white/70` }>
        <div className='flex items-center justify-between'>
            <Link href={`/profile/${userId}`} className='flex items-center gap-3'>
            <Avatar image={userImage} />
            <div >
                <h1 className={`text-md hover:underline`}>{userName}</h1>
                <p className='text-[#4a4a4a] text-[11px]'>{/*time */}20 min. ago</p>
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
            <div className='cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105'>
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
    </div>
  )
}