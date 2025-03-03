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
import { fetchWorkoutById } from "~/lib/data";
import { Input } from "@nextui-org/react";
const page = async () => {
  const workout = await fetchWorkoutById(5);
  const totalExercices = workout?.days.flatMap((day) => day.exercices) || [];
  const totalSets = totalExercices.reduce(
    (acc, exercice) => (acc + exercice.sets) as number,
    0,
  );
  const totalReps = totalExercices.reduce(
    (acc, exercice) => acc + exercice.sets * exercice.reps,
    0,
  );
  let j =0;
  const daysList = null

  
  
  

  // const totalSets = totalSetsPerDay.reduce((acc,sets)=>acc+sets,0)

  return (
    <section
      className={`${andika.className} w-full space-y-5 p-5 text-[#707877]`}
    >
      <div>
        <h1 className="text-lg font-semibold">Track my workout</h1>
        <p className="mb-3 text-sm opacity-70">Today, august 24</p>
      </div>
      <Container className="grid w-full grid-cols-1 content-around justify-center gap-5 bg-xtraDark text-[#fcfcfc] md:grid-cols-6">
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
      <Container className="space-y-5 border-0 border-green-600 bg-xtraLight/15 px-7 shadow-md">
        <p>Choose a workout</p>
        <div
          className={`grid grid-cols-${workout?.days.length} justify-stretch  gap-5`}
        >
          {workout?.days.map((day, i) => (
            <div
              key={i}
              className="space-y-2 border-1 border-green-900 bg-white p-5 text-[#03152d] "
            > 
              <h2 className="text-md font-semibold">day{day.dayIndex}: {day.name}</h2>
              <p className="text-xs">
                {day.exercices
                  .slice(0, 3)
                  .map((exercice) => exercice.name)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
        <hr className=" border-1 border-green-100" />
        <h1 className={`text-2xl ${lalezar.className} font-bold`}>day {workout?.days[0]?.dayIndex}: {workout?.days[0]?.name}</h1>
        <Accordion type="single" collapsible className="w-full">
          {workout?.days[0]?.exercices.map((ex, index) => (
            <AccordionItem
              key={index}
              className="space-y-2 border-b-2 border-xtraDark pb-3 "
              value={`item-${index}`}
            >
                  <AccordionTrigger>
                    <p className="text-sm font-semibold">{ex.name}</p>
                  </AccordionTrigger>
                  <AccordionContent>
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
                            variant="bordered"
                            size="sm"
                            className="mt-0"
                            placeholder="weight (kg)"
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};

export default page;
