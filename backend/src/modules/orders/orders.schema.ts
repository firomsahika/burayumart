import { z } from "zod";

/**
 * Create Order / Checkout
 */
export const createOrderSchema = z.object({
    addressId: z
        .string()
        .min(
            1,
            "Address ID is required"
        ),

    customerNote: z
        .string()
        .trim()
        .max(
            500,
            "Customer note cannot exceed 500 characters"
        )
        .optional(),
});

/**
 * Order ID route parameter
 *
 * Example:
 * GET /api/v1/orders/:id
 */
export const orderIdParamsSchema =
    z.object({
        id: z
            .string()
            .min(
                1,
                "Order ID is required"
            ),
    });

/**
 * Seller order status update
 */
export const updateOrderStatusSchema =
    z.object({
        status: z.enum([
            "CONFIRMED",
            "PROCESSING",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED",
        ]),
    });

/**
 * Inferred types
 *
 * These are optional because we already
 * have our domain types in orders.types.ts.
 */
export type CreateOrderSchemaInput =
    z.infer<
        typeof createOrderSchema
    >;

export type UpdateOrderStatusSchemaInput =
    z.infer<
        typeof updateOrderStatusSchema
    >;