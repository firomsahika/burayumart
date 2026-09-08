import { AppError } from "../../middleware/app-error";
import * as wishlistRepository from "./wishlist.repository";

export async function addToWishlist(
    userId: string,
    productId: string
) {
    const product =
        await wishlistRepository.findProductById(
            productId
        );

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    const existing =
        await wishlistRepository.findWishlistItem(
            userId,
            productId
        );

    if (existing) {
        throw new AppError(
            "Product is already in your wishlist",
            409,
            "PRODUCT_ALREADY_WISHLISTED"
        );
    }

    return wishlistRepository.createWishlistItem(
        userId,
        productId
    );
}

export async function removeFromWishlist(
    userId: string,
    productId: string
) {
    const existing =
        await wishlistRepository.findWishlistItem(
            userId,
            productId
        );

    if (!existing) {
        throw new AppError(
            "Product is not in your wishlist",
            404,
            "WISHLIST_ITEM_NOT_FOUND"
        );
    }

    await wishlistRepository.deleteWishlistItem(
        userId,
        productId
    );
}

export async function getMyWishlist(
    userId: string
) {
    return wishlistRepository.findWishlist(
        userId
    );
}

export async function isProductWishlisted(
    userId: string,
    productId: string
) {
    const item =
        await wishlistRepository.findWishlistItem(
            userId,
            productId
        );

    return Boolean(item);
}