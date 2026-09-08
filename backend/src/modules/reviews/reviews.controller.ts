import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as reviewsService
    from "./reviews.service";

import {
    createReviewSchema,
    updateReviewSchema,
    reviewIdParamsSchema,
    productIdParamsSchema,
} from "./reviews.schema";

import { mapReview } from "./reviews.mapper";

export async function createReview(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const data =
            createReviewSchema.parse(
                req.body
            );

        const review =
            await reviewsService.createReview(
                req.user!.id,
                data
            );

        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: {
                review: mapReview(review),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getProductReviews(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { productId } =
            productIdParamsSchema.parse(
                req.params
            );

        const result =
            await reviewsService
                .getProductReviews(
                    productId
                );

        return res.status(200).json({
            success: true,
            message:
                "Product reviews fetched successfully",
            data: {
                reviews:
                    result.reviews.map(
                        mapReview
                    ),

                rating: result.rating,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyReviews(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const reviews =
            await reviewsService.getMyReviews(
                req.user!.id
            );

        return res.status(200).json({
            success: true,
            message:
                "Your reviews fetched successfully",
            data: {
                reviews:
                    reviews.map(mapReview),
            },
        });
    } catch (error) {
        next(error);
    }
}


export async function updateReview(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            reviewIdParamsSchema.parse(
                req.params
            );

        const data =
            updateReviewSchema.parse(
                req.body
            );

        const review =
            await reviewsService.updateReview(
                req.user!.id,
                id,
                data
            );

        return res.status(200).json({
            success: true,
            message:
                "Review updated successfully",
            data: {
                review: mapReview(review),
            },
        });
    } catch (error) {
        next(error);
    }
}


export async function deleteReview(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            reviewIdParamsSchema.parse(
                req.params
            );

        await reviewsService.deleteReview(
            req.user!.id,
            id
        );

        return res.status(200).json({
            success: true,
            message:
                "Review deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}
