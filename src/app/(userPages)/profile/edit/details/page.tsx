import { auth } from 'auth'
import Avatar from '~/components/component/Avatar'
import { Input } from '~/components/ui/input'
import Image from 'next/image'
import { Label } from '~/components/ui/label'
import EditProfile from '~/components/ui/form/editProfile'

type Props = {}

async function page({}: Props) {
  const session = await auth()
  if (!session) {
    throw new Error ("Not authenticated")
  }
  const { user } = session
  const myUser = {id: user?.id ?? "", name: user?.name ?? null , email: user?.email?? "", image: user?.image ?? "undefined"}
  return (
    <EditProfile user ={myUser} />
  )
}

export default page