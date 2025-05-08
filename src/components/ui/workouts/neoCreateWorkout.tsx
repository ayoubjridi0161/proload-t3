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

  const [isPublished, setIsPublished] = React.useState<boolean>()
//    React.useEffect(()=>{
//   console.log("submit");
//   if( typeof isPublished === 'boolean' )
//     formRef.current?.requestSubmit()
//     // router.push('/workouts')
// },[isPublished])
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
          if(day.exercises && day.exercises.length > 0) {
            const dayId = Math.floor(Math.random() * 100)+ Date.now()
            newDays.push({
              id: dayId,
              type: 'workout',
              name: day.name,
              exercises: day.exercises.map(ex => ({
                id: Math.floor(Math.random() * 100000)+ Date.now(),
                name: ex.name,
                sets: ex.sets,
                reps: ex.reps
              }))
            });
          } else {
            newDays.push({
              id: Math.floor(Math.random() * 100000)+ Date.now(),
              type: 'rest',
              name: day.name
            });
          }
        }
        console.log("", newDays);
        
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
        <form action={async (formData: FormData) => {
          const sent = new FormData()
          sent.append('workoutName', store.workoutName);
          sent.append('description', store.description);
          sent.append('days', JSON.stringify(store.days));
          sent.append("isPublished", isPublished?.toString() ?? "false")
          await addWorkout(sent);
        }}  className=" z-30 h-full bg-transparent sm:p-6 space-y-4" >
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
              <AddDay id={day.id} key={day.id} details={day}/>
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
              <Button type='button' onClick={()=> {store.addWorkoutDay()}} className="z-50 w-full sm:w-auto" size="sm" variant="default">
                Add Workout Day
              </Button>
              <Button type='button' onClick={()=>{store.addRestDay()}} className=" z-50 w-full sm:w-auto" size="sm" variant="default">
                Add Rest Day
              </Button>
            </div>
            {/* <Dialog setPubslished={setIsPublished} /> */}
            <Button>save</Button>
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
  