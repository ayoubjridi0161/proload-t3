"use client"
import React from 'react'
import Image from "next/image"
import { Button } from "~/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "~/components/ui/card"

type Props = {
    name:string
    edit:()=>void
    sets:number
    reps:number
    delete:()=>void
    className:string 
    image:string | null
}

export default function ExerciceCard(props: Props) {


  return (
    <Card className={props.className}>
            <CardHeader>
              <CardTitle className='min-h-8'>{props.name}</CardTitle>
              <CardDescription>Back, Biceps</CardDescription>
            </CardHeader>
            
            <CardContent className="grid grid-cols-3 grid-rows-2 gap-4">
                <span className="col-start-1 row-start-1 text-sm self-center place-self-center font-medium">Sets: {props.sets}</span>
                <Button className='col-start-1 row-start-2' type='button' onClick={props.edit} size="sm" variant="ghost">
                  Edit
                </Button>
              {props.image && (
                <div className="row-span-2 flex items-center justify-center">
                  <Image 
                    src={props.image} 
                    alt={props.name}
                    width={20}
                    height={20}
                    className="max-h-40 w-20 object-contain"
                  />
                </div>
              )}
                <span className="col-start-3 text-sm font-medium place-self-center self-center">Reps: {props.reps}</span>
                <Button className='col-start-3 row-start-2' onClick={props.delete} type='button' color="destructive" size="sm" variant="ghost">
                  Delete
                </Button>
            </CardContent>
          </Card>
  )
}