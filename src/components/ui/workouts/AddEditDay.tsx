"use client"
import React, { type ReactElement, useRef, useState } from 'react'
import { Label } from '../label'
import { Button } from '../button'
import { Pencil, GrabIcon, TrashIcon, Dumbbell, Check, Plus, Edit } from 'lucide-react'
import { AccordionItem, AccordionTrigger, AccordionContent } from '../accordion'
import AddEditExercice from './AddEditExercice'
import AddExercice from './AddExercice'
import { cn } from '~/lib/utils'
import Container from '../Container'
import { ButtonBlack, ButtonWhite } from '../UIverse/Buttons'
import { Input } from '../input'
import { type dayDetails } from '~/lib/types'


type Props = {
  
   dayDetails?: dayDetails,
    muscles: string,
    id: number,
    remove: (id:number)=>void,
    exerciceNames:{
      name: string;
      description: string | null;
      musclesTargeted: string[];
      muscleGroup: string;
      equipment: string | null;
      video: string | null;
      images: string[];
      rating: number | null;
  }[]

}
type exercice = {
  exName: string,
  sets: number,
  reps: number
}

export default function AddEditDay(props : Props) {
    const [dayNameProps,setDayNameProps] = useState(props.dayDetails?.name)
    const [dayName,setDayName] = React.useState(true)
    const [isDay,setIsDay] = React.useState(false)
    const [nbrExercices,setNbrExercices] = React.useState(props.dayDetails?.exercices.length ?? 0)
    const [isEdit,setIsEdit] = React.useState(false)
    const [exercices,setExercices] = React.useState<ReactElement[]>(props.dayDetails?.exercices.map((ex,index) => (<AddEditExercice exerciceNames={props.exerciceNames} exercice={ex}  dayName={props.dayDetails?.name} key={`${props.id}${index}`} id={`${props.id}${index}`} dayIndex={props.dayDetails?.dayIndex}  />)) ?? [] ) // Change the type to an array of ReactElement
    
    /*function addExercice (item : exercice){
      setExercices(prev => [...prev,<div key={JSON.stringify(item)}>
        <h1><span>{item.exName}</span> : <span>{item.sets}</span> : <span>{item.reps}</span></h1>
      </div>])
      setIsExercice(false)
    }*/
  return (
    <div className=' bg-xtraDark/10 shadow-sm rounded-lg'>
        <div className="flex items-center bg-primary-foreground justify-between rounded-lg border border-border   px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center space-x-4">
            {/*dumbbell*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dumbbell"><path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/></svg>              <div>
            {/*dayName */}
            <div className='flex items-center mb-2'>
              <input type="hidden" name="day" value={JSON.stringify({name:dayNameProps,index:props.id,dayID:props.dayDetails?.id ?? -1 })} />
            <Input  required={true} value={dayNameProps} onChange={(e)=>{setDayNameProps(e.target.value)}} className={cn("p-2 text-2xl border rounded-lg h-full transition-all ease-in ", dayName? " font-semibold bg-transparent cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-black " : "bg-gray-50  text-lg font-semibold ")} readOnly={dayName} placeholder='add Name'/> 
              {/* <Input name="dayName" readonly={dayName} refprop={dayNameProps} placeholder='day name' />  */}
               <Button variant="ghost" className='h-full' type='button' onClick={()=>{setDayName(prev => !prev)}}>{dayName ? <Edit /> : <Check />}</Button>  
            </div>
            </div>
            </div>
            {/*Edit and Delete buttons*/}
            <div className="flex items-center space-x-2">
              <ButtonBlack type='button' onClick={()=>{setIsEdit(prev => !prev)}} size="sm" variant="outline">
                <Pencil className="h-4 w-4" />
              </ButtonBlack>
              <ButtonBlack type='button' onClick={()=>{props.remove(props.id)}} size="sm" variant="outline">
                <TrashIcon className="h-4 w-4" />
              </ButtonBlack>
            </div>
          </div>
          <div>
          <div className={isEdit ?  "flex flex-wrap gap-2  px-3 pb-1 pt-3 w-full" : "hidden"}>
            {exercices }
          </div>{isEdit &&
          <ButtonWhite className='' type='button' onClick={()=>{setNbrExercices(prev => prev+1);setExercices(prev => [...prev,<AddExercice dayIndex={props.id} exerciceName={props.exerciceNames} dayName={props.dayDetails?.name} key={`${props.id}${nbrExercices}`} id={`day${props.id}-exercice${nbrExercices}`}   /> ])}}>Add exercice</ButtonWhite>
          }
          </div>
        
          
          </div>
  )
}
