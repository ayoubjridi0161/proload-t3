"use client"
import { useFormState, useFormStatus } from "react-dom"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { uploadFiles } from "~/lib/actions"
import Image from 'next/image'

type Props = {}
export default function Upload({}: Props) {
    const initialState =  {message:""}
    const [state, formAction] = useFormState(uploadFiles, initialState)
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    console.log(state.message)
    return (
        <div>
            <form className="w-1/2 mx-auto space-y-5 mt-5" action={formAction}>
                <Label>AWS S3 BUCKET</Label>
                <Input type="file" id="file" name="file" accept="images/*" className="bg-slate-100" onChange={handleFileChange} />
                {preview && (
                <div className="mt-5">
                    <Label>Preview</Label>
                    <Image src={preview} alt="Preview" width={200} height={200} />
                </div>
                )}
                
                <UploadButton />
                
            </form>
            {state.message && <Image src={state.message} alt="nothing" width={50} height={50} />}
            
        </div>
    )
} 

const UploadButton = ()=>{
    const {pending} = useFormStatus()
    return(
        <Button aria-disabled={pending} className={""} type="submit">{!pending ? "upload file" : "uploading..." }</Button>
    )
}