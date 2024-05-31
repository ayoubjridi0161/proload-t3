"use client"
import React, { ReactElement, useRef } from 'react'
import { Label } from '../label'
import { Button } from '../button'
import { TrashIcon } from 'lucide-react'


type Props = {
    id: number,

}

export default function AddRestDay(props : Props) {
    


  return (
    <div className='space-y-4 border rounded-lg '>
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center space-x-4">
                {/*dumbbell*/}
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-dumbbell"><path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/></svg>
                {/*dayName */}
                <div className='flex items-center mb-2'>
                <Label className='pr-3 text-xl'>Day {props.id} : Rest</Label>
                </div>
                <Button className='justify-self-end' size="sm" variant="outline"><TrashIcon className="h-4 w-4" /></Button>
            </div>            
        </div>
    </div>        
  )
}
