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
    
    const [days, setDays] = React.useState<ReactElement[]>([])
    const [order,setOrder] = React.useState<{index:number,dayName:string,action:"train"|"rest"}[]>([])
    function reOrderDays(id:number){
      setOrder([...order]?.map((day)=> {day.index>id?day.index--:day.index;return day}))
    }
    function removeDay(id:number){
        setOrder(order?.filter((day)=>day.index !== id))
        reOrderDays(id)
    }
    function editDayName(id:number,name:string){
        setOrder([...order]?.map((day)=>{if(day.index === id){day.dayName = name}return day}))
    }

  return (
    <section className='h-full'>
     <form className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 space-y-2" action={addWorkout}>
        <input type="hidden" name='order' value={JSON.stringify(order)} />
        <h2 className="mb-4 text-xl font-semibold">Workout Split</h2>
          <div className='flex items-center  px-1'>
          <UIverseButton placeHolder='name' name='workoutName' />
          </div>
          <div className='space-y-4'>
          {days}
          </div>  
        <div className='flex justify-between'>
          <div className='space-x-4'>
          <Button type='button' onClick={(e)=>{setOrder(prev => [...prev,{index:prev.length+1,dayName:"",action:"train"}]); setDays(days => [...days , <AddDay editDayName={editDayName} remove={removeDay} id={order[order.length]?.index || 1} key={order[order.length]?.index || 1} muscles='legs,arms,chest' />])}} className="mt-4" size="sm" variant="destructive">
          Add Workout Day
        </Button>
        
        <Button type='button' onClick={(e)=>{setOrder(prev => [...prev,{index:prev.length+1,dayName:"",action:"rest"}]);setDays(days => [...days , <AddRestDay id={order[order.length]?.index || 1} key={order[order.length]?.index || 1}/>])}} className="mt-4" size="sm" variant="destructive">
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