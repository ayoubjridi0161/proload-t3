import React from 'react'
import ExercicesTable from './exercicesTable'
import { getExerciceNames } from '~/lib/data'

const page =async () => {
  const data = await getExerciceNames()
  const numberedData = data.map((exercice, index) => {return {...exercice, key: index}})
  const separatedData = numberedData.map(d =>  {  return { ...d, musclesTargeted: d.musclesTargeted.join(', '),equipment:d.equipment.join(',') };})
  return (
    <ExercicesTable columns ={ [
      {
        key: "name",
        label: "NAME",
      },
      {
        key: "musclesTargeted",
        label: "MusclesTargeted",
      },
      {
        key: "muscleGroup",
       label: "MuscleGroup"
      },
      {
        key: "equipment",
        label: "Equipment"
      }
    ]}
    numberedData={separatedData} />
  )
}

export default page