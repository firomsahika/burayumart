import { z } from "zod";

export const addCartItemSchema = z.object({
    productId: z
        .string()
        .trim()
        .min(1, "Product ID is required"),

    quantity: z
        .number()
        .int("Quantity must be a whole number")
        .min(1, "Quantity must be at least 1"),
});

export const updateCartItemSchema = z.object({
    quantity: z
        .number()
        .int("Quantity must be a whole number")
        .min(1, "Quantity must be at least 1"),
});

export const cartItemIdParamsSchema = z.object({
    itemId: z
        .string()
        .trim()
        .min(1, "Cart item ID is required"),
});

export type AddCartItemSchemaInput =
    z.infer<typeof addCartItemSchema>;

export type UpdateCartItemSchemaInput =
    z.infer<typeof updateCartItemSchema>;