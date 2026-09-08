import { AppError } from "../../middleware/app-error";

import * as reviewsRepository
    from "./reviews.repository";

import type {
    CreateReviewInput,
    UpdateReviewInput,
} from "./reviews.types";

export async function createReview(
    userId: string,
    data: CreateReviewInput
) {
    const product =
        await reviewsRepository.findProductById(
            data.productId
        );

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    const existingReview =
        await reviewsRepository
            .findReviewByUserAndProduct(
                userId,
                data.productId
            );

    if (existingReview) {
        throw new AppError(
            "You have already reviewed this product",
            409,
            "REVIEW_ALREADY_EXISTS"
        );
    }

    const purchasedItem =
        await reviewsRepository
            .findDeliveredOrderItem(
                userId,
                data.orderId,
                data.productId
            );

    if (!purchasedItem) {
        throw new AppError(
            "You can only review products from delivered orders",
            403,
            "PRODUCT_NOT_PURCHASED"
        );
    }

    return reviewsRepository.createReview(
        userId,
        data
    );
}


export async function getProductReviews(
    productId: string
) {
    const product =
        await reviewsRepository.findProductById(
            productId
        );

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    const reviews =
        await reviewsRepository.findProductReviews(
            productId
        );

    const rating =
        await reviewsRepository
            .getProductRatingSummary(
                productId
            );

    return {
        reviews,
        rating,
    };
}

export async function updateReview(
    userId: string,
    reviewId: string,
    data: UpdateReviewInput
) {
    const review =
        await reviewsRepository.findReviewById(
            reviewId
        );

    if (!review) {
        throw new AppError(
            "Review not found",
            404,
            "REVIEW_NOT_FOUND"
        );
    }

    if (review.userId !== userId) {
        throw new AppError(
            "You can only modify your own reviews",
            403,
            "REVIEW_ACCESS_DENIED"
        );
    }

    return reviewsRepository.updateReview(
        reviewId,
        data
    );
}


export async function deleteReview(
    userId: string,
    reviewId: string
) {
    const review =
        await reviewsRepository.findReviewById(
            reviewId
        );

    if (!review) {
        throw new AppError(
            "Review not found",
            404,
            "REVIEW_NOT_FOUND"
        );
    }

    if (review.userId !== userId) {
        throw new AppError(
            "You can only delete your own reviews",
            403,
            "REVIEW_ACCESS_DENIED"
        );
    }

    await reviewsRepository.deleteReview(
        reviewId
    );
}

export async function getMyReviews(
    userId: string
) {
    return reviewsRepository.findMyReviews(
        userId
    );
}

