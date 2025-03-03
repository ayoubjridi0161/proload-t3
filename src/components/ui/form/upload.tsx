"use client"
import { useFormState, useFormStatus } from "react-dom"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { uploadFiles } from "~/lib/actions"

type Props = {}
export default function Upload({}: Props) {
const initialState =  {message:"none"}

    const [state,formAction] = useFormState(uploadFiles,initialState)
    return (
    <div>
        <form className="w-1/2 mx-auto space-y-5 mt-5" action={formAction}>
        <Label>AWS S3 BUCKET</Label>
            <Input type="file" id="file" name="file" accept="images/*" />
            <UploadButton />
        </form>
    </div>
  )
} 

const UploadButton = ()=>{
    const {pending} = useFormStatus()
    return(
    <Button aria-disabled={pending} className={""} type="submit">{!pending ? "upload file" : "uploading..." }</Button>
)
}