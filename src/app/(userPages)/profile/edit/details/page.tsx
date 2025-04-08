import { auth } from 'auth'
import Avatar from '~/components/component/Avatar'
import { Input } from '~/components/ui/input'
import Image from 'next/image'
import { Label } from '~/components/ui/label'
import EditProfile from '~/components/ui/form/editProfile'
import { fetchFullUser } from '~/lib/actions'

type Props = {}

async function page({}: Props) {
  const myUser = await fetchFullUser()
  if(!myUser) return null
  return (
    <EditProfile user ={myUser} />
  )
}

export default page