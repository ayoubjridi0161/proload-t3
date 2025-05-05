"use client"

import { Button } from "~/components/ui/button"
import { CheckCircle } from "lucide-react"

interface CompletionStepProps {
  userData: any
  updateUserData: (field: string, value: any) => void
  onNext: () => void
  onPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export default function CompletionStep({ userData, onNext, onPrevious }: CompletionStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="rounded-full bg-emerald-100 p-3">
          <CheckCircle className="h-10 w-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold">You're all set!</h1>
        <p className="text-gray-500">Thanks for completing your profile setup. You're ready to get started!</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-medium">Profile Summary</h2>
        <div className="rounded-lg bg-gray-50 p-4 space-y-2">
          <p>
            <span className="font-medium">Name:</span> {userData.name ?? "user"}
          </p>
          {/* <p>
            <span className="font-medium">Job Title:</span> {userData.jobTitle || "Not specified"}
          </p>
          <p>
            <span className="font-medium">Interests:</span>{" "}
            {userData.interests.length > 0 ? userData.interests.join(", ") : "None selected"}
          </p> */}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button type="button" onClick={onNext}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}
