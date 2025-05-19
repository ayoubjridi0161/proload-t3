import { eq } from 'drizzle-orm';
import { db } from './index'; // Adjust the import according to your project structure
import { exerciseLibrary } from './schema'
import fs from 'fs'
import { addLogsWithDate } from '~/lib/data';
import csv from 'csv-parser'
type Workout = {
  date: string;
  workoutName: string;
  exercises: {
     name: string; 
     sets: 
     { setIndex: string; 
      weight: string 
    }[] 
  }[]
};
// Define the exercise type

// Function to seed exercises from CSV file
export async function seedExercisesFromCSV() {
  const rawData = fs.readFileSync('src/server/db/workouts2.json', 'utf8');
  const logs = JSON.parse(rawData) as Workout[];
  for (const workout of logs) {
const workoutDate = new Date(workout.date);
    const res = await addLogsWithDate(workoutDate, 17,"c6f2836c-5e58-4d5b-9afe-c00c0c3a9b5e",workout.workoutName,workout.exercises)
  }
}
