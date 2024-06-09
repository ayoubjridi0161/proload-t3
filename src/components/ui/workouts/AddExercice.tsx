import React from 'react'
import { Button } from '../button'
import { TrashIcon } from 'lucide-react'
import ExerciceCard from './Exercice'
import { ButtonBlack } from '../UIverse/Buttons'

type Props = {
    id : string
    dayName : string | undefined
}
type exercice = {
    exName : string,
    sets : number,
    reps : number

}

export default function AddExercice(props: Props) {
    const [Exercice,setExercice] = React.useState<exercice>({exName:'',sets:1,reps:1})
    const [showExercice,setShowExercice] = React.useState(false)  
    const [deleteEx,setDeleteEx] = React.useState(false)

    
  return (
     <>
    {showExercice ? 
    <div className=' items-center flex justify-between '>
      <input type="hidden" disabled={deleteEx} name={`${props.dayName}`} value={JSON.stringify(Exercice)} /> 
      <ExerciceCard className={deleteEx ? "hidden" : ""} delete={()=>{setDeleteEx(true)}}  name={Exercice.exName} sets={Exercice.sets} reps={Exercice.reps} edit={()=>{setShowExercice(prev => !prev)}} />
    </div> :   
<div className="flex items-center justify-between h-fit rounded-lg w-full border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
 <div className="flex items-center space-x-4 ">
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="exerciseName"
        >
          Exercise Name
        </label>
        <input
          required
          className="block w-full rounded-md border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
          id="exerciseName"
          placeholder="e.g. Deadlifts"
          type="text"
          defaultValue={Exercice?.exName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExercice((prev) => ({ ...prev, exName: e.target.value }))}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="sets">
          Sets
        </label>
        <input
          className="block w-full rounded-md border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
          id="sets"
          placeholder="4"
          type="number"
          defaultValue={Exercice.sets.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExercice((prev) => ({ ...prev, sets: parseInt(e.target.value) }))}
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
          defaultValue={Exercice.reps.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExercice((prev) => ({ ...prev, reps: parseInt(e.target.value) }))}

        />
      </div>
    </div>
    <ButtonBlack type='button' className='mt-5' onClick={()=>{setShowExercice(prev => !prev)}} size="sm" variant="outline">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>   
     </ButtonBlack>
  </div>}
  </>
  )
}