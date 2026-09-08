export function mapWishlistItem(
    item: any
) {
    return {
        id: item.id,
        productId: item.productId,
        createdAt: item.createdAt,

        product: {
            id: item.product.id,
            name: item.product.name,
            slug: item.product.slug,
            price: item.product.price,
            compareAtPrice:
                item.product.compareAtPrice,
            status: item.product.status,

            images:
                item.product.images.map(
                    (image: any) => ({
                        id: image.id,
                        url: image.url,
                        publicId: image.publicId,
                        position: image.position,
                    })
                ),
        },
    };
}