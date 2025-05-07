import React from 'react'
import Exercice from './Exercice'
import { cn } from '~/lib/utils'
type dayDetails = {
    dayIndex:number,
    name : string,
    exercices :Exercise[] | null
}
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
    

const Day = ({day}:{day:dayDetails | undefined}) => {
    function renderExercices(){
        return day?.exercices?.map((exercice, index) => {
            return <Exercice key={index} exercice={exercice}/>
        })
    }
  return (
    <div className={day?.name== "rest" ? "bg-xtraContainer/30 rounded-lg p-3 shadow-sm dark:bg-xtraDarkPrimary/90 " : "bg-xtraContainer/40 dark:bg-xtraDarkPrimary rounded-lg p-3 shadow-sm " }>
      {day && (
        <h3 className={"text-lg font-bold mb-1 dark:text-xtraDarkText text-xtraText  text-center sm:text-left"}>
          {day.name}
        </h3>
      )}
      <div className="flex flex-wrap gap-4">
        {renderExercices()}
      </div>
    </div>
  )
}

export default Day