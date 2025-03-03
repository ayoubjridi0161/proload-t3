import React from 'react'
import { andika } from '../font'
import ChartData from './Chart'
import Container from './Container'
import { Button } from '../button'

export default function Home() {
  return (
    <div className={ `     p-5 ${andika.className}`}>
      <div className="text-[#4a4a4a] text-lg"><h1 className="font-bold">Good morning, Athlete</h1>
      <p className="text-sm">Track progress and plan workouts for peak performance</p>
      </div>  

      <div className="grid grid-cols-3 w-10/12 mx-auto  p-5 gap-5">
      <Container className="border-1 border-[#de4e8d1] space-y-2 shadow-md">
        <div className="rounded-full p-3 w-fit bg-[#d4fae0]">
        <ProgressIcon />
        </div>
        <h2 className="text-md font-semibold">Weekly progress</h2>
        <h1 className="text-lg font-bold">+15% Strength Gain</h1>
        <p className="text-sm">Your bench press improved significantly</p>
        <Button className="bg-[#256279] text-[#63949E] ">View Details</Button>
      </Container>  
      <Container className="border-1 border-[#de4e8d1] space-y-2 shadow-md"> 
        <div className="rounded-full p-3 w-fit bg-[#d4fae0]">
        <ProgressIcon />
        </div>
        <h2 className="text-md font-semibold">Latest PR</h2>
        <h1 className="text-lg font-bold">Deadlift: 315 lbs</h1>
        <p className="text-sm">New personal record achieved today!</p>
        <Button className="bg-[#256279] text-[#63949E]">See All PRs</Button>
      </Container>
      <Container className="border-1 border-[#de4e8d1] space-y-2 shadow-md">
        <div className="rounded-full p-3 w-fit bg-[#d4fae0]">
        <ProgressIcon />
        </div>
        <h2 className="text-md font-semibold">Streak</h2>
        <h1 className="text-lg font-bold">12 Days!</h1>
        <p className="text-sm">Keep up the consistency</p>
        <Button className="bg-[#256279] text-[#63949E]">View Calebdar</Button>
      </Container>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 w-full space-y-5">
          <ChartData />
          <Container className=" text-[#4a4a4a]">
            <h1 className="text-lg font-bold">Today's Insights</h1>
            <div className="text-[#63949E]">
              {Array.from({length: 2}).map((_,i)=>
              (
              <div key={i} className=" p-2 text-md">
                <p className="font-semibold">Recovery Status</p>
                <p className="opacity-70">Your legs need 24h to rest</p>
              </div>))
              }
            </div>
        
            <h1 className="text-lg font-bold mb-3 mt-5">Quick Actions</h1>
            <Button className="mx-3 bg-[#21c55d] text-[#bfbfbf]">Check Workouts</Button>
            <Button className="mx-2 text-[#bfbfbf]">Track Progress</Button>
            
          </Container>
        </div>
        <div className="space-y-5">
          <Container className="bg-xtraDark text-[#c8d8e7]">
            <h1 className="text-lg font-bold">Workout Summary</h1>
            <div className="text-[#f2fcf5]">
              {[{day:"leg Day",exercises:["squats","leg extensions","sumo Deadlifts"]},{day:"Rest"},{day:"push",exercises:["bench press", "inclined dumbbell press","cable flys"]},{day:"back",exercises:["pull ups","barbell rows","bicep curls"]},{day:"Rest"},{day:"Rest"},{day:"deltoids",exercises:["military press","lateral raises","face pulls"]}].map((_,i)=>
              (
              <div key={i} className=" p-2 ">
                <p className="font-semibold text-md">{_.day}</p>
                <p className="opacity-70 text-sm">{_.exercises}</p>
              </div>))
              }
            </div>
          </Container>
          <Container className="bg-xtraDark text-[#c8d8e7]">
            <h1 className="text-lg font-bold">Nutrition</h1>
            <div className="text-[#f2fcf5]">
              {[{day:"Breakfast",meal:"Oatmeal with fruits"},{day:"Lunch",meal:"Chicken salad"},{day:"Dinner",meal:"Steak with veggies"},{day:"Snack",meal:"Protein shake"}].map((_,i)=>
              (
              <div key={i} className=" p-2 ">
                <p className="font-semibold text-md">{_.day}</p>
                <p className="opacity-70 text-sm">{_.meal}</p>
              </div>))
              }
            </div>

          </Container>
        </div>

      </div>
    </div>
  )
}


const ProgressIcon =()=>{
    return(<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
      <path fill="currentColor" d="M4.854 8.146a2.84 2.84 0 0 1 .685 1.114l.448 1.377a.544.544 0 0 0 1.026 0l.448-1.377a2.84 2.84 0 0 1 1.798-1.796l1.378-.448a.544.544 0 0 0 0-1.025l-.028-.007l-1.378-.448A2.84 2.84 0 0 1 7.433 3.74l-.447-1.377a.544.544 0 0 0-1.027 0L5.511 3.74l-.011.034a2.84 2.84 0 0 1-1.759 1.762l-1.378.448a.544.544 0 0 0 0 1.025l1.378.448c.42.14.8.376 1.113.689M20 7a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-2.586l-5.793 5.793a1 1 0 0 1-1.414 0L10 14.414l-5.293 5.293a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0l1.793 1.793L17.586 9H15a1 1 0 1 1 0-2zm.017 10.965l.766.248l.015.004a.303.303 0 0 1 .147.46a.3.3 0 0 1-.147.11l-.765.248a1.58 1.58 0 0 0-1 .999l-.248.764a.302.302 0 0 1-.57 0l-.249-.764a1.58 1.58 0 0 0-.999-1.002l-.765-.249a.303.303 0 0 1-.147-.46a.3.3 0 0 1 .147-.11l.765-.248a1.58 1.58 0 0 0 .984-.998l.249-.765a.302.302 0 0 1 .57 0l.249.764a1.58 1.58 0 0 0 .999.999" strokeWidth={0.7} stroke="currentColor"></path>
    </svg>)
  }
  
