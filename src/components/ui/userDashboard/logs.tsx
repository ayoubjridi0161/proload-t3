import React from 'react'
import { fetchUserLogs } from '~/lib/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { format } from 'date-fns'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'

type WorkoutLog = {
  id: number
  userId: string
  workoutId: number
  date: string
  duration: number
  logs: {
    name: string
    sets: {
      setIndex: string
      weight: string
    }[]
  }[]
}

type Props = {}

export default async function Logs({}: Props) {
  const data = await fetchUserLogs() as unknown as WorkoutLog[]
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Workout History</CardTitle>
        <CardDescription>View your past workout sessions and performance</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No workout logs found
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {data.map((workout, workoutIdx) => (
              <AccordionItem key={workout.id} value={`workout-${workoutIdx}`}>
                <AccordionTrigger className="hover:bg-slate-50 px-4">
                  <div className="flex justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <span>Workout on {format(new Date(workout.date), 'MMMM d, yyyy')}</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {workout.duration} min
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">Workout #{workout.workoutId}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2">
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="w-full">
                        {workout.logs.map((exercise, index) => (
                          <AccordionItem key={index} value={`exercise-${workoutIdx}-${index}`}>
                            <AccordionTrigger className="hover:bg-slate-50 px-4">
                              <div className="flex justify-between w-full pr-4">
                                <span>{exercise.name}</span>
                                <span className="text-sm text-gray-500">{exercise.sets.length} sets</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Set</TableHead>
                                    <TableHead>Weight (lbs)</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {exercise.sets.map((set) => (
                                    <TableRow key={set.setIndex}>
                                      <TableCell>{set.setIndex}</TableCell>
                                      <TableCell>{set.weight}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}