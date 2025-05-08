
import { date } from "drizzle-orm/mysql-core";
import Post from "~/components/ui/neopost/post";
import { getPosts, getUserLikes } from "~/lib/data";
import { timeAgo } from "~/lib/utils";


type Props = {
    UUID:string,
    userName:string
}

export default async function PreloadPosts({UUID,userName}: Props) {
    const posts = await getPosts();
    const likes = await getUserLikes(UUID)
  return (
    <>
    {posts?.map((post)=> <Post sharedWorkout={post?.sharedWorkout} shares={post?.shares} sharedPost={post?.sharedPost} appUser={userName} time={post?.createdAt ?  timeAgo(post?.createdAt) : "" } media = {post?.resources} likes={post?.likes} key={post?.id} id={post?.id} userImage={post.users.image ?? ""} liked={likes?.includes(post?.id)} userName={post?.users.name ?? ""} userId={post.userId ?? "undefined"} postContent={post?.content} comments={post?.comments} />)}        
    </>
  )
}