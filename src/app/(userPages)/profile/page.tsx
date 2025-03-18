import { auth } from "auth";
import Profile from "~/components/ui/neoprofile/profile";
import {  getUserLikes, getUserPosts } from "~/lib/data";
import type { publicUser } from "~/lib/types";
export default async function page() {
  const session = await auth();
  const user: publicUser = session?.user as publicUser;
  if(!user.id) throw new Error("no user found")
  
  return (
    <div className=" mx-auto">
        <Profile user = {user}/>
    </div>
  )
}