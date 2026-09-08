import { prisma } from "../../lib/prisma";

export async function findPendingSellers() {
    return prisma.sellerProfile.findMany({
        where: {
            status: "PENDING",
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },

            products: {
                select: {
                    id: true,
                    name: true,
                    status: true,
                },
            },
        },

        orderBy: {
            createdAt: "asc",
        },
    });
}


export async function findSellerById(
    sellerId: string
) {
    return prisma.sellerProfile.findUnique({
        where: {
            id: sellerId,
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
    });
}

export async function updateSellerStatus(
    sellerId: string,
    status:
        | "APPROVED"
        | "REJECTED"
        | "SUSPENDED"
) {
    return prisma.sellerProfile.update({
        where: {
            id: sellerId,
        },

        data: {
            status,
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
    });
}


export async function findPendingProducts() {
    return prisma.product.findMany({
        where: {
            status: "PENDING_REVIEW",
        },

        include: {
            seller: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },

            category: true,

            images: {
                orderBy: {
                    position: "asc",
                },
            },
        },

        orderBy: {
            createdAt: "asc",
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

        include: {
            seller: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },

            category: true,

            images: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });
}

export async function updateProductStatus(
    productId: string,
    status:
        | "AVAILABLE"
        | "REJECTED"
        | "ARCHIVED",
    rejectionReason?: string
) {
    return prisma.product.update({
        where: {
            id: productId,
        },

        data: {
            status,

            ...(rejectionReason !== undefined && {
                rejectionReason,
            }),

            reviewedAt: new Date(),
        },

        include: {
            seller: true,
            category: true,

            images: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });
}