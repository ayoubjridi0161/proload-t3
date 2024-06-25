"use client"
import React, { ReactElement } from 'react'
import { Input } from '../input'
import {ButtonBlack,ButtonWhite} from '~/components/ui/UIverse/Buttons'
import { Button } from '../button'
import { Label } from '../label'
import AddDay from './AddDay'
import { DeleteIcon, GrabIcon, TrashIcon } from 'lucide-react'
import { Accordion } from '../accordion'
import addWorkout from '~/lib/actions'
import UIverseButton from '~/components/UIverseButton'
import AddRestDay from './AddRestDay'
import Container from '../Container'

export default function CreateWorkout({user}:{user:string | undefined | null}) {
    const [newKey, setNewKey] = React.useState(0) 
    const [dayRest, setDayRest] = React.useState<{day: string ,change:number}>( )
    
    const [days, setDays] = React.useState<ReactElement[]>([])
    const email = user || 'none'
    const [removedDay,setRemovedDay] = React.useState<number>()
    function removeDay(id:number){
        
        setRemovedDay(id)
    }
    //remove Day
    React.useEffect(()=>{
      if(removedDay){
        // setDays([...days]?.filter(day => day.key != removedDay))
        setDays([...days]?.filter(day => Number(day.key) != removedDay))
        setOrder([...order]?.filter(day => day.index != removedDay))
      }
    },[removedDay])
    //edit Day name(still not working)
    
    //add Day component
    React.useEffect(()=>{
      if(newKey)
        if(dayRest?.day === 'train')
        setDays(days => [...days , <AddDay  remove={removeDay} id={newKey} key={newKey} muscles='legs,arms,chest'  />])
        else setDays(days => [...days , <AddRestDay remove={removeDay} id={newKey} key={newKey} />])   
        // console.log(days) 

    },[newKey])

    //add Day to order
    React.useEffect(()=>{
      if(dayRest){
      setNewKey(newKey+1)
    }
    },[dayRest])

    console.log(days)
    return (
    <Container className='h-full'>
     <form className="h-full rounded-lg border border-gray-200  p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 space-y-2" action={addWorkout}>
        <input type="hidden" name='email' value={email} />
          <div className='pt-1 flex items-center'>
          <UIverseButton  name='workoutName' placeHolder="Workout name..." />
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
        <ButtonWhite type='submit' className="mt-4" size="sm" >
          Save workout
          </ButtonWhite>
        </div>
      </form>
  
  
    </Container>

  )
}