"use client"
import React from 'react'
import Image from "next/image"
import { Button } from "~/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "~/components/ui/card"
import { Chip } from '@nextui-org/react'

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
                <Chip className="col-start-1 row-start-1 place-self-center ">Sets: {props.sets}</Chip>
                <Button className='border-xtraDark border-1 col-start-1 row-start-2 text-xtraText rounded-[25px]' type='button' onClick={props.edit} size="sm" variant="ghost">
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
                <Chip className="col-start-3  place-self-center self-center">Reps: {props.reps}</Chip>
                <Button className='col-start-3 border-xtraDark border-1 row-start-2 text-xtraText rounded-[25px]' onClick={props.delete} type='button' color="destructive" size="sm" variant="ghost">
                  Delete
                </Button>
            </CardContent>
          </Card>
  )
}