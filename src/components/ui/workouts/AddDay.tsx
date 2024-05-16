"use client"
import React, { ReactElement } from 'react'
import { Label } from '../label'
import { Input } from '../input'
import { Button } from '../button'
import { Pencil, GrabIcon, TrashIcon } from 'lucide-react'
import { AccordionItem, AccordionTrigger, AccordionContent } from '../accordion'
import AddExercice from './AddExercice'


type Props = {
    muscles: string,
    id: number,
    remove: (id:number)=>void

}
type exercice = {
  exName: string,
  sets: number,
  reps: number
}

export default function AddDay(props : Props) {
    const [dayName,setDayName] = React.useState('')
    const [isDay,setIsDay] = React.useState(false)
    const [isEdit,setIsEdit] = React.useState(false)
    const [exercices,setExercices] = React.useState<ReactElement[]>([]) // Change the type to an array of ReactElement
    const [isExercice,setIsExercice] = React.useState(false)
    function addExercice (item : exercice){
      setExercices(prev => [...prev,<div key={JSON.stringify(item)}>
        <h1><span>{item.exName}</span> : <span>{item.sets}</span> : <span>{item.reps}</span></h1>
      </div>])
      setIsExercice(false)
    }



  return (
    <div className='space-y-4 border rounded-lg '>
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <GrabIcon className=" text-gray-500 dark:text-gray-400" />
              {/*DayName + muscles*/}
              <div>
                <h3 className="text-lg font-semibold">Leg Day</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Muscles Targeted: {props.muscles} id: {props.id}</p>
              </div>
            </div>
            {/*Edit and Delete buttons*/}
            <div className="flex items-center space-x-2">
              <Button onClick={()=>{setIsEdit(prev => !prev)}} size="sm" variant="outline">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button onClick={()=>{props.remove(props.id   )}} size="sm" variant="outline">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {isEdit &&
          <div className='px-5 pb-4  space-y-2'>
            {exercices }
            {isExercice && <AddExercice addExercice={addExercice}/>}
            

            <Button onClick={()=>{setIsExercice(prev => !prev)}}>Add exercice</Button>

          </div>
          }
          </div>
  )
}