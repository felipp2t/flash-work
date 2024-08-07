import { z } from "zod";

export const pinSchema = z.object({
    pin: z.string().length(6)
})

export type pinData = z.infer<typeof pinSchema>