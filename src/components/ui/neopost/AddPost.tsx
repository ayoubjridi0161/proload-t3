"use client"

import type React from "react"

import { useActionState, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { Paperclip, MapPin, Smile,Dumbbell } from "lucide-react"
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
import { Avatar } from "../avatar"
import { addPostAction } from "~/lib/actions/socialActions"
import { WorkoutCard } from "../neoworkout/workout-card"


interface Props {
  image?: string
  awaitedWorkouts: {
    exercices: {
        mg: string;
        exerciseCount: number;
    }[];
    id: number;
    userId: string | null;
    name: string;
    username: string | null | undefined;
    description: string;
    numberOfDays: number | null;
    dayNames: string[];
    upvotes: number;
}[]
}

export default function AddPost({ image, awaitedWorkouts }: Props) {
  const [open, setOpen] = useState(false)
  const [postText, setPostText] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null)
  const [showWorkouts, setShowWorkouts] = useState(false)

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
      if (selectedWorkout) {
        formData.append("workoutId", selectedWorkout.toString());
      }

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
  useEffect(() => {
    if(!open){
      setSelectedWorkout(null)
    }
  },[open])

  return (
    <>
      <div className="w-full bg-xtraContainer dark:bg-xtraDarkPrimary rounded-md shadow-md p-3" >
        <div className="flex gap-2 w-full p-2">
          <Avatar >
            <Image src={image ?? ""} alt="user" width={40} height={40} />
          </Avatar>
          <input
          onClick={() => setOpen(true)}
            className="bg-zinc-200 text-zinc-600 font-mono ring-1 
            ring-zinc-800 focus:ring-2 focus:ring-rose-400 outline-none 
            duration-300 placeholder:text-zinc-600 placeholder:opacity-50 px-4 py-1 
            shadow-md focus:shadow-lg focus:shadow-rose-400 w-full dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-400 dark:ring-zinc-200 dark:focus:ring-rose-400 dark:focus:shadow-rose-400"
            autoComplete="off"
            placeholder={"What's on your mind athlete"}
            name="text"
            type="text"
            readOnly
          />
        </div>
        <div className="flex justify-between items-center p-2">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faImage} width={24} className="text-[#b4b4b4]" />
            <Paperclip size={24} className="text-[#b4b4b4] dark:text-xtraDarkText" />
            <MapPin size={24} className="text-[#b4b4b4] dark:text-xtraDarkText" />
            <Smile size={24} className="text-[#b4b4b4] dark:text-xtraDarkText" />
          </div>
          <Button
          onClick={() => setOpen(true)}
            size={"sm"}
            variant={"ghost"}
            style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
            className="rounded-none border-black border-1 dark:bg-xtraDarkText bg-white px-6 py-0 text-sm text-[#353434] font-light"
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
          {selectedWorkout && (
            <div className="relative">
              <button
                onClick={() => setSelectedWorkout(null)}
                className="absolute -top-2 -right-2 bg-black/50  text-white rounded-sm p-1 w-6 h-6 flex items-center justify-center z-10"
              >
                ×
              </button>
              <WorkoutCard 
                workout={awaitedWorkouts.find(w => w.id === selectedWorkout)!} 
                // onClose={() => setSelectedWorkout(null)}
              />
              </div>
          )}
            <Textarea
              placeholder={selectedWorkout ?"Add a note" : "What's on your mind athlete"}
              className="min-h-[120px] resize-none dark:bg-xtraDarkText dark:text-xtraText dark:placeholder:text-zinc-400 dark:ring-zinc-200 dark:focus:ring-rose-400 dark:focus:shadow-rose-400"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              name="text"
            />
            {showWorkouts && (
            <div className="max-h-[200px] overflow-y-auto border rounded-lg p-2">
              {awaitedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  onClick={() => {
                    setSelectedWorkout(workout.id)
                    setShowWorkouts(false)
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                >
                  {workout.name}
                </div>
              ))}
            </div>
          )}
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

              <Label onClick={() => 
                {setShowWorkouts(prev => !prev)
                
                }} className="cursor-pointer">
                <div className="flex items-center gap-2 text-[#b4b4b4] hover:text-primary">
                  <Dumbbell size={20} />
                  <span>{showWorkouts ? 'Hide Workouts' : 'Add Workout'}</span>
                </div>
              </Label>
            </div>
          <DialogFooter>
            <Button
            type="submit"
              onClick={() => void handleShare()}
              disabled={isSubmitting}
              style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
              className="rounded-none bg-white border-black border-1 px-6 py-0 text-sm dark:bg-xtraDarkText text-[#353434] font-light"
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



