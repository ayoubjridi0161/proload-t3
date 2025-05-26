import { auth } from "auth";
import Profile from "~/components/ui/neoprofile/profile";
import { getUserByID } from "~/lib/data";
import type { publicUser } from "~/lib/types";
export default async function page(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const publicUserID = searchParams?.id;
  const session = await auth();
  let user : publicUser ;
  if (publicUserID) {
    user = await getUserByID(publicUserID) as publicUser;
    if(!user) {
      return (<div>User not found</div> )
    }
  } else {
    if (!session?.user?.id) throw new Error("no user found");
    user = session?.user as publicUser;
  }
  return (
    <div className="flex justify-center">
        <Profile user = {user} isPublic={!!publicUserID}/>
    </div>
  )
}