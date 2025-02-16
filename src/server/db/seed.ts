import { eq } from 'drizzle-orm';
import { db } from './index'; // Adjust the import according to your project structure
import { exerciceNames } from './schema'; // Adjust the import according to your project structure
import fs from 'fs'
import csv from 'csv-parser'
// Define the exercises data

 

  let exerciceData : any[] = []
  function readCSVFile(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));

    });
  
  }
// Function to seed the database
export async function seedDatabase() {
  try {
    exerciceData = await readCSVFile('megaGymDataset.csv');
    exerciceData.map(async (ex) =>{
      console.log(ex)
      await db.insert(exerciceNames).values({
        name:ex.Title,muscleGroup:ex.BodyPart,equipment:[ex.Equipment],description:ex.Desc
      })
    })

    
  } catch (error) {
    console.error('Error seeding database:', error);
  } 
}
