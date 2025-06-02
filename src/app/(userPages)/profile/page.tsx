import { auth } from "auth";
import { Suspense } from "react";
import ProfileSkeleton from "~/components/skeletons/profileSkeleton";
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
  const user = await getUserByID(publicUserID ?? session?.user?.id ?? "") as publicUser
  if(!user){
    return <div>User not found</div>
  }
  return (
    <div className="flex justify-center">
      <Suspense fallback={<ProfileSkeleton/>}>
        <Profile user = {user} isPublic={!!publicUserID}/>
        </Suspense>
    </div>
  )
}