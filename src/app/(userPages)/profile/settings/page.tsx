import Settings from "~/components/ui/settings/sidebar"
import { getUserProfile } from "~/lib/actions/userActions"
export default async function SettingsPage() {
  const data  = await getUserProfile(["name","image","email"]) as {name:string,image:string,email:string}
  
  return (
    <Settings data = {data}/>
  )
}
