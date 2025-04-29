"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { ArrowRight,Copy } from "lucide-react"
import Image from "next/image"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
// No need to import ChartContainer
import{ type WorkoutDetail } from "~/lib/types"
import Link from "next/link"
import { Separator } from "../separator"
import { Chip } from "@nextui-org/react"
import Container from "../userDashboard/Container"

interface WorkoutCardProps {
    workout:{
        id: number;
        name: string;
        description: string;
        numberOfDays: number | null;
        days: {
            name: string;
            dayIndex: number;
        }[];
    }
}
  export function WorkoutCard({ workout }: WorkoutCardProps) {
    

  
    return (
      <Link href={`/workouts/${workout.id}`}>
      <Container className='bg-xtraText space-y-3' >
                    <div className='flex'>
                        <Image src="https://s3.eu-north-1.amazonaws.com/proload.me/ach3.jpg" width={180} height={180} className="w-1/3 h-fit" alt='hello'/>
                        <div className='px-5 space-y-1'>
                            <h1 className='text-md font-bold'>{workout.name}</h1>
                            <p className='text-xs'>{workout.description}</p>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                    {Array.from({length: workout.numberOfDays ?? 0}).map((_, index) => {
                        const day = workout.days?.find(d => d.dayIndex === index + 1);
                        return (
                        <Badge 
                            key={index} 
                            variant={day ? (day.name === "rest" ? "secondary" : "default") : "secondary"}
                        >
                            {day ? day.name : "rest"}
                        </Badge>
                        );
                    })}
                    </div>
                    <div className='flex items-center gap-2 justify-around'>
                        <Button size="sm" className='text-xs bg-xtraGreen text-xtraText hover:bg-xtraGreen/50 '><Copy className="pr-2"/>   clone Program</Button>
                        <Button size="sm" className='text-xs bg-xtraGreen text-xtraText hover:bg-xtraGreen/50 '><ArrowRight className="pr-2"/>   Visit Program</Button>
                        {/* <Button size="sm" className='text-xs bg-xtraGreen text-xtraText'>Visit work</Button> */}
                    </div>
                    </Container>
      </Link>
    )
  }
  
  
  