"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import NameStep from "~/components/onboarding/name-step"
import ProfilePictureStep from "~/components/onboarding/profile-picture-step"
import CompletionStep from "~/components/onboarding/completion-step"
import ProgressBar from "~/components/onboarding/progress-bar"

export default function OnboardingPage() {
  // const router = useRouter()
  // const [currentStep, setCurrentStep] = useState(0)
  // const [userData, setUserData] = useState({
  //   name: "",
  //   profilePicture: "",
  //   jobTitle: "",
  //   interests: [],
  //   notifications: {
  //     email: true,
  //     push: true,
  //     sms: false,
  //   },
  // })

  // const steps = [
  //   { id: "name", component: NameStep },
  //   { id: "profilePicture", component: ProfilePictureStep },
  //   { id: "completion", component: CompletionStep },
  // ]

  // const handleNext = () => {
  //   if (currentStep < steps.length - 1) {
  //     setCurrentStep(currentStep + 1)
  //   } else {
  //     // Submit data and redirect to dashboard
  //     router.push("/home")
  //   }
  // }

  // const handlePrevious = () => {
  //   if (currentStep > 0) {
  //     setCurrentStep(currentStep - 1)
  //   }
  // }

  // const updateUserData = (field: keyof typeof userData, value: any) => (
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   setUserData(prev => ({ ...prev, [field]: value }))
  // )

  // const CurrentStepComponent = steps[currentStep]?.component ?? steps[0].component

  // return (
  //   <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
  //     <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
  //       <ProgressBar currentStep={currentStep} totalSteps={steps.length - 1} />

  //       <div className="my-8">
  //         <CurrentStepComponent
  //           userData={userData}
  //           updateUserData={updateUserData}
  //           onNext={handleNext}
  //           onPrevious={handlePrevious}
  //           isFirstStep={currentStep === 0}
  //           isLastStep={currentStep === steps.length - 1}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // )*
  return (<div>onboarding</div>)
}
