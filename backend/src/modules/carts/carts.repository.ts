import { prisma } from "../../lib/prisma";
import type {
    AddCartItemInput,
    UpdateCartItemInput,
} from "./carts.types";

export async function findCartItem(
    userId: string,
    productId: string
) {

    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    });

    if (!cart) {
        return null;
    }

    return prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId,
            },
        },
        include: {
            product: {
                include: {
                    images: {
                        orderBy: {
                            position: "asc",
                        },
                        take: 1,
                    },
                    category: true,
                    seller: true,
                },
            },
        },
    });
}

export async function createCartItem(
    userId: string,
    data: AddCartItemInput
) {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    });

    const userCart = cart ?? await prisma.cart.create({
        data: {
            userId,
        }
    })

    return prisma.cartItem.create({
        data: {
            cartId: userCart.id,
            productId: data.productId,
            quantity: data.quantity,
        },
        include: {
            product: {
                include: {
                    images: {
                        orderBy: {
                            position: "asc",
                        },
                        take: 1,
                    },
                    category: true,
                    seller: true,
                },
            },
        },
    });
}

export async function updateCartItem(
    userId: string,
    itemId: string,
    data: UpdateCartItemInput
) {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    });

    const userCart = cart ?? await prisma.cart.create({
        data: {
            userId,
        }
    })

    return prisma.cartItem.update({
        where: {
            id: itemId,
            cartId: userCart.id,
        },
        data: {
            quantity: data.quantity,
        },
        include: {
            product: {
                include: {
                    images: {
                        orderBy: {
                            position: "asc",
                        },
                        take: 1,
                    },
                    category: true,
                    seller: true,
                },
            },
        },
    });
}

export async function findCartItemById(
    userId: string,
    itemId: string
) {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    });

    const userCart = cart ?? await prisma.cart.create({
        data: {
            userId,
        }
    })
    return prisma.cartItem.findFirst({
        where: {
            id: itemId,
            cartId: userCart.id,
        },
        include: {
            product: {
                include: {
                    images: {
                        orderBy: {
                            position: "asc",
                        },
                        take: 1,
                    },
                    category: true,
                    seller: true,
                },
            },
        },
    });
}

export async function findMyCart(
    userId: string
) {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    });

    const userCart = cart ?? await prisma.cart.create({
        data: {
            userId,
        }
    })
    return prisma.cartItem.findMany({
        where: {
            cartId: userCart.id,
        },
        include: {
            product: {
                include: {
                    images: {
                        orderBy: {
                            position: "asc",
                        },
                        take: 1,
                    },
                    category: true,
                    seller: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function deleteCartItem(
    userId: string,
    itemId: string
) {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    });

    const userCart = cart ?? await prisma.cart.create({
        data: {
            userId,
        }
    })
    return prisma.cartItem.delete({
        where: {
            id: itemId,
            cartId: userCart.id,
        },
    });
}

export async function clearCart(
    userId: string
) {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    });

    const userCart = cart ?? await prisma.cart.create({
        data: {
            userId,
        }
    })
    return prisma.cartItem.deleteMany({
        where: {
            cartId: userCart.id,
        },
    });
}