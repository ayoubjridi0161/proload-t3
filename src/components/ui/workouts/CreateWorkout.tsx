"use client"
import React, { ReactElement } from 'react'
import { Input } from '../input'
import { Button } from '../button'
import { Label } from '../label'
import AddDay from './AddDay'
import { DeleteIcon, GrabIcon, TrashIcon } from 'lucide-react'
import { Accordion } from '../accordion'
import addWorkout from '~/lib/actions'
import UIverseButton from '~/components/UIverseButton'
import AddRestDay from './AddRestDay'

export default function CreateWorkout() {
    const [daysID, setDaysID] = React.useState(1)
    const [days, setDays] = React.useState<ReactElement[]>([])
    function removeDay(id:number){
        setDays(Prev => Prev?.filter((day)=>day.props.id !== id))
    }
  
  return (
    <section className='h-full w-full'>
     <form className="h-full rounded-lg border-4 border-black border-double  p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 space-y-2" action={addWorkout}>
        <h2 className="mb-4 text-xl font-semibold">Workout Split</h2>
          <div className='flex items-center  px-1'>
          <UIverseButton placeHolder='name' name='workoutName' />
          </div>
          <div className='space-y-4'>
          {days}
          </div>  
        <div className='flex justify-between'>
          <div className='space-x-4'>
          <Button type='button' onClick={(e)=>{setDaysID(prev => prev+1); setDays(days => [...days , <AddDay remove={removeDay} id={daysID} key={daysID} muscles='legs,arms,chest' />])}} className="mt-4" size="sm" variant="destructive">
          Add Workout Day
        </Button>
        
        <Button type='button' onClick={(e)=>{setDaysID(prev => prev+1); setDays(days => [...days , <AddRestDay id={daysID} key={daysID}/>])}} className="mt-4" size="sm" variant="destructive">
          Add Rest Day
        </Button>
        
        </div>
        <Button type='submit' className="mt-4" size="sm" variant="outline">
          Save workout
          </Button>
        </div>
      </form>
  
  
    </section>

  )
}