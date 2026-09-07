import { AppError } from "../../middleware/app-error";
import * as ordersRepository from "./orders.repository";
import type {
    CreateOrderInput,
} from "./orders.types";



export async function createOrder(
    userId: string,
    data: CreateOrderInput
) {
    // 1. Verify address belongs to user
    const address =
        await ordersRepository.findUserAddress(
            userId,
            data.addressId
        );

    if (!address) {
        throw new AppError(
            "The selected address was not found",
            404,
            "ADDRESS_NOT_FOUND"
        );
    }

    // 2. Check cart
    const cart =
        await ordersRepository.findUserCart(
            userId
        );

    if (!cart || cart.items.length === 0) {
        throw new AppError(
            "Your cart is empty",
            400,
            "CART_EMPTY"
        );
    }

    // 3. Validate every product
    for (const item of cart.items) {
        const product = item.product;

        if (product.status !== "AVAILABLE") {
            throw new AppError(
                `Product "${product.name}" is no longer available`,
                400,
                "PRODUCT_NOT_AVAILABLE"
            );
        }

        if (
            product.quantity <
            item.quantity
        ) {
            throw new AppError(
                `Not enough stock for "${product.name}"`,
                400,
                "INSUFFICIENT_STOCK"
            );
        }

        if (
            item.quantity <
            product.minimumOrderQuantity
        ) {
            throw new AppError(
                `"${product.name}" requires a minimum order quantity of ${product.minimumOrderQuantity}`,
                400,
                "MINIMUM_ORDER_QUANTITY_NOT_MET"
            );
        }
    }

    // 4. Create order
    return ordersRepository.createOrderFromCart(
        userId,
        data.addressId,
        data.customerNote
    );
}

export async function getMyOrders(
    userId: string
) {
    return ordersRepository.findUserOrders(
        userId
    );
}

export async function getMyOrderById(
    userId: string,
    orderId: string
) {
    const order =
        await ordersRepository.findUserOrderById(
            userId,
            orderId
        );

    if (!order) {
        throw new AppError(
            "Order not found",
            404,
            "ORDER_NOT_FOUND"
        );
    }

    return order;

}