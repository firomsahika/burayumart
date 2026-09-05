import { z } from "zod";

export const productImageSchema = z.object({
    url: z.string().url("Image URL must be valid"),

    publicId: z
        .string()
        .trim()
        .min(1, "Image public ID is required")
        .max(500),

    position: z
        .number()
        .int()
        .min(0)
        .max(9),
});

/**
 * Base fields shared by create and update.
 *
 * IMPORTANT:
 * Do not put .refine() here.
 * Zod 4 requires this schema to remain a plain object
 * so that .partial() can be used safely.
 */
const productBaseSchema = z.object({
    categoryId: z
        .string()
        .trim()
        .min(1, "Category is required"),

    name: z
        .string()
        .trim()
        .min(2, "Product name must be at least 2 characters")
        .max(200, "Product name must not exceed 200 characters"),

    description: z
        .string()
        .trim()
        .max(5000, "Description must not exceed 5000 characters")
        .optional(),

    sku: z
        .string()
        .trim()
        .max(100, "SKU must not exceed 100 characters")
        .optional(),

    brand: z
        .string()
        .trim()
        .max(100, "Brand must not exceed 100 characters")
        .optional(),

    condition: z
        .enum([
            "NEW",
            "LIKE_NEW",
            "USED",
            "REFURBISHED",
        ])
        .optional(),

    price: z
        .number()
        .positive("Price must be greater than 0"),

    compareAtPrice: z
        .number()
        .positive("Compare-at price must be greater than 0")
        .optional(),

    quantity: z
        .number()
        .int()
        .min(0, "Quantity cannot be negative"),

    minimumOrderQuantity: z
        .number()
        .int()
        .min(1, "Minimum order quantity must be at least 1")
        .optional(),

    images: z
        .array(productImageSchema)
        .max(10, "A product can have at most 10 images")
        .optional(),
});

/**
 * Create product
 */
export const createProductSchema = productBaseSchema
    .refine(
        (data) =>
            data.compareAtPrice === undefined ||
            data.compareAtPrice > data.price,
        {
            message:
                "Compare-at price must be greater than the product price",
            path: ["compareAtPrice"],
        }
    )
    .refine(
        (data) => {
            if (!data.images) {
                return true;
            }

            const positions = data.images.map(
                (image) => image.position
            );

            return new Set(positions).size === positions.length;
        },
        {
            message: "Image positions must be unique",
            path: ["images"],
        }
    );

/**
 * Update product
 *
 * IMPORTANT:
 * We call .partial() BEFORE adding refinements.
 */
export const updateProductSchema = productBaseSchema
    .partial()
    .refine(
        (data) =>
            data.compareAtPrice === undefined ||
            data.price === undefined ||
            data.compareAtPrice > data.price,
        {
            message:
                "Compare-at price must be greater than the product price",
            path: ["compareAtPrice"],
        }
    )
    .refine(
        (data) => {
            if (!data.images) {
                return true;
            }

            const positions = data.images.map(
                (image) => image.position
            );

            return new Set(positions).size === positions.length;
        },
        {
            message: "Image positions must be unique",
            path: ["images"],
        }
    );

/**
 * Seller product listing query
 */
export const productQuerySchema = z.object({
    page: z.coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(20),

    search: z
        .string()
        .trim()
        .optional(),

    categoryId: z
        .string()
        .trim()
        .optional(),

    status: z
        .string()
        .trim()
        .optional(),

    minPrice: z
        .coerce
        .number()
        .min(0)
        .optional(),

    maxPrice: z
        .coerce
        .number()
        .min(0)
        .optional(),
});

/**
 * Inventory update
 */
export const updateInventorySchema = z.object({
    quantity: z
        .number()
        .int()
        .min(0, "Quantity cannot be negative"),
});

/**
 * Product moderation
 */
export const moderateProductSchema = z
    .object({
        status: z.enum([
            "AVAILABLE",
            "REJECTED",
        ]),

        rejectionReason: z
            .string()
            .trim()
            .min(
                5,
                "Rejection reason must be at least 5 characters"
            )
            .max(
                1000,
                "Rejection reason must not exceed 1000 characters"
            )
            .optional(),
    })
    .superRefine((data, ctx) => {
        if (
            data.status === "REJECTED" &&
            !data.rejectionReason
        ) {
            ctx.addIssue({
                code: "custom",
                path: ["rejectionReason"],
                message:
                    "Rejection reason is required when rejecting a product",
            });
        }
    });