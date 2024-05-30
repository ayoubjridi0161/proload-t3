"use client"
import React from 'react'

import { Button } from "~/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "~/components/ui/card"

type Props = {
    name:string
    edit:()=>void
    sets:number
    reps:number
    delete:()=>void
    className:string 
}

export default function ExerciceCard(props: Props) {


  return (
    <Card className={props.className}>
            <CardHeader>
              <CardTitle>{props.name}</CardTitle>
              <CardDescription>Back, Biceps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sets: {props.sets}</span>
                <span className="text-sm font-medium">Reps: {props.reps}</span>
              </div>
              <div className="flex items-center justify-between">
                <Button type='button' onClick={props.edit} size="sm" variant="ghost">
                  Edit
                </Button>
                <Button onClick={props.delete} type='button' color="destructive" size="sm" variant="ghost">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
  )}