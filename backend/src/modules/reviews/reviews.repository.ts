import { prisma } from "../../lib/prisma";

export async function findProductById(
    productId: string
) {
    return prisma.product.findUnique({
        where: {
            id: productId,
        },
    });
}

export async function findReviewByUserAndProduct(
    userId: string,
    productId: string
) {
    return prisma.review.findUnique({
        where: {
            userId_productId: {
                userId,
                productId,
            },
        },
    });
}

export async function findDeliveredOrderItem(
    userId: string,
    orderId: string,
    productId: string
) {
    return prisma.orderItem.findFirst({
        where: {
            orderId,
            productId,

            order: {
                userId,
                status: "DELIVERED",
            },
        },
    });
}

export async function createReview(
    userId: string,
    data: {
        productId: string;
        orderId: string;
        rating: number;
        comment?: string;
    }
) {
    return prisma.review.create({
        data: {
            userId,
            productId: data.productId,
            orderId: data.orderId,
            rating: data.rating,

            ...(data.comment !== undefined && {
                comment: data.comment,
            }),
        },

        include: {
            user: true,
            product: true,
        },
    });
}

export async function findMyReviews(
    userId: string
) {
    return prisma.review.findMany({
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
                        take: 1,
                    },
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function findReviewById(
    reviewId: string
) {
    return prisma.review.findUnique({
        where: {
            id: reviewId,
        },

        include: {
            user: true,
            product: {
                include: {
                    images: {
                        orderBy: {
                            position: "asc",
                        },
                        take: 1,
                    },
                },
            },
        },
    });
}

export async function updateReview(
    reviewId: string,
    data: {
        rating?: number;
        comment?: string;
    }
) {
    return prisma.review.update({
        where: {
            id: reviewId,
        },

        data: {
            ...(data.rating !== undefined && {
                rating: data.rating,
            }),

            ...(data.comment !== undefined && {
                comment: data.comment,
            }),
        },

        include: {
            user: true,
            product: true,
        },
    });
}

export async function deleteReview(
    reviewId: string
) {
    return prisma.review.delete({
        where: {
            id: reviewId,
        },
    });
}


export async function findProductReviews(
    productId: string
) {
    return prisma.review.findMany({
        where: {
            productId,
        },

        include: {
            user: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getProductRatingSummary(
    productId: string
) {
    const result =
        await prisma.review.aggregate({
            where: {
                productId,
            },

            _avg: {
                rating: true,
            },

            _count: {
                rating: true,
            },
        });

    const distribution =
        await prisma.review.groupBy({
            by: ["rating"],

            where: {
                productId,
            },

            _count: {
                rating: true,
            },
        });

    return {
        averageRating:
            result._avg.rating ?? 0,

        reviewCount:
            result._count.rating,

        distribution,
    };
}
