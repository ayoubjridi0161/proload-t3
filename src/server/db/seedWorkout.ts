"use server"
import fs from 'fs';
import path from 'path';

export function seedWorkouts() {
    const workoutsPath = path.join(__dirname, './workouts.json');
    const workoutsData = JSON.parse(fs.readFileSync(workoutsPath, 'utf-8'));
    console.log(workoutsData);
}
