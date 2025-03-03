import React from 'react'
import Exercice from './Exercice'
type dayDetails = {
    dayIndex:number,
    name : string,
    exercices :null | {
        name : string,
        sets : number,
        reps : number,
    }[] 
}
    

const Day = ({day}:{day:dayDetails | undefined}) => {
    function renderExercices(){
        return day?.exercices?.map((exercice, index) => {
            return <Exercice key={index} exercice={exercice}/>
        })
    }
  return (
<div className="bg-gradient-to-br from-[#F0F0F0] to-[#E6E6E6] dark:from-[#2A2A2A] dark:to-[#232323] rounded-lg p-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
             {day && <h3 className="text-xl font-bold mb-2 text-[#006400] dark:text-[#00FF00]">Day {day.dayIndex}: {day.name}</h3>}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cold-3 gap-4">
                {renderExercices()}
            </div>
          </div>  )
}

export default Day