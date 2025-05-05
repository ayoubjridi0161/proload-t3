"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Upload, UserCircle } from "lucide-react"
import Image from "next/image"

interface ProfilePictureStepProps {
  userData: { profilePicture: string }
  updateUserData: (field: string, value: any) => void
  onNext: () => void
  onPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export default function ProfilePictureStep({ userData, updateUserData, onNext, onPrevious }: ProfilePictureStepProps) {
  const [previewUrl, setPreviewUrl] = useState(userData.profilePicture)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewUrl(result)
        updateUserData("profilePicture", result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Add a profile picture</h1>
        <p className="text-gray-500">This helps people recognize you</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {previewUrl ? (
            <Image width={20} height={20} src={previewUrl || "/placeholder.svg"} alt="Profile preview" className="w-full h-full object-cover" />
          ) : (
            <UserCircle className="w-20 h-20 text-gray-400" />
          )}
        </div>

        <div className="flex flex-col items-center">
          <Label
            htmlFor="profile-picture"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Label>
          <input id="profile-picture" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
          <p className="mt-1 text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button type="button" onClick={onNext}>
          {previewUrl ? "Continue" : "Skip for now"}
        </Button>
      </div>
    </div>
  )
}
