"use client"

import { use, useState } from "react"
import { CalendarIcon, ChevronDown, Dumbbell, LineChart, TrendingUp, User, Weight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
// import { Calendar } from "~/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart"
import { andika } from "../font"
import { type UserLog} from "~/lib/types"
import { calculateOverallWeeklyProgress, calculateWeeklyProgressPerExercise, calculateWeeklyVolume, calculateWeeklyWeightProgress,  calculateWeeklyWorkoutVolume,  calculateWorkoutFrequencyPerDay,  getMainLiftsProgress } from "~/lib/analytics/analytics"
type Props = {
  userLogs: UserLog[] | null;
}
export default function AthleteDashboard(props:Props) {
  const { userLogs } = props
  const weeklyVolumeData = calculateWeeklyVolume(userLogs ?? [])
  const weeklyProgressPerExercise = calculateWeeklyProgressPerExercise(userLogs ?? []);
  const weeklyWeightProgress = calculateOverallWeeklyProgress(weeklyProgressPerExercise);
  const MainLiftsProgress = getMainLiftsProgress(weeklyProgressPerExercise)
  const workoutFrequency = calculateWorkoutFrequencyPerDay(userLogs ?? [])
  const weeklyVolume = calculateWeeklyWorkoutVolume(userLogs ?? [])
  const JSONB = calculateWeeklyWorkoutVolume(userLogs ?? [])
  const [selectedExercise, setSelectedExercise] = useState(weeklyProgressPerExercise[0]?.name ?? "")



  const aux = weeklyVolumeData[weeklyVolumeData.length - 1]
  const aux2 = weeklyVolumeData[weeklyVolumeData.length - 2]
  let weeklyVolumeChange = 0
  if(aux && aux2)
  weeklyVolumeChange =  aux.volume - aux2.volume 
  const lastWeekVolume : number =aux ? aux.volume : 0

  const [date, setDate] = useState<Date | undefined>(new Date())

  // Sample data for charts
  const weightProgressData = [
    { week: "Week 1", weight: 180 },
    { week: "Week 2", weight: 182 },
    { week: "Week 3", weight: 183 },
    { week: "Week 4", weight: 185 },
    { week: "Week 5", weight: 186 },
    { week: "Week 6", weight: 188 },
    { week: "Week 7", weight: 190 },
    { week: "Week 8", weight: 192 },
  ]

  const strengthProgressData = [
    { week: "Week 1", bench: 185, squat: 225, deadlift: 275 },
    { week: "Week 2", bench: 190, squat: 235, deadlift: 285 },
    { week: "Week 3", bench: 195, squat: 245, deadlift: 295 },
    { week: "Week 4", bench: 200, squat: 255, deadlift: 305 },
    { week: "Week 5", bench: 205, squat: 265, deadlift: 315 },
    { week: "Week 6", bench: 210, squat: 275, deadlift: 325 },
    { week: "Week 7", bench: 215, squat: 285, deadlift: 335 },
    { week: "Week 8", bench: 225, squat: 295, deadlift: 345 },
  ]

  const workoutFrequencyData = [
    { day: "Mon", sessions: 2 },
    { day: "Tue", sessions: 1 },
    { day: "Wed", sessions: 2 },
    { day: "Thu", sessions: 1 },
    { day: "Fri", sessions: 2 },
    { day: "Sat", sessions: 1 },
    { day: "Sun", sessions: 0 },
  ]

  return (
    <div className={`flex min-h-screen w-full flex-col ${andika.className}`}>
      <main className="flex-1 p-4 md:p-6"> 
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Current weight */}
          <Card >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
              <Weight className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">192 lbs</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-primary" />
                +12 lbs from starting weight
              </p>
            </CardContent>
          </Card>
          {/* Weekly volume */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Weekly Volume</CardTitle>
              <Dumbbell className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lastWeekVolume} kg</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-primary" />
                {weeklyVolumeChange} kg from last week
              </p>
            </CardContent>
          </Card>
          {/*Max bench Press */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Max Bench Press</CardTitle>
              <LineChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">225 lbs</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-primary" />
                +40 lbs from starting weight
              </p>
            </CardContent>
          </Card>
          {/* Weekly Session */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Weekly Sessions</CardTitle>
              <User className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9 sessions</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-primary" />
                +1 from last week
              </p>
            </CardContent>
          </Card>
        </div>
        {/* charts */}
        <Tabs defaultValue="overview" className="mt-6">
          <div className="flex items-center justify-between">
            {/* information type */}
            <TabsList className="bg-transparent">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
            </TabsList>
            {/* duration */}
            <Select defaultValue="8weeks" >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4weeks">Last 4 weeks</SelectItem>
                <SelectItem value="8weeks">Last 8 weeks</SelectItem>
                <SelectItem value="12weeks">Last 12 weeks</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* overview */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* weight progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                  <CardDescription>Your weight progression over time</CardDescription>
                </CardHeader>
                <CardContent className="h-fit">
                  <ChartContainer
                    config={{
                      averageWeight: {
                        label: "Average Weight (kg)",
                        color: "#1b512d",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={weeklyWeightProgress}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="weekStart" />
                        <YAxis 
                          domain={['dataMin - 5', 'dataMax + 5']}
                          tickFormatter={(value: number) => Math.round(value).toString()}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value) => Math.round(Number(value))}
                        />
                        <Line
                          type="monotone"
                          dataKey="averageWeight"
                          stroke="var(--color-averageWeight)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              {/* exercise volume */}
              <Card className="">
                <CardHeader>
                  <CardTitle>Exercise Volume</CardTitle>
                  <CardDescription>Weekly training volume in pounds</CardDescription>
                </CardHeader>
                <CardContent className="h-fit">
                  <ChartContainer
                    config={{
                      volume: {
                        label: "Volume (lbs)",
                        color: "#1b512d",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {/* workout Frequency */}
              <Card>
                <CardHeader>
                  <CardTitle>Workout Frequency</CardTitle>
                  <CardDescription>Number of sessions per day this week</CardDescription>
                </CardHeader>
                <CardContent className="h-fit">
                  <ChartContainer
                    config={{
                      sessions: {
                        label: "Frequency (%)",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={workoutFrequency}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis 
                          domain={[0, 100]}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value: number) => `${value}%`}
                        />
                        <Bar dataKey="probability" fill="var(--color-sessions)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              {/* strength progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Strength Progress</CardTitle>
                  <CardDescription>Progress on main lifts over time</CardDescription>
                </CardHeader>
                <CardContent className="h-fit">
<ChartContainer
  config={{
    bench: {
      label: "Bench Press (kg)",
      color: "hsl(var(--chart-1))",
    },
    squat: {
      label: "Squat (kg)",
      color: "hsl(var(--chart-2))",
    },
    deadlift: {
      label: "Deadlift (kg)",
      color: "hsl(var(--chart-3))",
    },
    overhead: {
      label: "Overhead Press (kg)",
      color: "hsl(var(--chart-4))",
    },
  }}
>
  <ResponsiveContainer width="100%" height="100%">
    <RechartsLineChart data={MainLiftsProgress}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="weekStart" />
      <YAxis 
        domain={['dataMin - 5', 'dataMax + 5']}
        tickFormatter={(value: number) => Math.round(value).toString()}
      />
      <ChartTooltip 
        content={<ChartTooltipContent />}
        formatter={(value) => Math.round(Number(value))}
      />
      <Line
        type="monotone"
        dataKey="bench"
        stroke="var(--color-bench)"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        connectNulls={true}
      />
      <Line
        type="monotone"
        dataKey="squat"
        stroke="var(--color-squat)"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        connectNulls={true}
      />
      <Line
        type="monotone"
        dataKey="deadlift"
        stroke="var(--color-deadlift)"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        connectNulls={true}
      />
      <Line
        type="monotone"
        dataKey="overhead"
        stroke="var(--color-overhead)"
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
        connectNulls={true}
      />
    </RechartsLineChart>
  </ResponsiveContainer>
</ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
              {/* strength */}
          <TabsContent value="strength" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Strength Progress Details</CardTitle>
                  <CardDescription>Detailed view of your strength gains</CardDescription>
                </div>
                <Select 
                  value={selectedExercise}
                  onValueChange={setSelectedExercise}
                  defaultValue={weeklyProgressPerExercise[0]?.name ?? ""}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select exercise" />
                  </SelectTrigger>
                  <SelectContent>
                    {weeklyProgressPerExercise.map((exercise) => (
                      <SelectItem key={exercise.name} value={exercise.name}>
                        {exercise.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="h-fit">
                <ChartContainer
                  config={{
                    averageWeight: {
                      label: `Weight (kg)`,
                      color: `hsl(var(--chart-3))`,
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart 
                      data={weeklyProgressPerExercise.find(ex => ex.name === selectedExercise)?.weeklyProgress ?? []}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="weekStart" />
                      <YAxis 
                        domain={['dataMin - 5', 'dataMax + 5']}
                        tickFormatter={(value: number) => Math.round(value).toString()}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        formatter={(value) => Math.round(Number(value))}
                      />
                      <Line
                        type="monotone"
                        dataKey="averageWeight"
                        stroke={`var(--color-${selectedExercise.toLowerCase().replace(/\s+/g, '')})`}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        connectNulls={true}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          {/* volume */}
          <TabsContent value="volume" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Volume Breakdown</CardTitle>
                <CardDescription>Detailed view of your training volume</CardDescription>
              </CardHeader>
              <CardContent className="h-fit">
                <ChartContainer
                  config={{
                    totalVolume: {
                      label: "Volume (kg)",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" >
                    <BarChart data={weeklyVolume}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="totalSets" fill="var(--color-totalVolume)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* {JSONB && (
          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Exercise Progress Details</CardTitle>
                <CardDescription>Weekly progress for each exercise</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap overflow-x-auto">
                  {JSON.stringify(JSONB, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </div>
        )} */}
      </main>
    </div>
  )
}

