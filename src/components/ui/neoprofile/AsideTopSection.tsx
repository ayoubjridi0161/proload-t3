"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { addBio, addProfileDetails } from "~/lib/actions"
type Props = {
  data: {
    bio: string | null;
    details: {
        bmi: string;
        age: string;
        gender: string;
        height: string;
        weight: string;
        experience: string;
    } | null;
} | undefined
}
export default function AthleticProfile({data}:Props) {
  const [bio, setBio] = useState(data?.bio ?? "")
  const [showBioForm, setShowBioForm] = useState(false)
  const [savedBio, setSavedBio] = useState(data?.bio)

  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [details, setDetails] = useState(data?.details ?? {age:"",bmi:"",experience:"",gender:"",height:"",weight:""})
  const [savedDetails, setSavedDetails] = useState<null | typeof details>(data?.details ?? null)

  const handleSaveBio = async () => {
    setSavedBio(bio)
    setShowBioForm(false)
    await addBio(bio)
  }

  const handleSaveDetails = async () => {
    if (details){
      setSavedDetails({ ...details })
      if(savedDetails) { const res = await addProfileDetails(savedDetails) }
    }
    setShowDetailsDialog(false)
  }

  return (
    <div className="shadow-bottom w-full p-2 space-y-3">
      <h1 className="text-xl font-bold">Athletic Profile</h1>

      {savedBio && !showBioForm && (
        <div className="border border-gray-200 p-3 mb-3">
          <p className="text-sm text-gray-700">{savedBio}</p>
        </div>
      )}

      {showBioForm ? (
        <div className="space-y-2">
          <Textarea
            placeholder="Enter your bio here..."
            className="w-full border-black border-1 rounded-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
          <div className="flex space-x-2">
            <Button
              variant="default"
              style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
              className="rounded-none font-semibold border-black border-1 px-4 py-0"
              onClick={()=>{void handleSaveBio()}}
            >
              SAVE BIO
            </Button>
            <Button
              variant="ghost"
              style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
              className="rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-4 py-0"
              onClick={() => setShowBioForm(false)}
            >
              CANCEL
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="ghost"
          style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
          className="w-3/4 rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0"
          onClick={() => setShowBioForm(true)}
        >
          {savedBio ? "EDIT BIO" : "ADD BIO"}
        </Button>
      )}

      

      {savedDetails && (
        <div className="border border-gray-200 p-3 mb-3 text-sm">
          <div className="grid grid-cols-2 gap-2">
            {savedDetails.height && (
              <>
                <span className="font-semibold">Height:</span>
                <span>{savedDetails.height}</span>
              </>
            )}
            {savedDetails.weight && (
              <>
                <span className="font-semibold">Weight:</span>
                <span>{savedDetails.weight}</span>
              </>
            )}
            {savedDetails.gender && (
              <>
                <span className="font-semibold">gender:</span>
                <span>{savedDetails.gender}</span>
              </>
            )}
            {savedDetails.age && (
              <>
                <span className="font-semibold">.age:</span>
                <span>{savedDetails.age}</span>
              </>
            )}
            {savedDetails.experience && (
              <>
                <span className="font-semibold">Experience:</span>
                <span>{savedDetails.experience}</span>
              </>
            )}
          </div>
        </div>
      )}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
            className="w-3/4 rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0"
          >
            {savedDetails ? "EDIT DETAILS" : "ADD DETAILS"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Athletic Details</DialogTitle>
            <DialogDescription>Add your athletic details below. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="height" className="text-right">
                Height
              </Label>
              <Input
                id="height"
                value={details?.height}
                onChange={(e) => setDetails({ ...details, height: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 150cm"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight
              </Label>
              <Input
                id="weight"
                value={details.weight}
                onChange={(e) => setDetails({ ...details, weight: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 185 kg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                age
              </Label>
              <Input
                id="age"
                value={details.age}
                onChange={(e) => setDetails({ ...details,age: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 17"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                experience
              </Label>
              <Input
                id="experience"
                value={details.experience}
                onChange={(e) => setDetails({ ...details, experience: e.target.value })}
                className="col-span-3"
                placeholder="e.g., Point Guard"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="" className="text-right">
                  gender
              </Label>
              <Input
                id="gender"
                value={details.gender}
                onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                className="col-span-3"
                placeholder="e.g., male"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="" className="text-right">
                  bmi
              </Label>
              <Input
                id="bmi"
                value={details.bmi}
                onChange={(e) => setDetails({ ...details, bmi: e.target.value })}
                className="col-span-3"
                placeholder="e.g., male"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={()=>{void handleSaveDetails()}}
              style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
              className="rounded-none font-semibold border-black border-1"
            >
              Save Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <Button
        variant="ghost"
        style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
        className="w-full rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0"
      >
        ADD ACHIEVEMENTS
      </Button> */}
    </div>
  )
}

