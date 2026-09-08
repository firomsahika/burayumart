import { prisma } from "../../lib/prisma";

export async function findWishlistItem(
    userId: string,
    productId: string
) {
    return prisma.wishlistItem.findUnique({
        where: {
            userId_productId: {
                userId,
                productId,
            },
        },
    });
}

export async function createWishlistItem(
    userId: string,
    productId: string
) {
    return prisma.wishlistItem.create({
        data: {
            userId,
            productId,
        },

        include: {
            product: {
                include: {
                    images: {
                        orderBy: {
                            position: "asc",
                        },
                    },
                },
            },
        },
    });
}

export async function deleteWishlistItem(
    userId: string,
    productId: string
) {
    return prisma.wishlistItem.delete({
        where: {
            userId_productId: {
                userId,
                productId,
            },
        },
    });
}

export async function findWishlist(
    userId: string
) {
    return prisma.wishlistItem.findMany({
        where: {
            userId,
        },

        include: {
            product: {
                include: {
                    images: {
                        orderBy: {
                            position: "asc",
                        },
                    },

                    category: true,

                    seller: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function findProductById(
    productId: string
) {
    return prisma.product.findUnique({
        where: {
            id: productId,
        },
    });
}