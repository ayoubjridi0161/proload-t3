"use client"

import type React from "react"

import { useActionState, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { Paperclip, MapPin, Smile } from "lucide-react"
import { Button } from "~/components/ui/button"
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Textarea } from "~/components/ui/textarea"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { addPostAction, uploadFiles, uploadToS3 } from "~/lib/actions"
import { useFormState } from "react-dom"
import { Avatar } from "../avatar"

interface Props {
  image?: string
}

export default function AddPost({ image }: Props) {
  const [open, setOpen] = useState(false)
  const [postText, setPostText] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  // const [state, action] = useFormState(uploadFiles, { status: "pending", message: "", url: "", text: "" })
  // console.log(state.message)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const handleShare = async () => {
    try {
      const response = await fetch(selectedImage ?? "");
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", postText);

      const res = await addPostAction(formData);
      console.log(res);
    } catch (error) {
      console.error("Error sharing post:", error)
    }
    setOpen(false)
    setPostText("")
    setSelectedImage(null)
  }

  return (
    <>
      <div className="w-full bg-white/70 p-3" >
        <div className="flex gap-2 w-full p-2">
          <Avatar >
            <Image src={image ?? ""} alt="user" width={40} height={40} />
          </Avatar>
          <input
          onClick={() => setOpen(true)}
            className="bg-zinc-200 text-zinc-600 font-mono ring-1 
            ring-zinc-800 focus:ring-2 focus:ring-rose-400 outline-none 
            duration-300 placeholder:text-zinc-600 placeholder:opacity-50 px-4 py-1 
            shadow-md focus:shadow-lg focus:shadow-rose-400 w-full"
            autoComplete="off"
            placeholder="What's on your mind athlete"
            name="text"
            type="text"
            readOnly
          />
        </div>
        <div className="flex justify-between items-center p-2">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faImage} width={24} className="text-[#b4b4b4]" />
            <Paperclip size={24} className="text-[#b4b4b4]" />
            <MapPin size={24} className="text-[#b4b4b4]" />
            <Smile size={24} className="text-[#b4b4b4]" />
          </div>
          <Button
          onClick={() => setOpen(true)}
            size={"sm"}
            variant={"ghost"}
            style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
            className="rounded-none border-black border-1 px-6 py-0 text-sm text-[#353434] font-light"
          >
            SHARE
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {/* <form action={action}> */}
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>Share what's on your mind with your followers</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="What's on your mind athlete"
              className="min-h-[120px] resize-none"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              name="text"
            />

            {selectedImage && (
              <div className="relative">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected"
                  className="w-full h-auto max-h-[200px] object-contain rounded-md"
                  width={500}
                  height={200}
                />
              </div>
            )}

            <div className="flex items-center gap-4">
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 text-[#b4b4b4] hover:text-primary">
                  <FontAwesomeIcon icon={faImage} width={20} />
                  <span>Add Image</span>
                </div>
              </Label>
              <Input id="image-upload" type="file" accept="image/*" className="hidden" name="file" onChange={handleImageUpload} />

              <Label className="cursor-pointer">
                <div className="flex items-center gap-2 text-[#b4b4b4] hover:text-primary">
                  <MapPin size={20} />
                  <span>Add Location</span>
                </div>
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
            type="submit"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleShare}
              style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
              className="rounded-none border-black border-1 px-6 py-0 text-sm text-[#353434] font-light"
            >
              SHARE
            </Button>
          </DialogFooter>
          {/* </form> */}
        </DialogContent>
      </Dialog>
    </>
  )
}



