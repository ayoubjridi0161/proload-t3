"use client"

// Add useEffect to imports
import { useState, useEffect } from "react"
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
import { addBio, addProfileDetails } from "~/lib/actions/userActions"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
type Props = {
  isPublic: boolean;
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
export default function AthleticProfile({ data, isPublic }: Props) {
  const [bio, setBio] = useState(data?.bio ?? "")
  const [showBioForm, setShowBioForm] = useState(false)
  const [savedBio, setSavedBio] = useState(data?.bio)

  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [details, setDetails] = useState(data?.details ?? { age: "", bmi: "", experience: "", gender: "", height: "", weight: "" })
  const [savedDetails, setSavedDetails] = useState<null | typeof details>(data?.details ?? null)

  const handleSaveBio = async () => {
    setSavedBio(bio)
    setShowBioForm(false)
    await addBio(bio)
  }

  // Add this state for tracking save operation
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveDetails = async () => {
    if (details) {
      setIsSaving(true)
      try {
        setSavedDetails({ ...details })
        const res = await addProfileDetails({
          ...details,
          fitnessLevel: "",  // Add missing required property
          fitnessGoal: ""    // Add missing required property
        })
        setShowDetailsDialog(false)
      } catch (error) {
        console.error('Failed to save details:', error)
      } finally {
        setIsSaving(false)
      }
    }
  }
  useEffect(() => {
    if (details.weight && details.height) {
      const weightValue = parseFloat(details.weight.replace(/[^0-9.]/g, ''));
      const heightValue = parseFloat(details.height.replace(/[^0-9.]/g, ''));

      if (!isNaN(weightValue) && !isNaN(heightValue)) {
        let bmiValue: number;

        if (details.weight.includes('kg') && details.height.includes('cm')) {
          // Convert cm to meters and calculate BMI
          bmiValue = weightValue / Math.pow(heightValue / 100, 2);
        } else if (details.weight.includes('lbs') && details.height.includes('ft')) {
          // Convert lbs and ft to kg and meters
          const weightKg = weightValue * 0.453592;
          const heightM = heightValue * 0.3048;
          bmiValue = weightKg / Math.pow(heightM, 2);
        } else {
          return;
        }

        setDetails(prev => ({ ...prev, bmi: bmiValue.toFixed(1) }));
      }
    }
  }, [details.weight, details.height]);
  return (
    <div className="shadow-bottom w-full p-2 space-y-3 bg-xtraContainer dark:bg-xtraDarkPrimary">
      <h1 className="text-xl font-bold">Athletic Profile</h1>
      <div className="border border-gray-200 p-3 mb-3">
        {savedBio && savedBio.length > 0 ? <p className="text-sm text-gray-700">{savedBio}</p>
        :<p className="text-lg text-gray-700">user has no bio</p>}
      </div>
      {showBioForm && (
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
              onClick={() => { void handleSaveBio() }}
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
      )}
        {!isPublic && !showBioForm && <Button
          variant="ghost"
          style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
          className="w-3/4 rounded-none font-semibold text-[#4a4a4a] border-black border-1 px-7 py-0"
          onClick={() => setShowBioForm(true)}
        >
          {savedBio ? "EDIT BIO" : "ADD BIO"}
        </Button>}




      {!isPublic && savedDetails && (
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
                <span className="font-semibold">age:</span>
                <span>{savedDetails.age}</span>
              </>
            )}
            {savedDetails.experience && (
              <>
                <span className="font-semibold">Experience:</span>
                <span>{savedDetails.experience}</span>
              </>
            )}
            {savedDetails.bmi && (
              <>
                <span className="font-semibold">bmi:</span>
                <span>{savedDetails.bmi}</span>
              </>
            )}
          </div>
        </div>
      )}
      {!isPublic &&<Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
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
              <div className="col-span-3 flex gap-2">
                <Input
                  id="height"
                  type="number"
                  value={details.height?.replace(/[^0-9.]/g, '')}
                  onChange={(e) => {
                    const unit = details.height?.includes('cm') ? 'cm' : 'ft';
                    setDetails({ ...details, height: `${e.target.value}${unit}` });
                  }}
                  className="flex-1"
                  placeholder={details.height?.includes('cm') ? "e.g., 150" : "e.g., 5.9"}
                />
                <Select
                  value={details.height?.includes('cm') ? 'cm' : 'ft'}
                  onValueChange={(unit) => {
                    const value = details.height?.replace(/[^0-9.]/g, '') || '';
                    setDetails({ ...details, height: `${value}${unit}` });
                  }}
                >
                  <SelectTrigger className="w-24 bg-white">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="ft">ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="weight"
                  type="number"
                  value={details.weight?.replace(/[^0-9.]/g, '')}
                  onChange={(e) => {
                    const unit = details.weight?.includes('kg') ? 'kg' : 'lbs';
                    setDetails({ ...details, weight: `${e.target.value}${unit}` });
                  }}
                  className="flex-1"
                  placeholder={details.weight?.includes('kg') ? "e.g., 75" : "e.g., 165"}
                />
                <Select
                  value={details.weight?.includes('kg') ? 'kg' : 'lbs'}
                  onValueChange={(unit) => {
                    const value = details.weight?.replace(/[^0-9.]/g, '') || '';
                    setDetails({ ...details, weight: `${value}${unit}` });
                  }}
                >
                  <SelectTrigger className="w-24 bg-white">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                age
              </Label>
              <Input
                id="age"
                value={details.age}
                onChange={(e) => setDetails({ ...details, age: e.target.value })}
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
                placeholder="e.g., 2 years"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="" className="text-right">
                gender
              </Label>
              <Select
                value={details.gender}
                onValueChange={(value) => setDetails({ ...details, gender: value })}
              >
                <SelectTrigger className="col-span-3 bg-white">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
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
              onClick={() => { void handleSaveDetails() }}
              style={{ boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.8)" }}
              className="rounded-none font-semibold border-black border-1"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Details'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>}

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

