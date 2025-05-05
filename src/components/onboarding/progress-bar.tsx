interface ProgressBarProps {
    currentStep: number
    totalSteps: number
  }
  
  export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100
  
    return (
      <div className="w-full">
        <div className="flex justify-between mb-1 text-xs text-gray-500">
          <span>Getting Started</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    )
  }
  