"use server"
import fs from 'fs';
import path from 'path';
import { InsertDay, InsertExercice, InsertWorkout } from '~/lib/data';

type Exercise = {
    name: string;
    sets: number;
    reps: number;
    id?: number; // Optional if you might add this later
};

type WorkoutDay = {
    name: string;
    index: number;
    exercises?: Exercise[]; // Optional for rest days
    dayID?: number; // Optional if you might add this later
};

type Workout = {
    name: string;
    userId: string;
    description: string;
    numberOfDays: number;
    published: boolean;
    days: WorkoutDay[];
};

export async function seedWorkouts() {
    const filePath = "C://Users//jridi//Desktop//proload-t3//src//server//db//workoutsData.json";
    const rawData = fs.readFileSync(filePath, 'utf8');
    const workouts = JSON.parse(rawData) as Workout[];
    
    
    for (const workout of workouts) {
        try {
            console.log(
                workout.name
            )
            const workoutID = await InsertWorkout({
                name: workout.name,
                userId: workout.userId,
                description: workout.description,
                numberOfDays: workout.numberOfDays,
                published: workout.published
            });
            console.log("workoutID", workoutID); // Add this line to log the workoutID value to the termina
            
            
            if (typeof workoutID !== 'number') {
                console.log(workoutID?.message);
                break;
            }

            for (const day of workout.days.filter(day => day.name !== "rest")) {
                try {
                    const dayID = await InsertDay({
                        name: day.name,
                        index: day.index
                    }, workoutID);
                    console.log("dayID", dayID); // Add this line to log the dayID value to the terminal
                    
                    if (typeof dayID !== "number") {
                        console.log(dayID?.message);
                        
                        break;
                    }

                    if (day.exercises) {
                        for (const exercise of day.exercises) {
                            try {
                                await InsertExercice({
                                    name: exercise.name,
                                    sets: exercise.sets,
                                    reps: exercise.reps
                                }, dayID);
                                console.log( exercise.name)
                            } catch (exerciseError) {
                                console.log(`Failed to insert exercise ${exercise.name}:`, exerciseError);
                            }
                        }
                    }
                } catch (dayError) {
                    console.log(`Failed to insert day ${day.name}:`, dayError);
                }
            }
        } catch (workoutError) {
            console.log(`Failed to insert workout ${workout.name}:`, workoutError);
        }
    }
}
