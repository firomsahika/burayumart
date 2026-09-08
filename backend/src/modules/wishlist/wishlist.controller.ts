import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as wishlistService
    from "./wishlist.service";

import {
    productIdParamsSchema,
} from "./wishlist.schema";

import {
    mapWishlistItem,
} from "./wishlist.mapper";

export async function addToWishlist(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { productId } =
            productIdParamsSchema.parse(
                req.params
            );

        const item =
            await wishlistService.addToWishlist(
                req.user!.id,
                productId
            );

        return res.status(201).json({
            success: true,
            message:
                "Product added to wishlist",
            data: {
                wishlistItem:
                    mapWishlistItem(item),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function removeFromWishlist(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { productId } =
            productIdParamsSchema.parse(
                req.params
            );

        await wishlistService.removeFromWishlist(
            req.user!.id,
            productId
        );

        return res.status(200).json({
            success: true,
            message:
                "Product removed from wishlist",
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyWishlist(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const wishlist =
            await wishlistService.getMyWishlist(
                req.user!.id
            );

        return res.status(200).json({
            success: true,
            message:
                "Wishlist fetched successfully",
            data: {
                wishlist:
                    wishlist.map(
                        mapWishlistItem
                    ),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function checkWishlist(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { productId } =
            productIdParamsSchema.parse(
                req.params
            );

        const isWishlisted =
            await wishlistService.isProductWishlisted(
                req.user!.id,
                productId
            );

        return res.status(200).json({
            success: true,
            data: {
                isWishlisted,
            },
        });
    } catch (error) {
        next(error);
    }
}