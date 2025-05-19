"use client"
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';  // Fixed import path
import { getPosts } from '~/lib/data';
import {type Post as postType} from '~/lib/types'
import Post from '~/components/ui/neopost/post';
import PostSkeleton from '~/components/skeletons/postSkeleton';
type Props = {
    UUID: string,
    userName: string
}
export function InfiniteScrollPosts({ UUID, userName }: Props) {
  const { ref, inView } = useInView();
  const fetchPosts = async ({ pageParam = 1 })=> {
    const res = await fetch(`/api/posts?page=${pageParam}`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json() ;
  };
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<{ posts: postType[], nextPage: number | null }>({
    queryKey: ['posts'],
    queryFn: (context) => fetchPosts({ pageParam: context.pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: { posts: postType[]; nextPage: number | null }) => lastPage.nextPage,
  });
  

  if (inView && hasNextPage) {
    void fetchNextPage();
  }

  return (
    <div className="space-y-4">
      {data?.pages?.map((page) => (
        page.posts.map((post ) => (
            <Post key={post?.id} sharedPost={post.sharedPost} sharedWorkout={post.sharedWorkout} comments={post.comments}  appUser={UUID} postContent={post.content} userImage={post.users.image ?? ""} userName={post.users.name ?? ""} id={post.id} likes={post.likes}  userId={post.userId} />
        ))
      ))}
      
      {isFetchingNextPage && (
        <PostSkeleton  />
      )}
      
      <div ref={ref} className="h-1" />
      
      {status === 'error' && (
        <div className="text-red-500">Error: {error.message}</div>
      )}
      
      {!hasNextPage  && (
        <p className="text-center text-gray-500">No more posts to load</p>
      )}
      

    </div>
  );
}