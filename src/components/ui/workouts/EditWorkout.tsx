"use client"
import React, { MouseEventHandler, type ReactElement } from 'react'
import '~/components/ui/UIverse/Button.css'
import { Button } from '../button'
import AddDay from './AddDay'
import SimpleContainer from "~/components/ui/userDashboard/Container";
import AddEditDay from './AddEditDay'
import { editWorkout } from '~/lib/actions/workout'
import UIverseButton from '~/components/UIverseButton'
import AddRestDay from './AddRestDay'
import Container from '../Container'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import type { workoutDetails,dayDetails } from '~/lib/types'
import { Textarea } from '../textarea'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
type Props = {
  owned:boolean
  ownerId:string
    id : number
    name : string
    description : string
    days : dayDetails[]
    NoD : number | null
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

export default function EditWorkout(props : Props ) {
    const router = useRouter()
    const [newKey, setNewKey] = React.useState(props.NoD ?? 99) 
    const [dayRest, setDayRest] = React.useState<{day: string ,change:number}>()
    function addDays(){
      const sortedDays = props.days.sort((a,b)=>a.dayIndex - b.dayIndex)
      const days : ReactElement[] = [] 
      const numberOfDays = props.NoD ?? 1
      for(let i = 1,j=1 ; i <= numberOfDays ; i++){
        if(sortedDays[j-1]?.dayIndex === i){
          days.push(<AddEditDay exerciceNames={props.exerciceNames} dayDetails={sortedDays[j-1] } remove={removeDay} id={i} key={i} muscles='legs,arms,chest'  />)
          j++;
        }
        else{ days.push(<AddRestDay remove={removeDay} id={i} key={i} />)
        }

      }
      return days
      }
    const [days, setDays] = React.useState<ReactElement[]>(addDays())
    const [removedDay,setRemovedDay] = React.useState<number>()
    function removeDay(id:number){
        setRemovedDay(id)
    }
    //remove Day
    React.useEffect(()=>{
      if(removedDay){
        setDays([...days]?.filter(day => Number(day.key) != removedDay))
      }
    },[removedDay])
    //add Day component
    React.useEffect(()=>{
      if(newKey)
        if(dayRest?.day === 'train')
        setDays(days => [...days , <AddDay exerciceNames={props.exerciceNames}  remove={removeDay} id={newKey} key={newKey} muscles='legs,arms,chest'  />])
        else if(dayRest?.day === 'rest') setDays(days => [...days , <AddRestDay remove={removeDay} id={newKey} key={newKey} />])   
        // console.log(days) 
    },[newKey])
    //add Day to order
    React.useEffect(()=>{
      if(dayRest){
      setNewKey(newKey+1)
    }
    },[dayRest])
    const [state, formAction] = useFormState(editWorkout, null)
    if(state) {
      toast(state)
      router.push('/workouts')
      return <div>Redirecting ...</div>
    }
    return (
    <div className='w-full bg-xtraContainer rounded-none h-fit'>
     <form action={formAction} className="h-fit p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 space-y-2">
        <input type="hidden" name='NoD' value={days.length}  />
        <input type="hidden" name='workoutID' value={props.id} />
        <input type="hidden" name='ownerId' value={props.ownerId} />
        {/* <input type="hidden" name='published' value={isPublished?.toString()} /> */}
          <UIverseButton defaultval={props.name} name='workoutName' placeHolder="Workout name..." aria-label={'workout name...'} />
          <SimpleContainer className='p-0 bg-primary-foreground drop-shadow-sm '>
          <h2 className='pl-1 text-lg font-semibold'>Description:</h2>
          <Textarea 
            defaultValue={props.description} 
            readOnly={!props.owned} 
            className={!props.owned ? "bg-slate-100 cursor-not-allowed" : undefined}
          /></SimpleContainer>
          <div className='space-y-4'>
          {days}
          </div>  
        <div className='flex justify-between'>
          <div className='space-x-4'>
          <Button type='button' onClick={()=>{setDayRest( prev  =>  prev ? {day:"train",change:prev.change+1} : {day:'train',change:1}  ) } } className="mt-4" size="sm" variant="default">
          Add Workout Day
          </Button>
          <Button type='button' onClick={()=>{setDayRest( prev  =>  prev ? {day:"rest",change:prev.change+1} : {day:'rest',change:1}  ) }} className="mt-4" size="sm" variant="default">
          Add Rest Day
          </Button>
        </div>
        <SaveButton owned={props.owned} />
        </div>
      </form>
    </div>
    

  )
}

const SaveButton = ({owned}:{owned:boolean}) => {
  const {pending} = useFormStatus()
  return (
<Button 
  variant={'destructive'} 
  className='text-md font-semibold mt-3'
  disabled={pending}
>
  {pending ? (
    "Saving..."
  ) : (
    owned ? "Save" : "Request Edit"
  )}
</Button>
  )
  
}
