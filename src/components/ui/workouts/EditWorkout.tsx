"use client"
import React, { MouseEventHandler, type ReactElement } from 'react'
import { Input } from '../input'
import {ButtonBlack,ButtonWhite} from '~/components/ui/UIverse/Buttons'
import '~/components/ui/UIverse/Button.css'

import { Button } from '../button'
import { Label } from '../label'
import AddDay from './AddDay'
import AddEditDay from './AddEditDay'

import { DeleteIcon, GrabIcon, TrashIcon } from 'lucide-react'
import { Accordion } from '../accordion'
import addWorkout from '~/lib/actions'
import { editWorkout } from '~/lib/actions'
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
type Props = {
    id : number
    name : string
    description : string
    days : dayDetails[]
    email : string
    NoD : number | null
    exerciceNames:{
      name: string;
      musclesTargeted: string[];
      muscleGroup: string;
      equipment: string[];}[]
    
}

export default function EditWorkout(props : Props ) {
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
    const email = props.email 
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

    return (
    <div className='bg-primary-foreground rounded-lg h-full'>
     <form action={async (formData: FormData) => {
       await editWorkout(formData);
     }} className="h-full rounded-lg border border-border p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 space-y-2">
        <input type="hidden" name='email' value={email} />
        <input type="hidden" name='NoD' value={days.length}  />
        <input type="hidden" name='workoutID' value={props.id} />
        {/* <input type="hidden" name='published' value={isPublished?.toString()} /> */}
          <div className='pt-1 flex items-center'>
          <UIverseButton defaultval={props.name} name='workoutName' placeHolder="Workout name..." aria-label={'workout name...'} />
          </div>
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
        
        
        <Button variant={'destructive'} className='text-md font-semibold'>Save</Button>

</div>
      </form>
  
  
    </div>
    

  )
}
const Dialog = ({setPubslished} : {setPubslished : (arg0: boolean)=> void  }) => {

  return(
    
    <AlertDialog>
    <AlertDialogTrigger className='btnwhite'>
      save
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className='text-accent-foreground'>Would you like to share your workout</AlertDialogTitle>
        <AlertDialogDescription className='text-muted-foreground'>
          This action will make your workouts seen to the public and you can remove it at any time
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
      <AlertDialogAction className='bg-primary-foreground hover:bg-primary-foreground/50' onClick={()=>{setPubslished(false)}}  >No</AlertDialogAction>
      
      <AlertDialogAction  onClick={()=>{setPubslished(true)}} >Yes</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}