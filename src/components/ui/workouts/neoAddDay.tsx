"use client"
import React, { type ReactElement, useRef } from 'react'
import { Label } from '../label'
import { Button } from '../button'
import { Pencil, GrabIcon, TrashIcon, Dumbbell, Check, Plus, Edit, GripVertical } from 'lucide-react'
import { AccordionItem, AccordionTrigger, AccordionContent } from '../accordion'
import AddExercise from './neoAddExercise'
import { cn } from '~/lib/utils'
import Container from '../Container'
import { ButtonBlack, ButtonWhite } from '../UIverse/Buttons'
import { Input } from '../input'
import { type ExerciseNames } from '~/lib/types'
import { useWorkout  ,type WorkoutDay } from './WorkoutContext'
import AIicon from '~/components/AIicon'
import { generationAction } from '~/lib/actions/workout'
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';



type Props = {
    id: number,
    details:WorkoutDay
}


export default function AddDay(props : Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
    const store = useWorkout()
    const [dayName,setDayName] = React.useState(false)
    const [isDay,setIsDay] = React.useState(false)
    const [isEdit,setIsEdit] = React.useState(false)
    const [isGenerating, setIsGenerating] = React.useState(false); // Add loading state
    const [exercices,setExercices] = React.useState<ReactElement[]>([]) // Change the type to an array of ReactElement
    const [nbrExercices,setNbrExercices] = React.useState(0)
    const dayNameProps = useRef<HTMLInputElement>(null)
    const dayIndex = props.id
    const handleGenerateDay = async () => {
        setIsGenerating(true); // Set loading to true
        try {

            const response = await generationAction(store.exerciseNames.map(ex => ex.name),"day",{
              workout:{name:store.workoutName,days:store.days,description:store.description},
              day:{name:store.days.find(day => day.id === props.id)?.name}
            })

            const parsedResponse = JSON.parse(response.message) as {name:string,exercises:{name:string,sets:number,reps:number}[]};
            console.log(parsedResponse);
            
            store.AddExercises(props.id,parsedResponse.exercises);
            setIsEdit(true); 
        } catch (error) {
            console.error("Failed to generate day:", error);
        } finally {
            setIsGenerating(false); 
        }
    }
  return (
    <div 
      ref={setNodeRef}
      style={style}
      className='shadow-sm dark:bg-xtraDarkPrimary bg-xtraContainer z-10 rounded-lg px-4 space-y-4'
    >
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
            {/*dumbbell*/}
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dumbbell"><path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/></svg>              <div>
            {/*dayName */}
            <div className='flex items-center mb-2'>
              <input type="hidden" name="day" value={JSON.stringify({name:dayNameProps.current?.value,index:dayIndex,dayID:-1})} />
              <Input  
                  required={true} 
                  ref={dayNameProps} 
                  className={cn(
                      "p-2 text-lg border rounded-lg h-full transition-all ease-in ",
                      dayName ? "dark:bg-xtraDarkAccent/20 dark:text-white bg-transparent border-transparent font-semibold cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-black" 
                      : "bg-gray-50 text-lg font-semibold dark:bg-xtraDarkAccent dark:text-white"
                  )} 
                  readOnly={dayName} 
                  onChange={() => {
                      store.updateDay(
                          props.id,
                          {...props.details, name: dayNameProps.current?.value}  
                      )
                  }} 
                  placeholder='add Name'
                  value={props.details.name}
              />
              {/* <Input name="dayName" readonly={dayName} refprop={dayNameProps} placeholder='day name' />  */}
               <Button variant="ghost" className='h-full' type='button' onClick={()=>{setDayName(prev => !prev)}}>{dayName ? <Edit /> : <Check />}</Button>  
            </div>
            
            </div>
            </div>
            {/*Edit and Delete buttons*/}
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => void handleGenerateDay()}
                type='button' 
                variant="ghost" 
                size={"icon"} 
                disabled={isGenerating} // Disable button when generating
              >
                {isGenerating ? (
                  <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg> // Show spinner when loading
                ) : (
                  <AIicon/> // Show normal icon otherwise
                )}
              </Button>
              <ButtonBlack type='button' onClick={()=>{setIsEdit(prev => !prev);console.log("clicked");
              }} size="sm" variant="outline">
                <Pencil className="h-4 w-4" />
              </ButtonBlack>
              <ButtonBlack type='button' onClick={()=>{store.removeDay(props.id)}} size="sm" variant="outline">
                <TrashIcon className="h-4 w-4" />
              </ButtonBlack>
              <button 
                type='button' 
                {...attributes}
                {...listeners} 
                className='cursor-move'
              >
                <GripVertical/>
              </button>
            </div>
          </div>
          <div>
          <div className={isEdit ?  "flex flex-wrap gap-2  px-3 pb-1 pt-3 w-full" : "hidden"}>
            {store.days.find(day => day.id === props.id)?.exercises?.map(ex => (
                <AddExercise  dayIndex={props.id} key={ex.id} exercice={ex} isShown={ex.isShown ?? true}/>
            ))}
          </div>{isEdit &&
          <ButtonBlack variant="outline" className='m-3' type='button' onClick={()=>{store.addExercise(props.id,{name:"Barbell Squat",reps:8,sets:3})}}>Add exercice</ButtonBlack>
          }
          </div>
          </div>
  )
}