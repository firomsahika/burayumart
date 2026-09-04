import { z } from "zod";

export const applyAsSellerSchema = z.object({
    storeName: z
        .string()
        .trim()
        .min(2, "Store name must be at least 2 characters")
        .max(100, "Store name must not exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),

    phone: z
        .string()
        .trim()
        .min(9, "Invalid phone number")
        .max(20, "Invalid phone number")
        .optional(),

    logo: z
        .string()
        .url("Logo must be a valid URL")
        .nullable()
        .optional(),
});

export const updateSellerProfileSchema =
    applyAsSellerSchema.partial();