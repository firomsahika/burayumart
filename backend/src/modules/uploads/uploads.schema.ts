import { z } from "zod";

export const productImageSignatureSchema = z.object({
    fileName: z
        .string()
        .trim()
        .min(1)
        .max(255),
});