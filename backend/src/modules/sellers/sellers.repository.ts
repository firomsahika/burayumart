import { prisma } from "../../lib/prisma";
import type {
  ApplyAsSellerInput,
  UpdateSellerProfileInput,
} from "./sellers.types";


export async function findSellerByUserId(
  userId: string
) {
  return prisma.sellerProfile.findUnique({
    where: {
      userId,
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
}

export async function createSellerProfile(
  userId: string,
  data: ApplyAsSellerInput
) {
  return prisma.sellerProfile.create({
    data: {
      userId,
      storeName: data.storeName,
      status: "PENDING",
      ...(data.description !== undefined && { description: data.description }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.logo !== undefined && { logo: data.logo }),
    },
  });
}

export async function updateSellerProfile(
  sellerId: string,
  data: UpdateSellerProfileInput
) {
  return prisma.sellerProfile.update({
    where: {
      id: sellerId,
    },
    data: {
      ...(data.storeName !== undefined && { storeName: data.storeName }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.logo !== undefined && { logo: data.logo }),
    },
  });
}