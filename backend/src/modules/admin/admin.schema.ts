import { z } from "zod";

export const sellerIdParamsSchema =
    z.object({
        id: z.string().min(1),
    });

export const productIdParamsSchema =
    z.object({
        id: z.string().min(1),
    });

export const updateSellerStatusSchema =
    z.object({
        status: z.enum([
            "APPROVED",
            "REJECTED",
            "SUSPENDED",
        ]),

        rejectionReason: z
            .string()
            .trim()
            .max(
                1000,
                "Rejection reason cannot exceed 1000 characters"
            )
            .optional(),
    });

export const updateProductStatusSchema =
    z.object({
        status: z.enum([
            "AVAILABLE",
            "REJECTED",
            "ARCHIVED",
        ]),

        rejectionReason: z
            .string()
            .trim()
            .max(
                1000,
                "Rejection reason cannot exceed 1000 characters"
            )
            .optional(),
    });