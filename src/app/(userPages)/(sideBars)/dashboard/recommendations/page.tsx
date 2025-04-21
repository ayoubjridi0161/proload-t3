import { Select, SelectItem } from '@nextui-org/react'
import { SelectTrigger, SelectValue, SelectContent } from '@radix-ui/react-select'
import React from 'react'
import { Button } from 'react-day-picker'
import { Form } from 'react-hook-form'
import { FormField } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { getUserProfile } from '~/lib/actions/userActions'
import {Recommendations , Recommendation} from '~/components/ui/userDashboard/recommendation'

export default async function RecommendationsPage() {
  const userProfile = await getUserProfile(["details"]) as {details:{
    bmi:string,
    age:string,
    gender:string,
    height:string,
    experience:string,
    weight:string,
    fitnessLevel: string,
    fitnessGoal: string,
  }}
return(
  <>
{
  Object.values(userProfile.details).every(value => Boolean(value)) ? (
    // If all fields are filled, fetch and display recommendations
    <Recommendation details={userProfile.details}/>
  ) : (
    // If any field is missing, show the basic Recommendations component
    <Recommendations details={userProfile.details}/>
  )
}
</>
)
}