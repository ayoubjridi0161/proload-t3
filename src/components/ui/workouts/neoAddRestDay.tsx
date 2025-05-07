"use client"
import React, { ReactElement, useRef } from 'react'
import { Label } from '../label'
import { Button } from '../button'
import { GripVertical, TrashIcon } from 'lucide-react'
import Container from '../Container'
import { useWorkout } from './WorkoutContext'
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


type Props = {
    id: number,
}

export default function AddRestDay(props : Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    
    const {removeDay} = useWorkout() 

    return (
        <div ref={setNodeRef}
        style={style}
        className=''>
            <input type="hidden" name="day" value={JSON.stringify({name:"rest",index:props.id})} />
            <div className="flex items-center justify-between rounded-lg p-4 shadow-sm dark:bg-xtraDarkPrimary bg-xtraContainer">
                <div className="flex justify-between w-full items-center space-x-4">
                    <div className='flex items-center gap-5'>
                    {/*dumbbell*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dumbbell"><path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/></svg>
                    {/*dayName */}
                    <Label className='pr-3 text-2xl text-destructive '>Rest</Label>
                    </div>
                    <div className='flex items-center gap-2'>
                    <Button type='button' onClick={()=>{removeDay(props.id)}} className='justify-self-end' size="sm" variant="default"><TrashIcon className="h-4 w-4" /></Button>
                    <button type='button' 
                        {...attributes}
                        {...listeners} 
                        className='cursor-move'
                    >
                        <GripVertical/>
                    </button>
                    </div>
                </div>            
            </div>
        </div>        
    )
}
