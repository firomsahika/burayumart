import { z } from "zod";

export const createReviewSchema =
    z.object({
        productId: z
            .string()
            .min(1, "Product ID is required"),

        orderId: z
            .string()
            .min(1, "Order ID is required"),

        rating: z
            .number()
            .int()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating cannot exceed 5"),

        comment: z
            .string()
            .trim()
            .max(
                1000,
                "Review cannot exceed 1000 characters"
            )
            .optional(),
    });

export const updateReviewSchema =
    z.object({
        rating: z
            .number()
            .int()
            .min(1)
            .max(5)
            .optional(),

        comment: z
            .string()
            .trim()
            .max(1000)
            .optional(),
    });

export const reviewIdParamsSchema =
    z.object({
        id: z
            .string()
            .min(1, "Review ID is required"),
    });

export const productIdParamsSchema =
    z.object({
        productId: z
            .string()
            .min(1, "Product ID is required"),
    });