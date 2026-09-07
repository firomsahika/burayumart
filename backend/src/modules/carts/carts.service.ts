import { AppError } from "../../middleware/app-error";
import * as cartRepository from "./carts.repository";
import { prisma } from "../../lib/prisma";
import type {
    AddCartItemInput,
    UpdateCartItemInput,
} from "./carts.types";

export async function addToCart(
    userId: string,
    data: AddCartItemInput
) {
    const product =
        await prisma.product.findUnique({
            where: {
                id: data.productId,
            },
        });

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    if (product.status !== "AVAILABLE") {
        throw new AppError(
            "This product is not available",
            400,
            "PRODUCT_NOT_AVAILABLE"
        );
    }

    if (product.quantity <= 0) {
        throw new AppError(
            "This product is out of stock",
            400,
            "PRODUCT_OUT_OF_STOCK"
        );
    }

    const existingItem =
        await cartRepository.findCartItem(
            userId,
            data.productId
        );

    const newQuantity =
        (existingItem?.quantity ?? 0) +
        data.quantity;

    if (newQuantity > product.quantity) {
        throw new AppError(
            `Only ${product.quantity} item(s) are available`,
            400,
            "INSUFFICIENT_STOCK"
        );
    }

    if (existingItem) {
        return cartRepository.updateCartItem(
            userId,
            existingItem.id,
            {
                quantity: newQuantity,
            }
        );
    }

    return cartRepository.createCartItem(
        userId,
        data
    );
}

export async function getMyCart(
    userId: string
) {
    const items =
        await cartRepository.findMyCart(
            userId
        );

    return items;
}

export async function updateCartItem(
    userId: string,
    itemId: string,
    data: UpdateCartItemInput
) {
    const item =
        await cartRepository.findCartItemById(
            userId,
            itemId
        );

    if (!item) {
        throw new AppError(
            "Cart item not found",
            404,
            "CART_ITEM_NOT_FOUND"
        );
    }

    if (item.product.status !== "AVAILABLE") {
        throw new AppError(
            "This product is no longer available",
            400,
            "PRODUCT_NOT_AVAILABLE"
        );
    }

    if (item.product.quantity <= 0) {
        throw new AppError(
            "This product is out of stock",
            400,
            "PRODUCT_OUT_OF_STOCK"
        );
    }

    if (
        data.quantity >
        item.product.quantity
    ) {
        throw new AppError(
            `Only ${item.product.quantity} item(s) are available`,
            400,
            "INSUFFICIENT_STOCK"
        );
    }

    return cartRepository.updateCartItem(
        userId,
        itemId,
        data
    );
}

export async function removeFromCart(
    userId: string,
    itemId: string
) {
    const item =
        await cartRepository.findCartItemById(
            userId,
            itemId
        );

    if (!item) {
        throw new AppError(
            "Cart item not found",
            404,
            "CART_ITEM_NOT_FOUND"
        );
    }

    await prisma.cartItem.delete({
        where: {
            id: itemId,
        },
    });

    return {
        id: itemId,
    };
}

export async function clearMyCart(
    userId: string
) {
    const result =
        await cartRepository.clearCart(
            userId
        );

    return {
        deletedCount: result.count,
    };
}