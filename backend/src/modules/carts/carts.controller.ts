import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as cartService from "./carts.service";

import {
    addCartItemSchema,
    updateCartItemSchema,
    cartItemIdParamsSchema,
} from "./carts.schema";

import { mapCartItem } from "./carts.mapper";

export async function addToCart(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const data =
            addCartItemSchema.parse(
                req.body
            );

        const item =
            await cartService.addToCart(
                req.user!.id,
                data
            );

        return res.status(201).json({
            success: true,
            message:
                "Product added to cart successfully",
            data: {
                item: mapCartItem(item),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyCart(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const items =
            await cartService.getMyCart(
                req.user!.id
            );

        const mappedItems =
            items.map(mapCartItem);

        const totalItems =
            mappedItems.reduce(
                (total, item) =>
                    total + item.quantity,
                0
            );

        const subtotal =
            mappedItems.reduce(
                (total, item) =>
                    total + item.subtotal,
                0
            );

        return res.status(200).json({
            success: true,
            data: {
                items: mappedItems,

                summary: {
                    totalItems,
                    subtotal,
                },
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateCartItem(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { itemId } =
            cartItemIdParamsSchema.parse(
                req.params
            );

        const data =
            updateCartItemSchema.parse(
                req.body
            );

        const item =
            await cartService.updateCartItem(
                req.user!.id,
                itemId,
                data
            );

        return res.status(200).json({
            success: true,
            message:
                "Cart item updated successfully",
            data: {
                item: mapCartItem(item),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function removeFromCart(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { itemId } =
            cartItemIdParamsSchema.parse(
                req.params
            );

        await cartService.removeFromCart(
            req.user!.id,
            itemId
        );

        return res.status(200).json({
            success: true,
            message:
                "Product removed from cart successfully",
            data: null,
        });
    } catch (error) {
        next(error);
    }
}

export async function clearMyCart(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result =
            await cartService.clearMyCart(
                req.user!.id
            );

        return res.status(200).json({
            success: true,
            message:
                "Cart cleared successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}