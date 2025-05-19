import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import { TrashIcon } from 'lucide-react'
import ExerciceCard from './Exercice'
import { ButtonBlack } from '../UIverse/Buttons'
import { Autocomplete, AutocompleteItem, AutocompleteSection } from '@nextui-org/autocomplete'
import { type ExerciseNames } from '~/lib/types'
import { useWorkout ,type WorkoutDay } from './WorkoutContext'
type Props = {
    dayIndex:number
    exercice: ExerciseInterface
    isShown?:boolean
}
type ExerciseInterface = {
    id:number,
    name : string,
    sets : number,
    reps : number,
}


export default function AddExercise(props: Props) {
    const store = useWorkout()
  const muscleGroups = [...new Set(store.exerciseNames.map(ex => ex.muscleGroup))]
    const [showExercice,setShowExercice] = React.useState(props.isShown ?? true)  
    const [value,setValue] = React.useState<React.Key>(props.exercice.name)


    useEffect(() => {
        if (value) {
          store.updateExercise(props.dayIndex,props.exercice.id,{name: value as string})
        }
    }, [value]);
    
  return (
     <>
    {showExercice ? 
    <div className=' items-center flex justify-between '>
      <ExerciceCard 
        className={"bg-white text-xtraText border-border dark:bg-xtraDarkAccent opacity-80"} 
        delete={() => {store.removeExercise(props.dayIndex,props.exercice.id)}} 
        image={store.exerciseNames.find(ex => value == ex.name)?.images[0] ?? null}  
        name={props.exercice.name} 
        sets={props.exercice.sets} 
        reps={props.exercice.reps} 
        edit={() => {setShowExercice(prev => !prev)}} 
      />
    </div> :   
<div className="flex items-center h-fit rounded-lg w-full border border-border bg-slate-300 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
 <div className="flex items-center space-x-4 ">
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="exerciseName"
        >
          Exercise Name
        </label>
        <Autocomplete 
          label="Select an exercice" 
        className="max-w-xs" 
        selectedKey={value as string}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onSelectionChange={setValue as any}

      >
        {muscleGroups.map((group) => (
          <AutocompleteSection key={group} showDivider title={group}>
            {store.exerciseNames
              .filter((exercice) => exercice.muscleGroup === group)
              .map((exercice) => (
                <AutocompleteItem key={exercice.name} value={exercice.name}>
                  {exercice.name}
                </AutocompleteItem>
              ))}
          </AutocompleteSection>
        ))}
      </Autocomplete>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="sets">
          Sets
        </label>
        <input
          className="block w-full rounded-md border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
          id="sets"
          placeholder="3"
          type="number"
          defaultValue={props.exercice.sets}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => store.updateExercise(props.dayIndex,props.exercice.id ,{sets:Number(e.target.value)}) }
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="reps">
          Reps
        </label>
        <input
          className="block w-full rounded-md border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
          id="reps"
          placeholder="8"
          type="number"
          defaultValue={props.exercice.reps}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => store.updateExercise(props.dayIndex,props.exercice.id,{reps:Number(e.target.value)}) }

        />
      </div>
    </div>
    <ButtonBlack type='button' className='mt-10' onClick={()=>{setShowExercice(prev => !prev)}} size="sm" variant="outline">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>   
     </ButtonBlack>
  </div>}
  </>
  )
}