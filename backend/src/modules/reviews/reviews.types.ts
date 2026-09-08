import { Prisma } from "../../generated/prisma/client";

export type CreateReviewInput = {
    productId: string;
    orderId: string;
    rating: number;
    comment?: string;
};

export type UpdateReviewInput = {
    rating?: number;
    comment?: string;
};

export type ReviewWithDetails =
    Prisma.ReviewGetPayload<{
        include: {
            user: true;
            product: true;
        };
    }>;