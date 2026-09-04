import { z } from "zod";
import { ProductCondition } from "../../generated/prisma/enums";
// import { ProductCondition } from "../../generated/prisma";

export const productImageSchema = z.object({
    url: z
        .string()
        .url("Image URL must be valid"),

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

export const createProductSchema = z
    .object({
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
            .max(100)
            .optional(),

        brand: z
            .string()
            .trim()
            .max(100)
            .optional(),

        condition: z
            .nativeEnum(ProductCondition, {
                message: "Invalid product condition"
            })
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
            .min(1)
            .optional(),

        images: z
            .array(productImageSchema)
            .max(10, "A product can have at most 10 images")
            .optional(),
    })
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
            if (!data.images) return true;

            const positions = data.images.map(
                (image) => image.position
            );

            return (
                new Set(positions).size ===
                positions.length
            );
        },
        {
            message:
                "Image positions must be unique",
            path: ["images"],
        }
    );



export const updateProductSchema = createProductSchema
    .partial();

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

    minPrice: z.coerce
        .number()
        .min(0)
        .optional(),

    maxPrice: z.coerce
        .number()
        .min(0)
        .optional(),
});