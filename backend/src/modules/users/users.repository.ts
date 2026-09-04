import { prisma } from "../../lib/prisma";
import type {
  UpdateProfileInput,
  CreateAddressInput,
  UpdateAddressInput,
} from "./users.types";

export async function findUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      sellerProfile: true,
      addresses: {
        orderBy: [
          {
            isDefault: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
      },
    },
  });
}

export async function updateUser(
  userId: string,
  data: UpdateProfileInput
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.image !== undefined && { image: data.image }),
    },
  });
}

export async function findAddressesByUserId(userId: string) {
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
      ...(data.subCity !== undefined && { subCity: data.subCity }),
      ...(data.woreda !== undefined && { woreda: data.woreda }),
      ...(data.kebele !== undefined && { kebele: data.kebele }),
      ...(data.street !== undefined && { street: data.street }),
      ...(data.landmark !== undefined && { landmark: data.landmark }),
      ...(data.latitude !== undefined && { latitude: data.latitude }),
      ...(data.longitude !== undefined && { longitude: data.longitude }),
      ...(data.isDefault !== undefined && { isDefault: data.isDefault }),
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
    data: {
      ...(data.label !== undefined && { label: data.label }),
      ...(data.fullName !== undefined && { fullName: data.fullName }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.city !== undefined && { city: data.city }),
      ...(data.subCity !== undefined && { subCity: data.subCity }),
      ...(data.woreda !== undefined && { woreda: data.woreda }),
      ...(data.kebele !== undefined && { kebele: data.kebele }),
      ...(data.street !== undefined && { street: data.street }),
      ...(data.landmark !== undefined && { landmark: data.landmark }),
      ...(data.latitude !== undefined && { latitude: data.latitude }),
      ...(data.longitude !== undefined && { longitude: data.longitude }),
      ...(data.isDefault !== undefined && { isDefault: data.isDefault }),
    },
  });
}

export async function deleteAddress(addressId: string) {
  return prisma.address.delete({
    where: {
      id: addressId,
    },
  });
}

export async function clearDefaultAddresses(userId: string) {
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