import type { Prisma } from "../../generated/prisma/client";

export function mapAddress(address: {
    id: string;
    label: string;
    fullName: string;
    phone: string;
    city: string;
    subCity: string | null;
    woreda: string | null;
    kebele: string | null;
    street: string | null;
    landmark: string | null;
    latitude: Prisma.Decimal | null;
    longitude: Prisma.Decimal | null;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}) {
    return {
        id: address.id,

        label: address.label,
        fullName: address.fullName,
        phone: address.phone,

        location: {
            city: address.city,
            subCity: address.subCity,
            woreda: address.woreda,
            kebele: address.kebele,
            street: address.street,
            landmark: address.landmark,
        },

        coordinates:
            address.latitude !== null &&
                address.longitude !== null
                ? {
                    latitude: address.latitude,
                    longitude: address.longitude,
                }
                : null,

        isDefault: address.isDefault,

        createdAt: address.createdAt,
        updatedAt: address.updatedAt,
    };
}