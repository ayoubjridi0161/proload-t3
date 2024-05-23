"use client"
import React from 'react'
import { Input } from '../input'
import { Button } from '../button'
import { Label } from '../label'
import AddDay from './AddDay'
import { DeleteIcon, GrabIcon, TrashIcon } from 'lucide-react'
import { Accordion } from '../accordion'

export default function CreateWorkout() {
    const [daysID, setDaysID] = React.useState(1)
    const [days, setDays] = React.useState([<AddDay remove = {removeDay}   id={daysID} key={daysID} muscles='legs,arms,chest' />,])
    function removeDay(id:number){
        setDays(Prev => Prev.filter((day)=>day.props.id !== id))
    }
    
  return (
    <section className='m-5'>
     <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">Workout Plan</h2>
          <div className='space-y-4'>
          {days}
          </div>
        
        <Button onClick={()=>{setDaysID(prev => prev+1) ; setDays(Prev => [...Prev, <AddDay remove={removeDay} id={daysID} key={daysID} muscles='legs,arms,chest' />])}} className="mt-4" size="sm" variant="outline">
          Add Workout Day
        </Button>
      </div>
  
  
    </section>

  )
}