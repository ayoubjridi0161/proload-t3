import { auth } from "auth";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select"
// import { updateProfileAction } from "~/lib/actions";
import { image } from "@nextui-org/theme";

export default async  function page() {
  const session = await auth();
  const userInfo = session?.user;
  return (
    <form action={updateProfileAction} className=" mt-5 w-full max-w-4xl mx-auto p-6 md:p-8 lg:p-10 bg-background rounded-lg shadow-lg">
      <input type="hidden" name="oldData" value={JSON.stringify({
        name:userInfo?.name,
        image:userInfo?.image
        })} />
      <div className="grid gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-primary">
              {userInfo?.image&& <AvatarImage src={userInfo.image} alt="User Avatar" />}
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="secondary" size="sm" className="absolute bottom-0 right-0 -translate-x-2 translate-y-2">
              <UploadIcon className="w-4 h-4" />
              <span className="sr-only">Upload new profile picture</span>
            </Button>
          </div>
          <div className="grid gap-2 w-full">
            <div className="grid gap-1">
              <Label htmlFor="username" className="text-slate-300" >Username</Label>
              <Input id="username" required defaultValue={userInfo?.name || ""} placeholder="ex: John Doe
              " className="w-full " />
            </div>
            <div className="grid gap-1">
            
              <Label className="text-slate-300" htmlFor="email">Email</Label>
              {userInfo?.email&& <Input id="email" defaultValue={userInfo.email} disabled className="w-full text-black/50" />}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="text-slate-300" htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="ex: I'm a passionate athlete and coach. I love helping others reach their fitness goals."
              className="min-h-[120px] w-full"
            />
          </div>
          
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </div>
    </form>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}