import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as ordersService
    from "./orders.service";

import {
    createOrderSchema,
    orderIdParamsSchema,
    updateOrderStatusSchema,
} from "./orders.schema";

import {
    mapOrder,
} from "./orders.mapper";

export async function createOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const data =
            createOrderSchema.parse(
                req.body
            );

        const order =
            await ordersService.createOrder(
                req.user!.id,
                data
            );

        return res.status(201).json({
            success: true,
            message:
                "Order created successfully",
            data: {
                order: mapOrder(order),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyOrders(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const orders =
            await ordersService.getMyOrders(
                req.user!.id
            );

        return res.status(200).json({
            success: true,
            message:
                "Orders fetched successfully",
            data: {
                orders: orders.map(
                    mapOrder
                ),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyOrderById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            orderIdParamsSchema.parse(
                req.params
            );

        const order =
            await ordersService.getMyOrderById(
                req.user!.id,
                id
            );

        return res.status(200).json({
            success: true,
            message:
                "Order fetched successfully",
            data: {
                order: mapOrder(order),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getSellerOrders(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const orders =
            await ordersService.getSellerOrders(
                req.seller!.id
            );

        return res.status(200).json({
            success: true,
            message:
                "Seller orders fetched successfully",
            data: {
                orders: orders.map(
                    mapOrder
                ),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getSellerOrderById(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            orderIdParamsSchema.parse(
                req.params
            );

        const order =
            await ordersService.getSellerOrderById(
                req.seller!.id,
                id
            );

        return res.status(200).json({
            success: true,
            message:
                "Seller order fetched successfully",
            data: {
                order: mapOrder(order),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateSellerOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            orderIdParamsSchema.parse(
                req.params
            );

        const { status } =
            updateOrderStatusSchema.parse(
                req.body
            );

        const order =
            await ordersService.updateSellerOrderStatus(
                req.seller!.id,
                id,
                status
            );

        return res.status(200).json({
            success: true,
            message:
                "Order status updated successfully",
            data: {
                order: mapOrder(order),
            },
        });
    } catch (error) {
        next(error);
    }
}