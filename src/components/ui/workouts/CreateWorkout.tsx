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
    
    const [days, setDays] = React.useState<ReactElement[]>([])
    const [order,setOrder] = React.useState<{index:number,dayName:string,action:"train"|"rest"}[]>([])
    const email = user || 'none'
    const [removedDay,setRemovedDay] = React.useState<number>()
    function removeDay(id:number){
        // setDays([...days]?.filter((day)=> day.key || 1 != id))
        setRemovedDay(id)
    }
    //remove Day
    React.useEffect(()=>{
      if(removedDay){
        // setDays([...days]?.filter(day => day.key != removedDay))
        console.log(days)
        setDays([...days]?.filter(day => Number(day.key) != removedDay))
      }
    },[removedDay])
    function editDayName(id:number,name:string){
        // setOrder([...order]?.map((day)=>{if(day.index === id){day.dayName = name}return day}))
    }
    //add Day
    React.useEffect(()=>{
      if(newKey)
        setDays(days => [...days , <AddDay editDayName={editDayName} remove={removeDay} id={newKey} key={newKey} muscles='legs,arms,chest'  />])
    },[newKey])
    // console.log(days)
    return (
    <Container className='h-full'>
     <form className="h-full rounded-lg border border-gray-200  p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 space-y-2" action={addWorkout}>
        <input type="hidden" name='order' value={JSON.stringify(order)} />
        <input type="hidden" name='email' value={email} />
          <div className='pt-1 flex items-center'>
          <UIverseButton  name='workoutName' placeHolder="Workout name..." />
          </div>
          <div className='space-y-4'>
          {days}
          </div>  
        <div className='flex justify-between'>
          <div className='space-x-4'>
          <Button type='button' onClick={()=>{setNewKey(prev => prev+1);}} className="mt-4" size="sm" variant="default">
          Add Workout Day
        </Button>
        
        <Button type='button' onClick={()=>{setNewKey(prev => prev+1)}} className="mt-4" size="sm" variant="default">
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