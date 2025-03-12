import { auth } from "auth";
import Profile from "~/components/ui/neoprofile/profile";
import type { publicUser } from "~/lib/types";
export default async function page() {
  const session = await auth();
  const user: publicUser = session?.user as publicUser;
  
  return (
    <div className=" mx-auto">
        <Profile user = {user}/>
    </div>
  )
}