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