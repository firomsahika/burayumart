import { z } from "zod";

export const createCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(100, "Category name must not exceed 100 characters"),

    slug: z
        .string()
        .trim()
        .min(2, "Slug must be at least 2 characters")
        .max(120, "Slug must not exceed 120 characters")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers, and hyphens"
        )
        .optional(),

    image: z
        .string()
        .url("Image must be a valid URL")
        .nullable()
        .optional(),

    isActive: z
        .boolean()
        .optional(),
});

export const updateCategorySchema =
    z.object({
        name: z
            .string()
            .trim()
            .min(
                2,
                "Category name must be at least 2 characters"
            )
            .max(
                100,
                "Category name must not exceed 100 characters"
            )
            .optional(),

        slug: z
            .string()
            .trim()
            .min(2, "Slug must be at least 2 characters")
            .max(
                120,
                "Slug must not exceed 120 characters"
            )
            .regex(
                /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                "Slug must contain only lowercase letters, numbers, and hyphens"
            )
            .optional(),

        image: z
            .string()
            .url("Image must be a valid URL")
            .nullable()
            .optional(),

        isActive: z
            .boolean()
            .optional(),
    });

export const categoryQuerySchema = z.object({
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

    isActive: z
        .enum(["true", "false"])
        .transform((value) => value === "true")
        .optional(),
});