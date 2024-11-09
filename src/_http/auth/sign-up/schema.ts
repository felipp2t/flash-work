import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(3).max(60),
    email: z.string().email(),
    phone: z.string().length(15),
    dateBirth: z.coerce.date(),
    cpf: z.string().length(14),
    password: z.string().min(6),
    confirmPassword: z.string(),
    profilePhoto: z.instanceof(File).nullable(),
  })
  .refine((data) => data.password === data.confirmPassword);
