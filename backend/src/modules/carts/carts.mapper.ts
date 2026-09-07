import { Prisma } from "../../generated/prisma/client";

type CartItemWithProduct =
    Prisma.CartItemGetPayload<{
        include: {
            product: {
                include: {
                    images: true;
                    category: true;
                    seller: true;
                };
            };
        };
    }>;

export function mapCartItem(
    item: CartItemWithProduct
) {
    const product = item.product;

    const price = Number(
        product.price
    );

    const subtotal =
        price * item.quantity;

    return {
        id: item.id,

        quantity: item.quantity,

        product: {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price,
            quantity: product.quantity,
            status: product.status,

            image:
                product.images[0]?.url ??
                null,

            category: {
                id: product.category.id,
                name: product.category.name,
                slug: product.category.slug,
            },

            seller: {
                id: product.seller.id,
                storeName:
                    product.seller.storeName,
            },
        },

        subtotal,
    };
}