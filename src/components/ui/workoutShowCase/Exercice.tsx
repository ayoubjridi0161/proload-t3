import { PlayIcon } from 'lucide-react'
import React from 'react'
type exerciceDetails = {
    name : string,
    sets: number,
    reps: number,
}
const Exercice = ({exercice}:{exercice:exerciceDetails}) => {
    
  return (
<div className="flex items-center">
                <div  className="mr-4 w-14 h-14 bg-gradient-to-br from-[#D9D9D9] to-[#CFCFCF] dark:from-[#3A3A3A] dark:to-[#323232] rounded-md flex items-center justify-center">
                  <PlayIcon className="w-8 h-8 text-[#8C8C8C] dark:text-[#A0A0A0]" />
                </div>
                <div>
                  <h4 className="text-base font-medium mb-1 text-[#333333] dark:text-[#CCCCCC]">{exercice.name}</h4>
                  <p className="text-[#707070] dark:text-[#9E9E9E]">{exercice.sets} sets of {exercice.reps} reps</p>
                </div>
              </div>  )
}

export default Exercice