"use client"
import React from 'react'
import { Label } from '../label'
import { Input } from '../input'
import { Button } from '../button'
import { Pencil, GrabIcon, TrashIcon } from 'lucide-react'
import { AccordionItem, AccordionTrigger, AccordionContent } from '../accordion'


type Props = {
    muscles: string,
    id: number,
    remove: (id:number)=>void

}

export default function AddDay(props : Props) {
    const [dayName,setDayName] = React.useState('')
    const [isDay,setIsDay] = React.useState(false)

  return (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <GrabIcon className=" text-gray-500 dark:text-gray-400" />
              <div>
                <h3 className="text-lg font-semibold">Leg Day</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Muscles Targeted: {props.muscles} id: {props.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button onClick={()=>{props.remove(props.id   )}} size="sm" variant="outline">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
  )
}