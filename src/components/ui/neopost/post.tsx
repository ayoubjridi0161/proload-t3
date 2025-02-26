import { Ellipsis, ThumbsUp } from 'lucide-react'
import React from 'react'
import Avatar from '~/components/component/Avatar'
import { roboto } from '../font'
import {Comment} from '~/components/component/Reactions'
import Image from 'next/image'
import { TooltipProvider } from '../tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Label } from '../label'
type Props = {userImage:string
  userName:string,
  userId:number |string,
  title:string,
  postContent:string,
  images?:string[],
  likes?:number,
  comments?:number,
  shares?:number,
  time?:string
}

export default function Post({userImage,userName,userId,title,postContent}: Props) {
  return (
    <div className={ `p-5 shadow-bottom mt-4 space-y-4 ` }>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'><Avatar image={userImage} />
            <div >
                <h1 className={`text-md `}>{title}</h1>
                <p className='text-[#4a4a4a] text-[11px]'>{/*time */}20 min. ago</p>
            </div></div>
            <Ellipsis className=''/>
        </div>
        <p>{postContent}</p>
        
        <div className='grid grid-cols-2 gap-5 w-full'>
          
        {/* <Image src={'/gym.jpg'} width={293} className='w-full' height={200} alt='hello'/> */}
        {/* <Image src={'/bigGym.jpg'} width={293} className='w-full' height={200} alt='hello'/> */}
        </div>
        <div className=' flex justify-between items-center '>
          <div className='flex gap-2 items-center'>
          <FontAwesomeIcon width={30} color='#a4a4a4' icon={faThumbsUp} />
          <span className='text-[#a4a4a4]' >Like</span>
          <Label style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none text-[#4a4a4a] border-black border-1 px-3 py-1">18</Label>
          </div>
          <div className='flex gap-2 items-center'>
          <FontAwesomeIcon  width={30} color='#a4a4a4' icon={faCommentDots}  />
          <span className='text-[#a4a4a4]' >Comment</span>
          <Label style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none text-[#4a4a4a] border-black border-1 px-3 py-1">18</Label>
          <FontAwesomeIcon width={30} color='#a4a4a4' icon={faPaperPlane} className='ml-3' />
          <span className='text-[#a4a4a4]' >Share</span>
          <Label style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} className="rounded-none text-[#4a4a4a] border-black border-1 px-3 py-1">18</Label>


          </div>
        </div>
    </div>
  )
}