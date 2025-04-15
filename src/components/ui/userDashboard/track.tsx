"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Image from "next/image";
import React from "react";
import { andika, lalezar } from "~/components/ui/font";
import Container from "~/components/ui/userDashboard/Container";
import { Input } from "@nextui-org/react";
import { logWorkoutAction } from "~/lib/actions";
import { type WorkoutDetails } from "~/app/(userPages)/(sideBars)/dashboard/track/page";
import { useFormState } from "react-dom";
import { Button } from "../button";
import { useForm } from "react-hook-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { type WorkoutLog} from "~/lib/types";
type Props = {
  workout: WorkoutDetails, totalSets: number, totalReps: number,
  lastSession:{
    id: number;
    date: Date;
    userId: string | null;
    workoutId: number | null;
    logs: unknown;
    duration: number | null;
} | undefined

}
export default function Track({ workout, totalSets, totalReps,lastSession }: Props) {
  const [state, action] = useFormState(logWorkoutAction, null);
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
  const date = new Date()


  return (
    <form action={action}
      className={`${andika.className} w-full space-y-5 p-5 text-[#707877]`}
    >
      <input type="hidden" name="workoutID" value={workout?.id}/>
      <input type="hidden" name="date" value={date.toISOString()}/>
      <div>
        <h1 className="text-lg font-semibold">Track my workout</h1>
        <p className="mb-3 text-sm opacity-70">Today, {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
        
      </div>
      <Container className="grid w-full grid-cols-1 content-around justify-center gap-5 bg-xtraDark text-[#fcfcfc] md:grid-cols-6 ">
        <Image
          src={"https://s3.eu-north-1.amazonaws.com/proload.me/ach4.jpg"}
          className="aspect-square w-full md:w-1/2"
          alt={"ach"}
          width={7}
          height={1}
        />
        <div className="">
          <h1 className="text-xl font-semibold">Workout:</h1>
          <p className="text-lg opacity-85">{workout?.name}</p>
          <p className="text-xl font-semibold mt-3">
            Session: <span className="font-normal opacity-85">{date.toLocaleDateString('en-US', { weekday: 'long' })} {date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</span>
          </p>
        </div>
        <div className="md:col-start-4">
          <h1 className="text-lg">Days: {workout?.numberOfDays}</h1>
          <h1 className="text-lg">Sets: {totalSets} </h1>
          <h1 className="text-lg">Weights: 555kg</h1>
        </div>
        <div>
          <h1 className="text-lg">Reps: {totalReps}</h1>
          <h1 className="text-lg">Rest: 2mn</h1>
          <h1 className="text-lg">Workout ID: {workout?.id} </h1>
        </div>
      </Container>
{lastSession && new Date(lastSession.date).toDateString() === new Date().toDateString() ? (
  <Container className="p-5">
    <h2 className="text-xl font-semibold mb-4">Today's Session Already Logged</h2>
    <div className="space-y-5">
      <div className="flex gap-4">
        <p>Date: {new Date(lastSession.date).toLocaleDateString()}</p>
        <p>Duration: {lastSession.duration} minutes</p>
        <p>Workout ID: {lastSession.workoutId}</p>
      </div>
      {(lastSession.logs as WorkoutLog ) && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exercise</TableHead>
              {Array.from({ length: Math.max(...(lastSession.logs as WorkoutLog[]).map(ex => ex.sets.length)) }).map((_, i) => (
                <TableHead key={i}>Set {i + 1}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(lastSession.logs as {
              name: string;
              sets: { setIndex: string; weight: string }[];
            }[]).map((exercise) => (
              <TableRow key={exercise.name}>
                <TableCell>{exercise.name}</TableCell>
                {exercise.sets.map((set) => (
                  <TableCell key={`${exercise.name}-${set.setIndex}`}>
                    {set.weight} kg
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  </Container>
) : (
  <Container className=" border-0 border-green-600 bg-xtraLight/15  shadow-md">
    <Tabs className="space-y-10 px-7" defaultValue="1">   
      <p>Choose a workout</p>
      <TabsList className="bg-transparent gap-2">
        {workout?.days.map((day, i) => (
          <TabsTrigger
            value={day.dayIndex.toString()}
            key={i}
            className="space-y-2 border-1  flex flex-col items-start bg-white p-5 text-[#03152d] focus:border-green-900 "
          >
            <h2 className="text-md font-semibold">day{day.dayIndex}: {day.name}</h2>
            <p className="text-xs">
              {day.exercices
                .slice(0, 3)
                .map((exercice) => exercice.name)
                .join(", ")}
            </p>
          </TabsTrigger>
        ))}
      </TabsList>
      {workout?.days.map((day, i) => (
        <TabsContent value={day.dayIndex.toString()} key={i} className="space-y-5">
          <input type="hidden" name="dayName" value={day.name} />
          <h1 className={`text-2xl ${lalezar.className} font-bold`}>day {workout?.days[i]?.dayIndex}: {workout?.days[i]?.name}</h1>
          <Input
          name="duration"
          type="number"
          variant="faded"
          size="sm"
          label="Duration (minutes)"
          className="max-w-xs"
        />
          {workout?.days[i]?.exercices.map((ex, index) => (
            <div
              key={index}
              className="space-y-2 border-b-2 border-xtraDark pb-3 "
            >
              <p className="text-sm font-semibold">{ex.name}</p>
              <div
                className={`grid grid-cols-${ex.sets} justify-stretch  gap-5 px-2 pt-5 `}
              >
                {Array.from({ length: ex.sets }).map((_, i) => (
                  <div
                    key={i}
                    className="flex  items-center gap-4 space-y-2 bg-slate-50 p-5 text-[#03152d] border-1 border-slate-100 shadow-md"
                  >
                    <h2 className="mt-2 text-nowrap text-sm">
                      set {i + 1}:
                    </h2>
                    <Input
                      {...register(`ex.${ex.name}.sets.${i+1}`)}
                      variant="bordered"
                      size="sm"
                      className="mt-0"
                      placeholder="weight (kg)"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      ))}
    </Tabs>
    <Button type="submit" className="relative left-7 top-4 bg-xtraGreen mt-3">Save</Button>
  </Container>
)}
    </form>
  )
}