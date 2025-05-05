"use client"

import type React from "react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface NameStepProps {
  userData: { name: string }
  updateUserData: (field: string, value: any) => void
  onNext: () => void
  onPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export default function NameStep({ userData, updateUserData, onNext, isFirstStep }: NameStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome! Let's get to know you</h1>
          <p className="text-gray-500">What should we call you?</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={userData.name}
            onChange={(e) => updateUserData("name", e.target.value)}
            required
            className="w-full"
            autoFocus
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!userData.name.trim()}>
            Continue
          </Button>
        </div>
      </div>
    </form>
  )
}
