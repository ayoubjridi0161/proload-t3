import React from 'react'
import { Button } from '../button'
import { TrashIcon } from 'lucide-react'

type Props = {
    addExercice : (exercice : exercice)=>void
}
type exercice = {
    exName : string,
    sets : number,
    reps : number

}

export default function AddExercice(props: Props) {
    const [Exercice,setExercice] = React.useState<exercice>({exName : "Deadlifts", sets : 4, reps : 8})
    
  return (
     
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <div className="flex items-center space-x-4">
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="exerciseName"
        >
          Exercise Name
        </label>
        <input
          className="block w-full rounded-md border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
          id="exerciseName"
          placeholder="e.g. Deadlifts"
          type="text"
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExercice((prev) => ({ ...prev, reps: parseInt(e.target.value) }))}

        />
      </div>
    </div>
    <Button onClick={()=>{props.addExercice(Exercice)}} size="sm" variant="outline">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>    </Button>
  </div>
  )
}