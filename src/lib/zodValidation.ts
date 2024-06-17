import { z } from "zod";

export const user = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
});
const workout = z.object({
    name: z.string(),
    userId: z.string(),
});