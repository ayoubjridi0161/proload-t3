import React from 'react'
import { andika } from '../font'
import Container from './Container'
import { Button } from '../button'
import { PlusCircle, Dumbbell, Target } from 'lucide-react'
import { Sidebar, SidebarContent } from '../sidebar'
import WorkoutCalendar from './workoutCalendar'

export default function NewUser({userLogs}:{userLogs:
  {
    date: Date;
    id: number;
    userId: string | null;
    workoutId: number | null;
    logs: unknown;
    duration: number | null;
    dayName:string|null
}[]
}) {
const workoutDates = userLogs?.map(log => ({date:log.date,dayName:log.dayName}));

  return (
    <>
    <div className={`p-5 w-full ${andika.className}`}>
      <div className="text-[#4a4a4a] text-lg">
        <h1 className="font-bold">Welcome to Your Fitness Journey!</h1>
        <p className="text-sm">Let's start tracking your progress towards your fitness goals</p>
      </div>   

      <div className="grid grid-cols-3 w-10/12 mx-auto p-5 gap-5">
        <Container className="border-1 border-[#de4e8d1] space-y-2 shadow-md">
          <div className="rounded-full p-3 w-fit bg-[#d4fae0]">
            <PlusCircle className="h-6 w-6 text-[#256279]" />
          </div>
          <h2 className="text-md font-semibold">Start Tracking</h2>
          <h1 className="text-lg font-bold">Log Your First Workout</h1>
          <p className="text-sm">Begin your fitness journey today</p>
          <Button className="bg-[#256279] text-white hover:bg-[#1a4456]">Create Workout</Button>
        </Container>  

        <Container className="border-1 border-[#de4e8d1] space-y-2 shadow-md">
          <div className="rounded-full p-3 w-fit bg-[#d4fae0]">
            <Target className="h-6 w-6 text-[#256279]" />
          </div>
          <h2 className="text-md font-semibold">Set Goals</h2>
          <h1 className="text-lg font-bold">Define Your Targets</h1>
          <p className="text-sm">What do you want to achieve?</p>
          <Button className="bg-[#256279] text-white hover:bg-[#1a4456]">Set Goals</Button>
        </Container>

        <Container className="border-1 border-[#de4e8d1] space-y-2 shadow-md">
          <div className="rounded-full p-3 w-fit bg-[#d4fae0]">
            <Dumbbell className="h-6 w-6 text-[#256279]" />
          </div>
          <h2 className="text-md font-semibold">Explore Workouts</h2>
          <h1 className="text-lg font-bold">Browse Programs</h1>
          <p className="text-sm">Find the perfect workout plan</p>
          <Button className="bg-[#256279] text-white hover:bg-[#1a4456]">View Programs</Button>
        </Container>
      </div>

        <div className="col-span-2 w-full space-y-5">
          <Container className="text-center p-8 text-[#4a4a4a]">
            <h1 className="text-xl font-bold mb-4">Getting Started Guide</h1>
            <div className="space-y-4 text-left">
              <div className="p-4 bg-[#f8f9fa] dark:bg-xtraDarkAccent dark:border-xtraDark border-1 rounded-lg shadow-sm">
                <h2 className="font-semibold text-lg mb-2">1. Create Your Profile</h2>
                <p className="text-sm opacity-70">Set up your profile with your fitness goals and preferences</p>
              </div>
              <div className="p-4 bg-[#f8f9fa] dark:bg-xtraDarkAccent dark:border-xtraDark border-1 rounded-lg  shadow-sm">
                <h2 className="font-semibold text-lg mb-2">2. Choose a Program</h2>
                <p className="text-sm opacity-70">Select a workout program that matches your goals</p>
              </div>
              <div className="p-4 bg-[#f8f9fa] dark:bg-xtraDarkAccent dark:border-xtraDark border-1 rounded-lg  shadow-sm">
                <h2 className="font-semibold text-lg mb-2">3. Track Your Progress</h2>
                <p className="text-sm opacity-70">Log your workouts and monitor your improvements</p>
              </div>
            </div>
          </Container>
        
        
      </div>
    </div>
    <Sidebar side='right'  className="border-left-1 dark:border-xtraDarkAccent px-3 top-[--header-height] !h-[calc(100svh-var(--header-height))]" >
    <SidebarContent>
    <WorkoutCalendar workoutDates = {workoutDates}/>

    <div className="space-y-5">
          <Container className="bg-xtraDark text-[#c8d8e7] p-6">
            <h1 className="text-lg font-bold mb-4">Quick Tips</h1>
            <div className="space-y-3">
              <p className="text-sm">• Start with achievable goals</p>
              <p className="text-sm">• Stay consistent with logging</p>
              <p className="text-sm">• Track your form and technique</p>
              <p className="text-sm">• Remember to warm up properly</p>
              <p className="text-sm">• Stay hydrated during workouts</p>
            </div>
          </Container>
        </div>
    </SidebarContent>
    </Sidebar>
    
    </>
  )
}