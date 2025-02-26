"use client"
import {updateUserProfileAction} from "~/lib/actions"
import {Toaster} from "~/components/ui/sonner"
import { Input } from '~/components/ui/input'
import Image from 'next/image'
import { Label } from '~/components/ui/label'
import type {publicUser} from '~/lib/types'
import { Button } from "../button"
import { useFormState } from "react-dom"
import { toast } from "sonner"
const EditProfile = ({user}:{user:publicUser}) => {
      const [data, action ] =useFormState(updateUserProfileAction ,"null")
      console.log(data)
      // if(data?.message === "success") {
      //     // toast("Profile Updated")
      //     console.log("Profile Updated")
      // }
  return (
    
<form className='text-[#a4a4a4] font-bold space-y-8 w-2/5 mx-auto mt-5 mb-5' action={action}>
        <input type="hidden" value={user.id} name='userID' />
        <div className='flex gap-4'>
          <h2>Account details</h2>
        </div>

        <h1 className='text-xl font-bold'>Profile</h1>
        <div className='w-[15%]'>
        <Image src={user?.image || "https://s3.eu-north-1.amazonaws.com/proload.me/ProloadLogo.png"} alt="avatar" className='w-full rounded-full border-1 border-black' width={60} height={60} />
        </div>
        <div className='space-y-1 '>
            <Label className='' >username:</Label>
            <Input className='border-2 border-[#4a4a4a] shadow-sm text-black rounded-none bg-[#F0F0F0]' defaultValue={user.name || undefined} placeholder={user?.name || "Ex: Gerlok the destroyer"} name='username' required />
        </div>
        <div className='space-y-1 '>
            <Label>Email</Label>
            <Input className='border-2 border-[#4a4a4a] shadow-sm text-black rounded-none bg-[#E0E0E0]' value={user?.email || ""} name='email' disabled />
        </div>
        <div className='space-y-1 '>
            <Label>Phone number</Label>
            <Input className='border-2 border-[#4a4a4a] shadow-sm text-black rounded-none bg-[#F0F0F0]' placeholder='Ex; +1 253 22 11' name='phoneNumber' />
        </div>
        <div className='grid grid-cols-2 gap-x-4 gap-y-8'>
        <div>
          <Label className='' >Postal Code</Label>
          <Input className='border-2 border-[#4a4a4a] shadow-sm text-black rounded-none bg-[#F0F0F0]' placeholder='' name='postalcode'  />
          </div><div>
          <Label className='' >City</Label>
          <Input className='border-2 border-[#4a4a4a] shadow-sm text-black rounded-none bg-[#F0F0F0]' placeholder='' name='City'  />
          </div><div>
          <Label className='' >State</Label>
          <Input className='border-2 border-[#4a4a4a] shadow-sm text-black rounded-none bg-[#F0F0F0]' placeholder='' name='State'  />
          </div><div>
          <Label className='' >Country</Label>
          <Input className='border-2 border-[#4a4a4a] shadow-sm text-black rounded-none bg-[#F0F0F0]' placeholder='' name='Country'  />
          </div>

        </div>
        <div className="flex flex-row-reverse">
        <Button type="submit" className="bg-green-500 text-lg px-8 font-bold">Save</Button>
        </div>
    </form>  )
}

export default EditProfile