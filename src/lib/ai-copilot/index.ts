"use server"
import {type WorkoutDay} from "~/components/ui/workouts/WorkoutContext" // Assuming WorkoutDay is still relevant, otherwise remove
import {
    GoogleGenAI,
    Type,
  } from '@google/genai';

// Function to generate a full workout plan
export async function generateFullWorkout(exerciseLibrary: string[], prompt: string) {
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    const responseSchema = {
        type: Type.OBJECT,
        required: ["name", "description", "numberOfDays", "days"],
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          numberOfDays: { type: Type.INTEGER },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["name", "index"], // Ensure 'index' is required if needed for structure
              properties: {
                name: { type: Type.STRING },
                index: { type: Type.INTEGER }, // Added index
                exercises: { // Exercises might be optional for rest days
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ["name", "sets", "reps"],
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.INTEGER },
                      reps: { type: Type.INTEGER }
                    }
                  }
                }
              }
            }
          }
        }
      };

    const config = {
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: responseSchema
    };

    const model = 'gemini-2.5-flash-preview-04-17';
    const contents = [
      {
        role: 'user',
        parts: [{
          text: `${prompt}
          Available exercises:
          ${exerciseLibrary.join('\n')}
          Required format: ${JSON.stringify(responseSchema)}`
        }]
      }
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let streamedResponse = ""
    for await (const chunk of response) {
      console.log("Full Workout Chunk:", chunk.text); // Added identifier
      streamedResponse += chunk.text;
    }
    return streamedResponse;
}

// Function to generate exercises for a single day
export async function generateWorkoutDay(exerciseLibrary: string[], prompt: string) {
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    const responseSchema = {
        type: Type.OBJECT,
        required: ["name", "exercises"],
        properties: {
          name: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["name", "sets", "reps"],
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.INTEGER },
                reps: { type: Type.INTEGER }
              }
            }
          }
        }
      };

    const config = {
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: responseSchema
    };

    const model = 'gemini-2.5-flash-preview-04-17';
    const contents = [
      {
        role: 'user',
        parts: [{
          text: `${prompt}
          Available exercises:
          ${exerciseLibrary.join('\n')}
          Required format: ${JSON.stringify(responseSchema)}`
        }]
      }
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let streamedResponse = ""
    for await (const chunk of response) {
      console.log("Workout Day Chunk:", chunk.text); // Added identifier
      streamedResponse += chunk.text;
    }
    return streamedResponse;
}

// Function to generate a list of exercises
export async function generateExercises(exerciseLibrary: string[], prompt: string) {
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    const responseSchema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          required: ["name", "sets", "reps"],
          properties: {
            name: { type: Type.STRING },
            sets: { type: Type.INTEGER },
            reps: { type: Type.INTEGER }
          }
        }
      };

    const config = {
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: responseSchema
    };

    const model = 'gemini-2.5-flash-preview-04-17';
    const contents = [
      {
        role: 'user',
        parts: [{
          text: `${prompt}
          Available exercises:
          ${exerciseLibrary.join('\n')}
          Required format: ${JSON.stringify(responseSchema)}`
        }]
      }
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let streamedResponse = ""
    for await (const chunk of response) {
      console.log("Exercises Chunk:", chunk.text); // Added identifier
      streamedResponse += chunk.text;
    }
    return streamedResponse;
}

// The original generateWorkout function is removed as its logic is now split.
  

  