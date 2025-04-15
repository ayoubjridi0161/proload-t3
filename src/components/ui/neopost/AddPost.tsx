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
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setSelectedImages(prev => [...prev, ...newImages])
    }
  }

  const handleShare = async () => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Handle multiple images
      for (const imageUrl of selectedImages) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `image-${Date.now()}.jpg`, { type: blob.type });
        formData.append("files", file);
      }
      
      formData.append("text", postText);

      const res = await addPostAction(formData);
      console.log(res);
      setOpen(false);
      setPostText("");
      setSelectedImages([]);
    } catch (error) {
      console.error("Error sharing post:", error)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="w-full bg-xtraContainer rounded-md shadow-md p-3" >
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
            className="rounded-none border-black border-1 bg-white px-6 py-0 text-sm text-[#353434] font-light"
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
          </div>
            <Textarea
              placeholder="What's on your mind athlete"
              className="min-h-[120px] resize-none"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              name="text"
            />
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={img}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-auto max-h-[200px] object-contain rounded-md"
                      width={500}
                      height={200}
                    />
                    <button
                      onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                      className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 text-[#b4b4b4] hover:text-primary">
                  <FontAwesomeIcon icon={faImage} width={20} />
                  <span>Add Image</span>
                </div>
              </Label>
              <Input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                multiple
                className="hidden" 
                name="file" 
                onChange={handleImageUpload} 
              />

              <Label className="cursor-pointer">
                <div className="flex items-center gap-2 text-[#b4b4b4] hover:text-primary">
                  <MapPin size={20} />
                  <span>Add Location</span>
                </div>
              </Label>
            </div>
          <DialogFooter>
            <Button
            type="submit"
              onClick={() => void handleShare()}
              disabled={isSubmitting}
              style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
              className="rounded-none bg-white border-black border-1 px-6 py-0 text-sm text-[#353434] font-light"
            >
              {isSubmitting ? "SHARING..." : "SHARE"}
            </Button>
          </DialogFooter>
          {/* </form> */}
        </DialogContent>
      </Dialog>
    </>
  )
}



