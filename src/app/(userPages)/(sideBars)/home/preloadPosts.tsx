"use server"
import PostSkeleton from '~/components/skeletons/postSkeleton';
import Post from '~/components/ui/neopost/post';
import { getPosts, getUserLikes } from '~/lib/data';
import { timeAgo } from '~/lib/utils';

type Props = {
    UUID: string,
    userName: string
}

export default async function PreloadPosts({ UUID, userName }: Props) {
    const posts = await getPosts()
    return (
        <>
            {posts?.posts.map((post) => (
                <Post key={post?.id} shares={post.shares} sharedWorkout={post.sharedWorkout} comments={post.comments} media={post.resources} sharedPost={post.sharedPost} time={timeAgo(post.createdAt ?? new Date())}  appUser={UUID} postContent={post.content} userImage={post.users.image ?? ""} userName={post.users.name ?? ""} id={post.id} likes={post.likes}  userId={post.userId} />
            ))}
        </>
    );
}