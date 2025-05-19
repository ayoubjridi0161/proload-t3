"use client"
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  dayId: number;
  exerciseLibrary: {
    images: string[];
  };
}
const fallbackImage = '/liftinprogress.png';
const Exercice = ({exercice}:{exercice:Exercise}) => {
    
  return (
<div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  {/* <PlayIcon className="w-6 h-6 text-[#8C8C8C] dark:text-[#A0A0A0]" /> */}
                  {/* <Image src={exercice.exerciseLibrary.images[0] ?? ""} width={20} height={20} alt={exercice.name[0] ?? ""} className='w-12 h-12 border rounded-md'  /> */}
                  <Image
                  src={exercice.exerciseLibrary.images[0] ?? '/liftinprogress.png'}
                  alt={exercice.name ?? ""}
                  width={20} 
                  height={20}
                  // fill
                  className="object-cover w-12 h-12 rounded-md"
                  onError={(e) => {
                    // When image fails to load, replace with fallback image
                    const imgElement = e.currentTarget as HTMLImageElement;
                    imgElement.src = fallbackImage;
                    imgElement.onerror = null; // Prevent infinite loop if fallback also fails
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium mb-1 text-[#333333] dark:text-[#CCCCCC] truncate">{exercice.name}</h4>
                  <p className="text-[#707070] text-sm dark:text-[#9E9E9E]">{exercice.sets} sets of {exercice.reps} reps</p>
                </div>
              </div>  )
}

export default Exercice