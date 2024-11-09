import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "O e-mail é obrigatório" })
    .email({ message: "O e-mail está inválido" }),
  password: z.string({ required_error: "A senha é obrigatória" }),
});
