export function mapAdminSeller(
    seller: any
) {
    return {
        id: seller.id,

        storeName: seller.storeName,

        description: seller.description,

        phone: seller.phone,

        logo: seller.logo,

        status: seller.status,

        createdAt: seller.createdAt,

        updatedAt: seller.updatedAt,

        user: seller.user
            ? {
                id: seller.user.id,
                name: seller.user.name,
                email: seller.user.email,
                image: seller.user.image,
            }
            : undefined,

        products:
            seller.products?.map(
                (product: any) => ({
                    id: product.id,
                    name: product.name,
                    status: product.status,
                })
            ) ?? [],
    };
}


export function mapAdminProduct(
    product: any
) {
    return {
        id: product.id,

        name: product.name,

        slug: product.slug,

        description: product.description,

        price: product.price,

        compareAtPrice:
            product.compareAtPrice,

        quantity: product.quantity,

        status: product.status,

        rejectionReason:
            product.rejectionReason,

        createdAt: product.createdAt,

        reviewedAt:
            product.reviewedAt,

        category: product.category
            ? {
                  id: product.category.id,
                  name: product.category.name,
                  slug: product.category.slug,
              }
            : undefined,

        seller: product.seller
            ? {
                  id: product.seller.id,
                  storeName:
                      product.seller.storeName,
                  status:
                      product.seller.status,
              }
            : undefined,

        images:
            product.images?.map(
                (image: any) => ({
                    id: image.id,
                    url: image.url,
                    publicId: image.publicId,
                    position: image.position,
                })
            ) ?? [],
    };
}