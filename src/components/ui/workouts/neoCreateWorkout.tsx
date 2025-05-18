"use client"
import React from 'react'
import '~/components/ui/UIverse/Button.css'
import { Button } from '../button'
import AddDay from './neoAddDay'
import addWorkout, { generationAction } from '~/lib/actions/workout'
import AddRestDay from './neoAddRestDay'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Textarea } from '../textarea'
import {useWorkout, type WorkoutDay} from "./WorkoutContext"
import { Input } from '../input'
import AIicon from '~/components/AIicon'
import { useMemo, useRef, useEffect ,useState} from 'react'
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { toast } from 'sonner'
import { stringToAscii } from '~/lib/utils'


type ResponseExercise = {
  name: string;
  reps: number;
  sets: number;
};

type ResponseWorkoutDay = {
  index: number;
  name: string;
  exercises: ResponseExercise[];
};

type WorkoutPlan = {
  days: ResponseWorkoutDay[];
  description: string;
  name: string;
  numberOfDays: number;
};
export default function CreateWorkout() 
{ 
  const formRef = React.useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [isPublished, setIsPublished] = React.useState<boolean|null>(null)
   React.useEffect(()=>{
const handleSubmit = async ()=>{
  if( typeof isPublished === 'boolean' )
    try{setIsSubmitting(true)
    const sent = new FormData()
    sent.append('workoutName', store.workoutName);
    sent.append('description', store.description);
    sent.append('days', JSON.stringify(store.days));
    sent.append("isPublished", isPublished?.toString() ?? "false")
    if(store.days.length > 0 && store.workoutName){
    const response = await addWorkout(sent);
    if(response?.code === 402){
      toast.error(response?.message)
    }else{
      toast.success("workout created")
    }
  }else{
    toast.error("some required fields are empty")
  }
}catch(error){
  toast.error("couldn't save workout")
}finally{
  setIsSubmitting(false)
  setIsPublished(null)
}}
void handleSubmit()
},[isPublished])
    const store = useWorkout()
    console.log(store.days)
    const exerciseNames = store.exerciseNames.map(x => x.name)
    const [isGenerating, setIsGenerating] = React.useState(false);
    const generateWorkoutButton = async () => {
      setIsGenerating(true);
      try {
        const response = await generationAction(exerciseNames,"workout",{workout:{name:store.workoutName,description:store.description,days:store.days}})
        if(!response || response.status == 503){
            toast.error(response?.message)
            setIsGenerating(false);
            return
        }
        const parsedResponse = JSON.parse(response?.message) as WorkoutPlan;
        if(parsedResponse.name) store.setWorkoutName(parsedResponse.name);
        if(parsedResponse.description) store.setDescription(parsedResponse.description);
        
        // Create a new array for days instead of modifying state directly
        const newDays: WorkoutDay[] = [];
        
        for (const day of parsedResponse.days) {
          const dayId = Math.floor(Math.random() * 10000)+ stringToAscii(day.name)
          if(day.exercises && day.exercises.length > 0) {
            newDays.push({
              id: dayId,
              type: 'workout',
              name: day.name,
              exercises: day.exercises.map((ex,index) => ({
                id: dayId+index,
                name: ex.name,
                sets: ex.sets,
                reps: ex.reps
              }))
            });
          } else {
            newDays.push({
              id: dayId,
              type: 'rest',
              name: day.name
            });
          }
        }
        
        // Update all days at once
        store.setDays(newDays);
      }
       finally {
        setIsGenerating(false);
      }
    };  
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const days = store.days;
        const oldIndex = days.findIndex((item) => item.id === active.id);
        const newIndex = days.findIndex((item) => item.id === over.id);
        store.setDays(arrayMove(days, oldIndex, newIndex));
      }
    }
    return (
      <div className='h-full w-full relative z-10 mx-auto'>
        {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
        <form className=" z-30 h-full bg-transparent sm:p-6 space-y-4" >
          <input type="hidden" name='published' value={isPublished?.toString()} />
          <div className='pt-1 flex justify-between items-center'>
            <Input className='w-1/5' onChange={(e)=> {store.setWorkoutName(e.target.value)}} placeholder="Workout name..." aria-label="Enter workout name" value={store.workoutName} />
            <Button 
              type='button' 
              onClick={() => void generateWorkoutButton()} 
              variant={"ghost"} 
              className='hover:bg-white space-x-2' 
              size={"sm"}
              disabled={isGenerating}
            >
              <AIicon/>
              {isGenerating ? (
                <span>Generating...</span>
              ) : (
                <span>generate workout</span>
              )}
            </Button>
          </div>
          <Textarea onChange={(e)=> {store.setDescription(e.target.value)}} value={store.description} name='description' className='w-1/2' placeholder='drop out a note for the workout'/>
          
          <div className='space-y-4 '>
          <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}>
            <SortableContext items={store.days} strategy={verticalListSortingStrategy}>
            {store.days.map((day, index) => {
              if(day.type === 'workout' ){
              return(
              <AddDay id={day.id} key={day.id+index} details={day}/>
            ) }
            else {
              return(
                  <AddRestDay id={day.id} key={day.id} />
              )
          }
            })}
            </SortableContext>
            </DndContext>
          </div>  
          <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
            <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
              <Button type='button' onClick={()=> {store.addWorkoutDay()}} className="z-50 bg-xtraGreen hover:bg-xtraGreen/90 w-full sm:w-auto" size="sm" >
                Add Workout Day
              </Button>
              <Button type='button' onClick={()=>{store.addRestDay()}} className=" z-50 bg-xtraGreen hover:bg-xtraGreen/90 w-full sm:w-auto" size="sm">
                Add Rest Day
              </Button>
            </div>
            <Dialog setPubslished={setIsPublished} />
            {/* <Button>save</Button> */}
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
          would you like to make this workout public for everyone to see
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
      <AlertDialogAction className='hover:opacity-30' onClick={()=>{setPubslished(false)}}  >No</AlertDialogAction>
      <AlertDialogAction className='hover:opacity-30' onClick={()=>{setPubslished(true)}} >Yes</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}
  