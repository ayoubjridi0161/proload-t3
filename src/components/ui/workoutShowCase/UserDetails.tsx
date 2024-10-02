import { getUserByID } from "~/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "../avatar"

const UserDetails = async ({userID}:{userID:string|null}) => {
  if(!userID) return null
  const userDetails = await getUserByID(userID)
  return (
    <div className="flex items-center gap-5">
      <Avatar>
        <AvatarFallback>
          {userDetails?.name?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
        {userDetails?.image &&
        <AvatarImage src={userDetails?.image} />
        }
      </Avatar>
        <div>       
            <p className="text-lg font-semibold">{userDetails?.name}</p>
            <p className="text-sm text-gray-500">
                2 days agos
            </p>
        </div>
    </div>
)
}

export default UserDetails