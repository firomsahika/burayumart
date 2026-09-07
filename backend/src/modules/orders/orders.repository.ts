import { prisma } from "../../lib/prisma";

export async function findUserCart(
    userId: string
) {
    return prisma.cart.findUnique({
        where: {
            userId,
        },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            images: {
                                orderBy: {
                                    position: "asc",
                                },
                                take: 1,
                            },
                            seller: true,
                            category: true,
                        },
                    },
                },
            },
        },
    });
}

export async function findUserAddress(
    userId: string,
    addressId: string
) {
    return prisma.address.findFirst({
        where: {
            id: addressId,
            userId,
        },
    });
}

export async function createOrderFromCart(
    userId: string,
    addressId: string,
    customerNote: string | undefined
) {
    return prisma.$transaction(
        async (tx) => {
            const cart =
                await tx.cart.findUnique({
                    where: {
                        userId,
                    },
                    include: {
                        items: {
                            include: {
                                product: {
                                    include: {
                                        images: {
                                            orderBy: {
                                                position:
                                                    "asc",
                                            },
                                            take: 1,
                                        },
                                    },
                                },
                            },
                        },
                    },
                });

            if (!cart) {
                throw new Error(
                    "CART_NOT_FOUND"
                );
            }

            if (cart.items.length === 0) {
                throw new Error(
                    "CART_EMPTY"
                );
            }

            const subtotal =
                cart.items.reduce(
                    (sum, item) => {
                        return (
                            sum +
                            Number(
                                item.product.price
                            ) *
                                item.quantity
                        );
                    },
                    0
                );

            const deliveryFee = 0;

            const total =
                subtotal + deliveryFee;

            const order =
                await tx.order.create({
                    data: {
                        userId,
                        addressId,
                        subtotal,
                        deliveryFee,
                        total,
                        customerNote,
                        status: "PENDING",

                        items: {
                            create: cart.items.map(
                                (item) => ({
                                    productId:
                                        item.product
                                            .id,

                                    productName:
                                        item.product
                                            .name,

                                    productImage:
                                        item.product
                                            .images[0]
                                            ?.url ??
                                        null,

                                    quantity:
                                        item.quantity,

                                    unitPrice:
                                        item.product
                                            .price,

                                    totalPrice:
                                        Number(
                                            item.product
                                                .price
                                        ) *
                                        item.quantity,
                                })
                            ),
                        },
                    },

                    include: {
                        address: true,
                        items: {
                            include: {
                                product: {
                                    include: {
                                        images: {
                                            orderBy: {
                                                position:
                                                    "asc",
                                            },
                                            take: 1,
                                        },
                                        seller: true,
                                    },
                                },
                            },
                        },
                    },
                });

            // Deduct stock
            for (const item of cart.items) {
                const updated =
                    await tx.product.updateMany({
                        where: {
                            id: item.productId,
                            status: "AVAILABLE",
                            quantity: {
                                gte: item.quantity,
                            },
                        },

                        data: {
                            quantity: {
                                decrement:
                                    item.quantity,
                            },
                        },
                    });

                if (updated.count !== 1) {
                    throw new Error(
                        "INSUFFICIENT_STOCK"
                    );
                }
            }

            // Clear cart
            await tx.cartItem.deleteMany({
                where: {
                    cartId: cart.id,
                },
            });

            return order;
        }
    );
}

export async function findUserOrders(
    userId: string
) {
    return prisma.order.findMany({
        where: {
            userId,
        },

        include: {
            address: true,

            items: {
                include: {
                    product: {
                        include: {
                            images: {
                                orderBy: {
                                    position:
                                        "asc",
                                },
                                take: 1,
                            },
                            seller: true,
                        },
                    },
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function findUserOrderById(
    userId: string,
    orderId: string
) {
    return prisma.order.findFirst({
        where: {
            id: orderId,
            userId,
        },

        include: {
            address: true,

            items: {
                include: {
                    product: {
                        include: {
                            images: {
                                orderBy: {
                                    position:
                                        "asc",
                                },
                                take: 1,
                            },
                            seller: true,
                        },
                    },
                },
            },
        },
    });
}