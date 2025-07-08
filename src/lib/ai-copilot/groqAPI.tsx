import { Groq } from 'groq-sdk';

export async function generateWorkoutProgram(exerciseLibrary: string[], prompt: string) {
  const systemPrompt = `
You are an expert fitness trainer AI that creates a single optimized workout day.
Your responses must:
1. Use only exercises from the provided library.
2. Specify sets (3-5) and reps (8-15) for each exercise.
3. Follow this JSON schema strictly for your output:
${JSON.stringify(responseSchema)}`;
  const groq = new Groq({apiKey: process.env.GROQ_LLAMA_API});
  const chatCompletion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-maverick-17b-128e-instruct",
    temperature: 0.7,
    top_p: 1,
    max_completion_tokens: 1024,
    stream: false,
    response_format: { type: 'json_schema', json_schema: responseSchema},
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `${prompt}\nAvailable exercises:\n${exerciseLibrary.join("\n")}`
      }
    ]
  });

  return chatCompletion.choices[0]?.message.content;
}

const responseSchema = {
  name: "WorkoutPlanSchema", // ✅ Required by Groq SDK
  schema: {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Workout Plan Schema",
    "type": "object",
    "required": ["name", "description", "numberOfDays", "days"],
    "properties": {
      "name": { "type": "string" },
      "description": { "type": "string" },
      "numberOfDays": { "type": "integer" },
      "days": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["name", "index"],
          "properties": {
            "name": { "type": "string" },
            "index": { "type": "integer" },
            "exercises": {
              "type": "array",
              "items": {
                "type": "object",
                "required": ["name", "sets", "reps"],
                "properties": {
                  "name": { "type": "string" },
                  "sets": { "type": "integer" },
                  "reps": { "type": "integer" }
                }
              }
            }
          }
        }
      }
    }
  }
};