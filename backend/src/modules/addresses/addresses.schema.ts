import { z } from "zod";

const optionalString = z
    .string()
    .trim()
    .min(1)
    .optional();

const optionalNumber = z
    .number()
    .finite()
    .optional();

export const createAddressSchema = z.object({
    label: z
        .string()
        .trim()
        .min(1, "Address label is required")
        .max(50, "Address label is too long"),

    fullName: z
        .string()
        .trim()
        .min(2, "Full name must contain at least 2 characters")
        .max(100, "Full name is too long"),

    phone: z
        .string()
        .trim()
        .min(9, "Invalid phone number")
        .max(20, "Invalid phone number"),

    city: z
        .string()
        .trim()
        .min(1, "City is required")
        .max(100),

    subCity: optionalString,
    woreda: optionalString,
    kebele: optionalString,
    street: optionalString,
    landmark: optionalString,

    latitude: optionalNumber,
    longitude: optionalNumber,

    isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();

export const addressIdParamsSchema = z.object({
    id: z.string().trim().min(1, "Address ID is required"),
});

export type CreateAddressSchemaInput =
    z.infer<typeof createAddressSchema>;

export type UpdateAddressSchemaInput =
    z.infer<typeof updateAddressSchema>;