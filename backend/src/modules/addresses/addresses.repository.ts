import { prisma } from "../../lib/prisma";
import type {
    CreateAddressInput,
    UpdateAddressInput,
} from "./addresses.types";


export async function createAddress(
    userId: string,
    data: CreateAddressInput
) {
    return prisma.address.create({
        data: {
            userId,
            label: data.label,
            fullName: data.fullName,
            phone: data.phone,

            city: data.city,
            subCity: data.subCity,
            woreda: data.woreda,
            kebele: data.kebele,
            street: data.street,
            landmark: data.landmark,

            latitude: data.latitude,
            longitude: data.longitude,

            isDefault: data.isDefault ?? false,
        },
    });
}

export async function findAddressesByUserId(
    userId: string
) {
    return prisma.address.findMany({
        where: {
            userId,
        },
        orderBy: [
            {
                isDefault: "desc",
            },
            {
                createdAt: "desc",
            },
        ],
    });
}

export async function findAddressById(
    addressId: string
) {
    return prisma.address.findUnique({
        where: {
            id: addressId,
        },
    });
}

export async function findUserAddressById(
    addressId: string,
    userId: string
) {
    return prisma.address.findFirst({
        where: {
            id: addressId,
            userId,
        },
    });
}

export async function clearDefaultAddresses(
    userId: string
) {
    return prisma.address.updateMany({
        where: {
            userId,
            isDefault: true,
        },
        data: {
            isDefault: false,
        },
    });
}

export async function updateAddress(
    addressId: string,
    data: UpdateAddressInput
) {
    return prisma.address.update({
        where: {
            id: addressId,
        },
        data,
    });
}

export async function deleteAddress(
    addressId: string
) {
    return prisma.address.delete({
        where: {
            id: addressId,
        },
    });
}