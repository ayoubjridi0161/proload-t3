import PublicProfile from "~/components/ui/neoprofile/publicProfile";
import type { publicUser } from "~/lib/types";
import {getUserByID} from '~/lib/data'
export default async function page({params}:{params:{id:string}}) {
    const userInfo : publicUser = await getUserByID(params.id) as publicUser
  return (
    <div className="w-[70%] mx-auto">
       {userInfo ? <PublicProfile user = {userInfo}/> : <div>user Not found</div>}
    </div>
  )
}