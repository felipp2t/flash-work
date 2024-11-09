import { z } from "zod";

const envSchema = z.object({
  VITE_BACKEND_ENDPOINT: z.string().url(),
});

const parsedEnv = envSchema.parse(import.meta.env);

export const env = {
  BACKEND_ENDPOINT: parsedEnv.VITE_BACKEND_ENDPOINT,
};