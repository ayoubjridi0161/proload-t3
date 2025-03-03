"use client"

import { useState } from "react"
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

export default function AthleteDashboard() {
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

  const exerciseVolumeData = [
    { week: "Week 1", volume: 12000 },
    { week: "Week 2", volume: 15000 },
    { week: "Week 3", volume: 14000 },
    { week: "Week 4", volume: 16500 },
    { week: "Week 5", volume: 18000 },
    { week: "Week 6", volume: 17500 },
    { week: "Week 7", volume: 19000 },
    { week: "Week 8", volume: 21000 },
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
              <div className="text-2xl font-bold">21,000 lbs</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 inline h-3 w-3 text-primary" />
                +2,000 lbs from last week
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
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      weight: {
                        label: "Weight (kg)",
                        color: "#1b512d",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={weightProgressData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="week" />
                        <YAxis domain={["dataMin - 5", "dataMax + 5"]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="weight"
                          stroke="var(--color-weight)"
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
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      volume: {
                        label: "Volume (lbs)",
                        color: "#1b512d",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={exerciseVolumeData}>
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
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      sessions: {
                        label: "Sessions",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={workoutFrequencyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis domain={[0, 3]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="sessions" fill="var(--color-sessions)" radius={4} />
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
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      bench: {
                        label: "Bench Press (lbs)",
                        color: "hsl(var(--chart-1))",
                      },
                      squat: {
                        label: "Squat (lbs)",
                        color: "hsl(var(--chart-2))",
                      },
                      deadlift: {
                        label: "Deadlift (lbs)",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={strengthProgressData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="week" />
                        <YAxis domain={["dataMin - 20", "dataMax + 20"]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="bench"
                          stroke="var(--color-bench)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="squat"
                          stroke="var(--color-squat)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="deadlift"
                          stroke="var(--color-deadlift)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
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
              <CardHeader>
                <CardTitle>Strength Progress Details</CardTitle>
                <CardDescription>Detailed view of your strength gains</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ChartContainer
                  config={{
                    bench: {
                      label: "Bench Press (lbs)",
                      color: "hsl(var(--chart-1))",
                    },
                    squat: {
                      label: "Squat (lbs)",
                      color: "hsl(var(--chart-2))",
                    },
                    deadlift: {
                      label: "Deadlift (lbs)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={strengthProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={["dataMin - 20", "dataMax + 20"]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="bench"
                        stroke="var(--color-bench)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="squat"
                        stroke="var(--color-squat)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="deadlift"
                        stroke="var(--color-deadlift)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
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
              <CardContent className="h-96">
                <ChartContainer
                  config={{
                    volume: {
                      label: "Volume (lbs)",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={exerciseVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

