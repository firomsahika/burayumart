import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters")
        .optional(),

    image: z
        .string()
        .url("Image must be a valid URL")
        .nullable()
        .optional(),
});

export const createAddressSchema = z.object({
    label: z
        .string()
        .trim()
        .min(1, "Address label is required")
        .max(50),

    fullName: z
        .string()
        .trim()
        .min(2, "Full name is required")
        .max(100),

    phone: z
        .string()
        .trim()
        .min(9, "Invalid phone number")
        .max(20),

    city: z
        .string()
        .trim()
        .min(2, "City is required")
        .max(100),

    subCity: z
        .string()
        .trim()
        .max(100)
        .optional(),

    woreda: z
        .string()
        .trim()
        .max(100)
        .optional(),

    kebele: z
        .string()
        .trim()
        .max(100)
        .optional(),

    street: z
        .string()
        .trim()
        .max(200)
        .optional(),

    landmark: z
        .string()
        .trim()
        .max(200)
        .optional(),

    latitude: z
        .number()
        .min(-90)
        .max(90)
        .optional(),

    longitude: z
        .number()
        .min(-180)
        .max(180)
        .optional(),

    isDefault: z
        .boolean()
        .optional(),
});

export const updateAddressSchema = createAddressSchema.partial();