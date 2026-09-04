export function mapProduct(product: any) {
    return {
        id: product.id,

        name: product.name,
        slug: product.slug,

        description: product.description,

        sku: product.sku,
        brand: product.brand,
        condition: product.condition,

        price: Number(product.price),

        compareAtPrice:
            product.compareAtPrice !== null
                ? Number(product.compareAtPrice)
                : null,

        quantity: product.quantity,

        minimumOrderQuantity:
            product.minimumOrderQuantity,

        status: product.status,

        category: product.category
            ? {
                id: product.category.id,
                name: product.category.name,
                slug: product.category.slug,
            }
            : null,

        seller: product.seller
            ? {
                id: product.seller.id,
                storeName: product.seller.storeName,
                logo: product.seller.logo,
            }
            : undefined,

        images:
            product.images?.map((image: any) => ({
                id: image.id,
                url: image.url,
                publicId: image.publicId,
                position: image.position,
            })) ?? [],

        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    };
}