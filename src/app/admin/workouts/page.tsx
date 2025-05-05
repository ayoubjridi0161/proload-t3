import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

import { Badge } from "~/components/ui/badge"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import { getWorkoutsForAdmin } from "~/lib/data"
import WorkoutActions from "~/components/ui/admin/workoutActions"


// Sample workout data
const workouts = [
  {
    id: "1",
    name: "Full Body Blast",
    category: "Strength",
    difficulty: "Intermediate",
    duration: "45 min",
    exercises: 12,
    createdAt: "Jan 15, 2023",
  },
  {
    id: "2",
    name: "HIIT Cardio",
    category: "Cardio",
    difficulty: "Advanced",
    duration: "30 min",
    exercises: 8,
    createdAt: "Feb 20, 2023",
  },
  {
    id: "3",
    name: "Yoga Flow",
    category: "Flexibility",
    difficulty: "Beginner",
    duration: "60 min",
    exercises: 15,
    createdAt: "Mar 5, 2023",
  },
  {
    id: "4",
    name: "Core Crusher",
    category: "Core",
    difficulty: "Intermediate",
    duration: "25 min",
    exercises: 10,
    createdAt: "Apr 10, 2023",
  },
  {
    id: "5",
    name: "Upper Body Focus",
    category: "Strength",
    difficulty: "Intermediate",
    duration: "40 min",
    exercises: 9,
    createdAt: "May 15, 2023",
  },
]

export default async function WorkoutsPage() {
  const workoutList = await getWorkoutsForAdmin();
  const tableHeaders = ["id", "name", "days","username","privacy", "createdAt","clones","upvotes","downvotes","shares",]
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workouts</h1>
          <p className="text-muted-foreground">Manage your platform workouts</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Workout
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Workouts</CardTitle>
            <CardDescription>A list of all workouts available on your platform.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search workouts..." className="pl-8 w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
              {
                tableHeaders.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))
              }
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workoutList.map((workout) => (
                <TableRow key={workout.id}>
                  <TableCell className="font-medium">{workout.id}</TableCell>
                  <TableCell className="font-medium">
                    {/* <Badge variant="outline">{workout.category}</Badge> */}
                    {workout.name}
                  </TableCell>
                  <TableCell>
                    {/* <Badge
                      variant={
                        workout.difficulty === "Beginner"
                          ? "outline"
                          : workout.difficulty === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {workout.difficulty}
                    </Badge> */}
                    {workout.numberOfDays}
                  </TableCell>
                  <TableCell>{workout.users?.name}</TableCell>
                  <TableCell><Badge
                      variant={
                        workout.published 
                          ? "default"
                          : "destructive"
                      }
                    >
                      {workout.published == true ? "public" : "private"}
                    </Badge></TableCell>
                  <TableCell>{workout.createdAt.toLocaleString()}</TableCell>
                  <TableCell>{workout.clones}</TableCell>
                  <TableCell>{workout.upvotes}</TableCell>
                  <TableCell>{workout.downvotes}</TableCell>
                  <TableCell>{workout.shares}</TableCell>
                  <TableCell className="text-right">
                    <WorkoutActions id={workout.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
