import { Prisma, OrderStatus } from "../../generated/prisma/client";

export type CreateOrderInput = {
    addressId: string;
    customerNote?: string;
};

export type OrderItemSnapshot = {
    productId: string;
    productName: string;
    productImage?: string | null;
    quantity: number;
    unitPrice: Prisma.Decimal;
    totalPrice: Prisma.Decimal;
};

export type OrderWithDetails = Prisma.OrderGetPayload<{
    include: {
        address: true;
        items: {
            include: {
                product: {
                    include: {
                        images: true;
                        seller: true;
                    };
                };
            };
        };
    };
}>;

export type OrderListItem = Prisma.OrderGetPayload<{
    include: {
        items: true;
    };
}>;

export type UpdateOrderStatusInput = {
    status: OrderStatus;
};