"use client"
import React, { MouseEventHandler, ReactElement } from 'react'
import { Input } from '../input'
import {ButtonBlack,ButtonWhite} from '~/components/ui/UIverse/Buttons'
import '~/components/ui/UIverse/Button.css'

import { Button } from '../button'
import { Label } from '../label'
import AddDay from './AddDay'
import { DeleteIcon, GrabIcon, TrashIcon } from 'lucide-react'
import { Accordion } from '../accordion'
import addWorkout from '~/lib/actions'
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
import { ShootingStars } from '../UIverse/shootingStarBackground/shooting-stars'
import { StarsBackground } from '../UIverse/shootingStarBackground/stars-background'
import { useRouter } from 'next/navigation'


export default function CreateWorkout({user,exerciceNames}:{user:string | undefined | null, 
  exerciceNames: {
  name: string;
  musclesTargeted: string[];
  muscleGroup: string;
  equipment: string[];
}[]}) 
{
    const [newKey, setNewKey] = React.useState(0) 
    const [dayRest, setDayRest] = React.useState<{day: string ,change:number}>( )
    const [isPublished, setIsPublished] = React.useState<boolean>()
    const [days, setDays] = React.useState<ReactElement[]>([])
    const email = user || 'none'
    const [removedDay,setRemovedDay] = React.useState<number>()
    const router = useRouter()

    const formRef = React.useRef<HTMLFormElement>(null)

    function removeDay(id:number){
        setRemovedDay(id)
    }
    //remove Day
    React.useEffect(()=>{
      if(removedDay){
        // setDays([...days]?.filter(day => day.key != removedDay))
        setDays([...days]?.filter(day => Number(day.key) != removedDay))
      }
    },[removedDay])
    
    //add Day component
    React.useEffect(()=>{
      if(newKey)
        if(dayRest?.day === 'train')
        setDays(days => [...days , <AddDay exerciceNames = {exerciceNames} remove={removeDay} id={newKey} key={newKey} muscles='legs,arms,chest'  />])
        else setDays(days => [...days , <AddRestDay remove={removeDay} id={newKey} key={newKey} />])   
        // console.log(days) 

    },[newKey])
    //add Day to order
    React.useEffect(()=>{
      if(dayRest){
      setNewKey(newKey+1)
    }
    },[dayRest])
    // submit form
    React.useEffect(()=>{
      if( typeof isPublished === 'boolean' )
        formRef.current?.requestSubmit()
        // router.push('/workouts')
    },[isPublished])

    return (
    <div className=' h-full w-full relative rounded-md bg-slate-100 shadow-sm  mx-auto'>
      <form ref={formRef} className=" h-full  rounded-lg border border-border p-4 sm:p-6 shadow-sm space-y-4" action={addWorkout}>
        {/* ... existing hidden inputs ... */}
        <input type="hidden" name='email' value={email} />
        <input type="hidden" name='NoD' value={days.length}  />
        <input type="hidden" name='published' value={isPublished?.toString()} />
        <div className='pt-1 flex items-center'>
          <UIverseButton name='workoutName' placeHolder="Workout name..."  />
        </div>
        <div className='space-y-4 '>
          {days}
        </div>  
        <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
          <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
            <Button type='button' onClick={()=>{setDayRest( prev  =>  prev ? {day:"train",change:prev.change+1} : {day:'train',change:1}  ) } } className="z-50 w-full sm:w-auto" size="sm" variant="default">
              Add Workout Day
            </Button>
            <Button type='button' onClick={()=>{setDayRest( prev  =>  prev ? {day:"rest",change:prev.change+1} : {day:'rest',change:1}  ) }} className=" z-50 w-full sm:w-auto" size="sm" variant="default">
              Add Rest Day
            </Button>
          </div>
          <Dialog setPubslished={setIsPublished} />
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