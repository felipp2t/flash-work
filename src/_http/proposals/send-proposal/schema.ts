import { z } from "zod";

export const sendProposalSchema = z.object({
  serviceId: z.string().uuid(),
  message: z
    .string({ required_error: "A mensagem é obrigatória" })
    .min(50, { message: "A mensagem deve ter no mínimo 20 caracteres" }),
  offerAmount: z
    .number({ required_error: "O valor da oferta é obrigatório" })
    .positive(),
  estimatedCompletionTime: z.coerce.date({
    required_error: "O tempo estimado é obrigatório",
  }),
});
