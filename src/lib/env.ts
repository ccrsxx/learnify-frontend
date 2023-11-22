import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_URL: z.string().min(1)
});

const parsedSchema = envSchema.parse({
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
});

export const { NEXT_PUBLIC_URL } = parsedSchema;
