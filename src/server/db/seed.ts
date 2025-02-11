import { eq } from 'drizzle-orm';
import { db } from './index'; // Adjust the import according to your project structure
import { exerciceNames } from './schema'; // Adjust the import according to your project structure

// Define the exercises data




// Function to seed the database
export async function seedDatabase() {
  try {
    // console.log([...backExercises,...armExercises,...shoulderExercises])
    // const allEXES = [...backExercises,...armExercises,...shoulderExercises,...chestExercises,...legExercises,...coreExercises]
    // for (const exercise of allEXES) {
    //   const existingExercise = await db.query.exerciceNames.findFirst({where:eq(exerciceNames.name,exercise.name)})
    //   if(existingExercise) continue
    //   await db.insert(exerciceNames).values(exercise);
    //   console.log("added")
    // }
    // console.log(allEXES.length)
  } catch (error) {
    console.error('Error seeding database:', error);
  } 
}
