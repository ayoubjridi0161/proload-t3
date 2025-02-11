import React from 'react'
import "./postCard.css"
import Comments from '~/components/component/Comments';
import { ReplyIcon, HeartIcon } from 'lucide-react';
import { Button } from '../button';
import { Textarea } from '../textarea';
import { Tooltip, TooltipProvider } from '../tooltip';
import TooltipBox from '~/components/component/tooltipV0';
import { Downvote, Upvote } from '~/components/component/Reactions';
import { Avatar,AvatarFallback,AvatarImage } from '../avatar';

interface PostCardProps {
  title: string;
  author: string;
  description: string;
  publishDate: string;
  readingTime: string;
  userImage: string | null;
}

const PostCard: React.FC<PostCardProps> = ({ title, author, description, publishDate, readingTime,userImage }) => {
  return (
    <>
    <div className="card">
      <div className="header">
        <div>
          <a className="title" href="#">
            {title}
          </a>
          <p className="name">By {author}</p>
        </div>
        <span className="image">
          <Avatar>
            <AvatarFallback>
              {author.slice(0, 2).toUpperCase()}
            </AvatarFallback>
            {userImage &&
            <AvatarImage src={userImage} />}
          </Avatar>
        </span>
      </div>
      <p className="description">{description}</p>
      <div className='flex justify-between items-center'>
        <dl className="post-info">
        <div className="cr">
        <dd className="dd">{publishDate}</dd>
          <dt className="dt">Published</dt>
          
        </div>
        <div className="cr">
        <dd className="dd">{readingTime}</dd>

          <dt className="dt">Reading time</dt>
        </div>
        </dl>
        <div>
        <TooltipProvider>
          <Upvote EUR={false} pressed={false} workoutId={25} />
          <Downvote EUR={false} pressed={false} workoutId={25} />
        </TooltipProvider>
        </div>
      </div>
      
      
    </div>
    </>
  )
}

export default PostCard
