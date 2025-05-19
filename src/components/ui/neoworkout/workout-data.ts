export interface Workout {
    id: string
    name: string
    user: string
    description: string
    muscleGroups: { name: string; value: number }[]
    days: string[]
    likes: number
    duration: number
  }

  type Exercise = {
    mg: string;
    exerciseCount: number;
  };
  
  type WorkoutDetail = {
    id: number;
    name: string;
    username: string;
    description: string;
    numberOfDays: number;
    dayNames: string[];
    upvotes: number;
    exercices: Exercise[];
  };
  
  export const workoutData: Workout[] = [
    {
      id: "1",
      name: "Full Body Power",
      user: "FitnessPro",
      description: "A comprehensive full body workout focusing on compound movements for maximum strength gains.",
      muscleGroups: [
        { name: "Chest", value: 80 },
        { name: "Back", value: 90 },
        { name: "Legs", value: 100 },
        { name: "Arms", value: 70 },
        { name: "Core", value: 60 },
        { name: "Shoulders", value: 85 },
      ],
      days: ["Monday", "Wednesday", "Friday"],
      likes: 342,
      duration: 60,
    },
    {
      id: "2",
      name: "Upper/Lower Split",
      user: "StrengthCoach",
      description: "Classic upper/lower body split for balanced development and adequate recovery time.",
      muscleGroups: [
        { name: "Chest", value: 90 },
        { name: "Back", value: 90 },
        { name: "Legs", value: 100 },
        { name: "Arms", value: 80 },
        { name: "Core", value: 70 },
        { name: "Shoulders", value: 85 },
      ],
      days: ["Monday", "Tuesday", "Thursday", "Friday"],
      likes: 256,
      duration: 75,
    },
    {
      id: "3",
      name: "Push Pull Legs",
      user: "GymRat99",
      description: "The ultimate PPL routine for hypertrophy. High volume with focus on progressive overload.",
      muscleGroups: [
        { name: "Chest", value: 100 },
        { name: "Back", value: 100 },
        { name: "Legs", value: 100 },
        { name: "Arms", value: 80 },
        { name: "Core", value: 60 },
        { name: "Shoulders", value: 90 },
      ],
      days: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
      likes: 512,
      duration: 90,
    },
    {
      id: "4",
      name: "Core Crusher",
      user: "AbsQueen",
      description: "Focused abdominal and core workout to build a strong, stable midsection and visible abs.",
      muscleGroups: [
        { name: "Chest", value: 20 },
        { name: "Back", value: 40 },
        { name: "Legs", value: 30 },
        { name: "Arms", value: 10 },
        { name: "Core", value: 100 },
        { name: "Shoulders", value: 30 },
      ],
      days: ["Monday", "Wednesday", "Friday"],
      likes: 189,
      duration: 45,
    },
    {
      id: "5",
      name: "Functional Fitness",
      user: "MoveWell",
      description: "Improve everyday movement patterns with this functional workout focusing on mobility and strength.",
      muscleGroups: [
        { name: "Chest", value: 60 },
        { name: "Back", value: 70 },
        { name: "Legs", value: 80 },
        { name: "Arms", value: 50 },
        { name: "Core", value: 90 },
        { name: "Shoulders", value: 70 },
      ],
      days: ["Monday", "Tuesday", "Thursday", "Saturday"],
      likes: 147,
      duration: 55,
    },
    {
      id: "6",
      name: "Arm Annihilation",
      user: "BigGuns",
      description: "Specialized arm workout for those looking to build impressive biceps, triceps, and forearms.",
      muscleGroups: [
        { name: "Chest", value: 40 },
        { name: "Back", value: 30 },
        { name: "Legs", value: 10 },
        { name: "Arms", value: 100 },
        { name: "Core", value: 20 },
        { name: "Shoulders", value: 60 },
      ],
      days: ["Tuesday", "Friday"],
      likes: 278,
      duration: 50,
    },
  ]
  
  