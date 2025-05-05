import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Badge } from "~/components/ui/badge"
import { MoreHorizontal, Plus, Search } from "lucide-react"

// Sample exercise data
const exercises = [
  {
    id: "1",
    name: "Barbell Squat",
    category: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    muscleGroup: "Quadriceps",
    createdAt: "Jan 5, 2023",
  },
  {
    id: "2",
    name: "Push-up",
    category: "Upper Body",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    muscleGroup: "Chest",
    createdAt: "Feb 10, 2023",
  },
  {
    id: "3",
    name: "Deadlift",
    category: "Full Body",
    equipment: "Barbell",
    difficulty: "Advanced",
    muscleGroup: "Back",
    createdAt: "Mar 15, 2023",
  },
  {
    id: "4",
    name: "Plank",
    category: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    muscleGroup: "Abs",
    createdAt: "Apr 20, 2023",
  },
  {
    id: "5",
    name: "Dumbbell Curl",
    category: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    muscleGroup: "Biceps",
    createdAt: "May 25, 2023",
  },
]

export default function ExercisesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exercises</h1>
          <p className="text-muted-foreground">Manage your platform exercises</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Exercise
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Exercises</CardTitle>
            <CardDescription>A list of all exercises available on your platform.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search exercises..." className="pl-8 w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Muscle Group</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell className="font-medium">{exercise.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{exercise.category}</Badge>
                  </TableCell>
                  <TableCell>{exercise.equipment}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        exercise.difficulty === "Beginner"
                          ? "outline"
                          : exercise.difficulty === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {exercise.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{exercise.muscleGroup}</TableCell>
                  <TableCell>{exercise.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
