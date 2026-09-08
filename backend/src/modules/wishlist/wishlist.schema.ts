import { z } from "zod";

export const productIdParamsSchema =
    z.object({
        productId: z
            .string()
            .min(1, "Product ID is required"),
    });

export type ProductIdParams = z.infer<
    typeof productIdParamsSchema
>;