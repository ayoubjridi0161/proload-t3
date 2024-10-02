import { revalidatePath } from "next/cache";
import { promises as fs } from 'fs';
import path from 'path';
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { createPost, getPosts } from "~/lib/data";
import { auth } from "auth";
import TweetCard from "~/components/ui/Posts/TweetCard";
import PostCard from "~/components/ui/Posts/PostCard";
import { redirect } from "next/navigation";

// This interface defines the structure of a post
interface Post {
  id: number;
  title: string;
  content: string;
}


// Server Action to create a new post
async function serverCreatePost(formData: FormData) {
  "use server";
  const session = await auth();
  if(!session?.user?.id) return "failed due to absense of session";
  
  const pTitle = formData.get("title") as string;
  const pContent = formData.get("content") as string;
    const result = await createPost({ title:pTitle, content:pContent, userId: session.user?.id });    
    console.log(result);
    revalidatePath("/posts");
  }
  



export default async function PostManager() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts: </h1>
      
      <form action={serverCreatePost} className="mb-8 space-y-4">
        <Input type="text" name="title" placeholder="Post Title" required />
        <Textarea name="content" placeholder="Post Content" required />
        <Button type="submit">Create Post</Button>
      </form>
      
      <div className="space-y-4 ">
        <div className=" gap-3">
        {posts.map((post,index) => (
          // <div key={post.id} className="border-2 shadow-md p-4 rounded-md ">
          //   <h5>{post.users.username}</h5>
          //   <h3 className="text-lg font-semibold">{post.title}</h3>
          //   <p className="mt-2">{post.content}</p>
          // </div>
          <PostCard userImage={post.users.image} author={post.users.name ||"unknown"} description={post.content} publishDate="2 sep 2003" title={post.title} readingTime="3mn"  key={index}  />
        ))}
        </div>
      </div>
    </div>
  );
}
